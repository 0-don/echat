var async   = require ("async"),
    expect  = require("chai").expect,
    express = require("express"),
    pages   = require("../").pages,
    path    = require("path"),
    sonar   = require("sonar");

var TEMPLATES = path.join(__dirname, "data");

describe("The page loader", function () {
    
    it("reports an error if the template doesn't exist", function (done) {
        pages().load("foo", function (error, page) {
            expect(error).to.be.an.instanceof(Error);
            expect(page).to.not.exist;
            done();
        });
    });
    
    it("reports an error if the template is malformed", function (done) {
        pages(TEMPLATES).load("bad.txt", function (error, page) {
            expect(error).to.be.an.instanceof(Error);
            expect(page).to.not.exist;
            done();
        });
    });
    
    it("can load a template from a directory", function (done) {
        // Needs to be in series so that we don't have to worry about the
        // current working directory.
        async.series(
            {
                explicit: function (callback) {
                    pages(TEMPLATES).load("simple.txt", callback);
                },
                implicit: function (callback) {
                    process.chdir(TEMPLATES);
                    pages().load("simple.txt", callback);
                }
            },
            function (error, results) {
                expect(error).to.not.exist;
                expect(results.explicit).to.exist;
                expect(results.implicit).to.exist;
                done();
            }
        );
    });
    
});

describe("A page", function () {

    var application = express();
    
    var SONAR = sonar(application);
    
    application.get("/cask", function (request, response, next) {
        pages(TEMPLATES).load("cask.html", function (error, page) {
            if (error) return next(error);
            [ "foo", "test", "test", "bar" ].forEach(function (name) {
                page.addScript("/static/" + name + ".js");
                page.addStyleSheet("/static/" + name + ".css");
            });
            page.renderTo(response);
        });
    });
    
    application.get("/layout", function (request, response, next) {
        async.waterfall(
            [
                function (next) {
                    pages(TEMPLATES).load("layout.txt", next);
                },
                function (page, next) {
                    page.addPartial("partial", "partial.txt", next);
                }
            ],
            function (error, page) {
                if (error) return next(error);
                
                response.set("Content-Type", "text/plain");
                page.renderTo(response, request.query, next);
            }
        );
    });
    
    application.get("/scripts", function (request, response, next) {
        pages(TEMPLATES).load("scripts.txt", function (error, page) {
            if (error) return next(error);
            [ "foo", "test", "test", "bar" ].forEach(function (name) {
                page.addScript("/static/" + name + ".js");
            });
            response.set("Content-Type", "text/plain");
            page.renderTo(response);
        });
    });
    
    application.get("/simple", function (request, response, next) {
        pages(TEMPLATES).load("simple.txt", function (error, page) {
            if (error) return next(error);
            response.set("Content-Type", "text/plain");
            page.renderTo(response, request.query, next);
        });
    });
    
    application.get("/stlyesheets", function (request, response, next) {
        pages(TEMPLATES).load("scripts.txt", function (error, page) {
            if (error) return next(error);
            [ "foo", "test", "test", "bar" ].forEach(function (name) {
                page.addStylesheet("/static/" + name + ".css");
            });
            response.set("Content-Type", "text/plain");
            page.renderTo(response);
        });
    });

    it("can render a response object", function (done) {
        SONAR.get("/simple", function (error, response) {
            expect(error).to.not.exist;
            expect(response.body).to.equal("This is a simple  file.\n");
            done();
        });
    });
    
    it("can substitute values from a context", function (done) {
        SONAR.get("/simple?modifier=test", function (error, response) {
            expect(error).to.not.exist;
            expect(response.body).to.equal("This is a simple test file.\n");
            done();
        });
    });
    
    it("can include a partial", function (done) {
        SONAR.get("/layout?modifier=test", function (error, response) {
            expect(error).to.not.exist;
            expect(response.body).to.equal("This is a test partial.\n");
            done();
        });
    });
    
    it("reports an error if attempting to include a bad partial", function (done) {
        async.waterfall(
            [
                function (next) {
                    pages(TEMPLATES).load("layout.txt", next);
                },
                function (page, next) {
                    page.addPartial("partial", "bad.txt", next);
                }
            ],
            function (error) {
                expect(error).to.be.an.instanceof(Error);
                done();
            }
        );
    });
    
    it("can declare scripts", function (done) {
        SONAR.get("/cask", function (error, response) {
            var scripts = response.body.$("script").not(".jsdom");
            
            expect(scripts.length).to.equal(3);
            expect(scripts.first().attr("src")).to.equal("/static/foo.js");
            done();
        });
    });
    
    it("can declare stylesheets", function (done) {
        SONAR.get("/cask", function (error, response) {
            var stylesheets = response.body.$("link[type='text/css']");
            
            expect(stylesheets.length).to.equal(3);
            expect(stylesheets.first().attr("href")).to.equal("/static/foo.css");
            done();
        });
    });
    
    it("can handle rendering errors", function (done) {
        async.waterfall(
            [
                function (next) {
                    pages(TEMPLATES).load("layout.txt", next);
                },
                function (page, next) {
                    page.addPartial("partial", "layout.txt", next);
                },
                function (page, next) {
                    page.renderTo(null, null, next);
                }
            ],
            function (error) {
                expect(error).to.be.an.instanceof(Error);
                expect(error.message).to.match(/call stack size exceeded/);
                done();
            }
        );
    });
    
    // Bug: Cask sends array for scripts and stylesheets -- this results in
    // rogue commas in the HTML.
    it("does not separate declared resources with commas", function (done) {
        async.parallel(
            {
                scripts: function (callback) {
                    SONAR.get("/scripts", function (error, response) {
                        if (error) return callback(error);
                        expect(response.body).to.not.contain(",");
                        callback();
                    });
                },
                stylesheets: function (callback) {
                    SONAR.get("/stylesheets", function (error, response) {
                        if (error) return callback(error);
                        expect(response.body).to.not.contain(",");
                        callback();
                    });
                }
            },
            done
        );
    });

});
