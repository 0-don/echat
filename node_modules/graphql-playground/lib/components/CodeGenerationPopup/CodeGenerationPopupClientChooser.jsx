"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var graphcool_styles_1 = require("graphcool-styles");
var cx = require("classnames");
var calculate_size_1 = require("calculate-size");
/* tslint:disable */
var Chooser = function (props) {
    return <div className={cx(graphcool_styles_1.$p.bb, graphcool_styles_1.$p.bt, graphcool_styles_1.$p.bl, graphcool_styles_1.$p.bBlack10, graphcool_styles_1.$p.flex1)}>
    <style jsx={true}>{"\n      .condition-button:not(.bgGreen):hover {\n        background-color: $gray10;\n      }\n    "}</style>
    <div className={cx(graphcool_styles_1.$p.pa38, graphcool_styles_1.$p.pt16, graphcool_styles_1.$p.flex, graphcool_styles_1.$p.flexColumn, graphcool_styles_1.$p.itemsCenter)}>
      <h2 className={cx(graphcool_styles_1.$p.fw3, graphcool_styles_1.$p.mb10, graphcool_styles_1.$p.tc)}>Client</h2>
      <div className={cx(graphcool_styles_1.$p.dib, graphcool_styles_1.$p.mt25)}>
        <div className={cx(graphcool_styles_1.$p.flex, graphcool_styles_1.$p.flexRow, graphcool_styles_1.$p.justifyAround, graphcool_styles_1.$p.ph16, graphcool_styles_1.$p.pv6, graphcool_styles_1.$p.relative, graphcool_styles_1.$p.itemsCenter)}>
          {props.clients.map(function (env) {
        var width = calculate_size_1.default(env.toUpperCase(), {
            fontSize: '14px',
            fontWeight: '600',
        }).width;
        return (<div className={cx(graphcool_styles_1.$p.relative, graphcool_styles_1.$p.flex, graphcool_styles_1.$p.itemsCenter, graphcool_styles_1.$p.justifyCenter, graphcool_styles_1.$p.pointer)} onClick={function () { return props.setClient(env); }} style={{ width: width + 10 }} key={env}>
                <div className={cx('condition-button', graphcool_styles_1.$p.nowrap, graphcool_styles_1.$p.absolute, graphcool_styles_1.$p.ph10, graphcool_styles_1.$p.flex, graphcool_styles_1.$p.flexRow, graphcool_styles_1.$p.itemsCenter, (_a = {},
            _a[cx(graphcool_styles_1.$p.pv6, graphcool_styles_1.$p.bgBlack04)] = props.client !== env,
            _a[cx(graphcool_styles_1.$p.bgGreen, graphcool_styles_1.$p.br2, graphcool_styles_1.$p.pv8, graphcool_styles_1.$p.z1)] = props.client === env,
            _a))}>
                  <div className={cx(graphcool_styles_1.$p.ttu, graphcool_styles_1.$p.fw6, graphcool_styles_1.$p.f14, (_b = {},
            _b[graphcool_styles_1.$p.black30] = props.client !== env,
            _b[graphcool_styles_1.$p.white] = props.client === env,
            _b))}>
                    {env}
                  </div>
                </div>
              </div>);
        var _a, _b;
    })}
        </div>
      </div>
    </div>
  </div>;
};
exports.default = Chooser;
//# sourceMappingURL=CodeGenerationPopupClientChooser.jsx.map