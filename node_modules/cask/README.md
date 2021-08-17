Cask
====

Cask is a micro-framework for creating template-based web pages with
[Express][1]. Cask currently only supports [Mustache][2] templating.

## Basic Usage

    npm install cask
    
Cask allows pages to be declaritively defined as modules similar to [Connect][3]
middleware. The page can then be rendered by passing a `Response` instance, a
context object, and the middleware callback. For example:

    page.js
    =======
    
    var pages = require("cask").pages;
    
    module.exports = function (response, item, next) {
        pages("templates").load("page.html", function (error, response) {
            page.addStyleSheet("/static/css/style.css");
            page.renderTo(response, { result: item }, next);
        });
    };

    app.js
    ======
    
    var app  = express(),
        page = require("./page");
    
    . . .
    
    app.get("/page", function (request, response, next) {
        var item = { message: "hello world" };
        page(response, item, next);
    });
    
## API Details

### cask.pages([templateDirectory])

 + **templateDirectory** - _Defaults to CWD_. The base directory to load
    load templates from.

Creates a new `PageLoader` for loading pages.

### PageLoader.load(template, callback)

 + **template** - the file name of the template to create the page from.
 + **callback** - called when the template has been loaded and compiled. The
    callback is passed two arguments `(error, page)`.
    
Creates a `Page` instance from a template file.
    
### Page.addPartial(name, template, callback)

 + **name** - the name by which the partial will be refernced in templates.
 + **template** - the template that defines the partial.
 + **callback** - called when the partial has been loaded and compiled. The
    callback is passed two arguments `(error, page)`. `page` is a self-reference
    to the `Page`.
    
Makes a partial available to the rendering context.

### Page.addScript(href)

 + **href** - the URL of the script to add to the page.
 
`addScript` allows a page definition to declare a script dependency. The page
will try to make smart use of scripts and will only load each script once
(regardless of how many times the same script is declared) at the end of the
page body.

### Page.addStyleSheet(href)

 + **href** - the URL of the stylesheet to add to the page.
 
`addStyleSheet` allows a page definition to declare a stylesheet dependency. The
page will try to make smart use of stylesheets and will only load each
stylesheet once (regardless of how many times the same stylesheet is declared).

### Page.renderTo(response, context, next)

 + **response** - the Express `response` instance that the page content should
    be rendered to.
 + **context** - a hash of attributes to be used by the template
    engine.
 + **next** - the 'next middleware' callback. This is typically used for error
    handling.
    
Cause the page content to be rendered as a response to a request.

[1]: http://expressjs.com/ "Express"
[2]: http://mustache.github.io/ "Mustache"
[3]: http://www.senchalabs.org/connect/ "Connect"
