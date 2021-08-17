"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function Loading() {
  return React.createElement(
    "div",
    { className: "loading" },
    React.createElement(
      "style",
      null,
      "\n        .loading {\n          height: 100%;\n          width: 100%;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n        }\n        .text {\n          font-size: 32px;\n          font-weight: 200;\n          color: rgba(255,255,255,.6);\n          margin-left: 20px;\n        }\n        img {\n          width: 78px;\n          height: 78px;\n        }\n          .title {\n          font-weight: 400;\n        }\n      "
    ),
    React.createElement("img", { src: "/logo.png", alt: "" }),
    React.createElement(
      "div",
      { className: "text" },
      "Loading ",
      React.createElement(
        "span",
        { className: "title" },
        "GraphQL Playground"
      )
    )
  );
}
exports.default = Loading;
//# sourceMappingURL=Loading.jsx.map