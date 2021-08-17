"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react"); // tslint:disable-line
var graphcool_styles_1 = require("graphcool-styles");
var cx = require("classnames");
exports.default = function (props) {
    return <div className={cx(graphcool_styles_1.$p.flex, graphcool_styles_1.$p.justifyCenter, graphcool_styles_1.$p.black, graphcool_styles_1.$p.itemsCenter, graphcool_styles_1.$p.w100, 'container')}>
    <style jsx={true}>{"\n      .container {\n        height: 103px;\n      }\n    "}</style>
    <div className={cx(graphcool_styles_1.$p.f25, graphcool_styles_1.$p.fw3, graphcool_styles_1.$p.flex, graphcool_styles_1.$p.flexRow, graphcool_styles_1.$p.itemsCenter)}>
      Generate Code for your
      <div className={cx(graphcool_styles_1.$p.fw6, graphcool_styles_1.$p.ml6)}>
        {props.queryActive ? 'Query' : 'Mutation'}
      </div>
    </div>
  </div>;
};
//# sourceMappingURL=CodeGenerationPopupHeader.jsx.map