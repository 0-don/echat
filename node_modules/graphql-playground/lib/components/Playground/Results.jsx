"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ageOfDate_1 = require("./util/ageOfDate");
var ResultViewer_1 = require("./ResultViewer");
var Results = /** @class */ (function (_super) {
    __extends(Results, _super);
    function Results() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Results.prototype.render = function () {
        var _this = this;
        return (<div className={'result-window' + (this.props.disableResize ? ' disableResize' : '')} ref={this.props.setRef}>
        <style jsx={true}>{"\n          .result-window {\n            @p: .bgDarkBlue, .nosb, .relative;\n          }\n\n          .result-window.disableResize :global(.CodeMirror-gutters) {\n            cursor: default !important;\n          }\n\n          .subscription-time {\n            @p: .relative;\n            height: 17px;\n            margin-top: 12px;\n            margin-bottom: 4px;\n            &:before {\n              @p: .absolute, .w100;\n              content: '';\n              top: 9px;\n              left: 95px;\n              border-top: 1px solid $white20;\n            }\n          }\n\n          .subscription-time-text {\n            @p: .bgDarkBlue, .white50, .f12;\n            padding-left: 15px;\n          }\n\n          .result-viewer-wrapper {\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            overflow: auto;\n          }\n        "}</style>
        {this.props.responses.map(function (response) { return (<div key={response.resultID || String(response.time)}>
            {_this.props.responses.length > 1 &&
            response.time && (<div className="subscription-time">
                  <div className="subscription-time-text">
                    {ageOfDate_1.default(response.time)}
                  </div>
                </div>)}
            <div className="result-viewer-wrapper">
              <ResultViewer_1.ResultViewer value={response.date} hideGutters={_this.props.hideGutters}/>
            </div>
          </div>); })}
      </div>);
    };
    return Results;
}(React.Component));
exports.default = Results;
//# sourceMappingURL=Results.jsx.map