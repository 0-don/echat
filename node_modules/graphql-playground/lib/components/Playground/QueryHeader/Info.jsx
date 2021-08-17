"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Info = function (props) {
    return <div className="info">
    <style jsx={true}>{"\n      .question-mark {\n        @inherit: .bgWhite10, .flex, .itemsCenter, .justifyCenter, .white40,\n          .f12, .fw6, .br100, .pointer;\n        width: 18px;\n        height: 18px;\n      }\n      .tooltip {\n        @inherit: .dn, .absolute;\n        z-index: 20;\n        width: 250px;\n        padding-top: 5px;\n        left: -50px;\n      }\n      .tooltip-content {\n        @inherit: .br2, .bgWhite, .pa16, .black50, .f14, .fw4, .relative;\n        &:before {\n          @inherit: .absolute, .bgWhite;\n          content: \"\";\n          top: -4px;\n          left: 55px;\n          transform: rotate(45deg);\n          width: 8px;\n          height: 8px;\n        }\n      }\n      .info {\n        @inherit: .ml10, .relative;\n        &:hover .tooltip {\n          @inherit: .db;\n        }\n        &:hover .question-mark {\n          @inherit: .bgBlue, .white;\n        }\n      }\n    "}</style>
    <div className="question-mark">?</div>
    <div className="tooltip">
      <div className="tooltip-content">
        {props.children}
      </div>
    </div>
  </div>;
};
exports.default = Info;
//# sourceMappingURL=Info.jsx.map