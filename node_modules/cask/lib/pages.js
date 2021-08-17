var async    = require("async"),
    fs       = require("fs"),
    mustache = require("hogan.js"),
    path     = require("path");
    
var FILE_ENCODING = "utf-8";

function loadTemplate (directory, template, callback) {
    async.waterfall(
        [
            function (next) {
                fs.readFile(
                    path.join(directory, template),
                    { encoding: FILE_ENCODING },
                    next
                );
            },
            function (contents, next) {
                var template;
                
                try {
                    template = mustache.compile(contents);
                } catch (error) {
                    return next(error);
                }
                next(null, template);
            }
        ],
        callback
    );
}

function Page (directory, template) {

    var page        = this,
        partials    = {},
        scripts     = [],
        stylesheets = [];
        
    function createCask () {
        var scriptTags = scripts.map(function (href) {
                return "<script type=\"text/javascript\" src=\"" +
                    href + "\"></script>";
            }).join("\n"),
            styleTags = stylesheets.map(function (href) {
                return "<link rel=\"stylesheet\" type=\"text/css\" href=\"" +
                    href + "\"/>";
            }).join("\n");
        
        return {
            scripts     : scriptTags,
            stylesheets : styleTags
        };
    }
    
    this.addPartial = function (name, template, callback) {
        async.waterfall(
            [
                function (next) {
                    loadTemplate(directory, template, next);
                },
                function (template, next) {
                    partials[name] = template;
                    next(null, page);
                }
            ],
            callback
        );
    };
    
    this.addScript = function (href) {
        if (scripts.indexOf(href) < 0) {
            scripts.push(href);
        }
    };
    
    this.addStyleSheet = function (href) {
        if (stylesheets.indexOf(href) < 0) {
            stylesheets.push(href);
        }
    };

    this.renderTo = function (response, context, next) {
        try {
            context      = context || {};
            context.cask = createCask();
            
            response.send(template.render(context, partials));
        } catch (error) {
            return next(error);
        }
    };

}

function PageLoader (directory) {
    directory = directory || "";

    this.load = function (template, callback) {
        async.waterfall(
            [
                function (next) {
                    loadTemplate(directory, template, next);
                },
                function (template, next) {
                    next(null, new Page(directory, template));
                }
            ],
            callback
        );
    };

}

module.exports = function (directory) {
    return new PageLoader(directory);
};
