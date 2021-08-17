"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var cn = require("classnames");
var graphcool_styles_1 = require("graphcool-styles");
function A(_a) {
    var hideArrow = _a.hideArrow, primary = _a.primary, button = _a.button, green = _a.green, white = _a.white, gray = _a.gray, greenOnWhite = _a.greenOnWhite, arrowToBottom = _a.arrowToBottom, arrowToLeft = _a.arrowToLeft, children = _a.children, className = _a.className, wrap = _a.wrap, onClick = _a.onClick;
    return (<div className={cn('link', className, {
        primary: primary,
        button: button,
        green: green,
        'green-on-white': greenOnWhite,
        white: white,
        arrowToBottom: arrowToBottom,
        arrowToLeft: arrowToLeft,
        gray: gray,
        wrap: wrap,
    })} onClick={onClick}>
      <style jsx={true}>{"\n        .link {\n          @p: .pointer, .dib, .blue, .f14, .flex, .itemsCenter;\n        }\n\n        .link.gray {\n          @p: .darkBlue50;\n        }\n\n        .link.gray :global(svg) {\n          fill: $darkBlue50;\n        }\n\n        .link.gray:hover {\n          @p: .darkBlue70;\n        }\n\n        .link.gray:hover :global(svg) {\n          fill: $darkBlue70;\n        }\n\n        .link.white {\n          @p: .white50;\n        }\n\n        .link.white :global(svg) {\n          fill: $white50;\n        }\n\n        .link.white:hover {\n          @p: .white70;\n        }\n        .link.white:hover :global(svg) {\n          fill: $white70;\n        }\n\n        .link :global(a),\n        .link > div {\n          @p: .flex, .itemsCenter, .ttu, .tracked, .fw6, .nowrap, .noUnderline;\n          font-size: inherit;\n          color: inherit;\n        }\n\n        .link.wrap :global(a),\n        .link.wrap > div {\n          white-space: normal;\n          text-align: right;\n        }\n\n        .link.arrowToLeft :global(a),\n        .link.arrowToLeft > div {\n          @p: .flex, .itemsCenter, .ttu, .tracked, .fw6, .nowrap, .noUnderline;\n          font-size: inherit;\n          color: inherit;\n          flex-direction: row-reverse;\n        }\n\n        .button {\n          @p: .br2, .pv6, .ph10, .buttonShadow, .white, .bgBlue;\n          transition: background .25s ease, box-shadow .25s ease,\n            transform .25s ease;\n        }\n\n        .button :global(svg) {\n          fill: $white !important;\n        }\n\n        .button.green {\n          @p: .bgGreen;\n        }\n\n        .link.button.white {\n          @p: .darkBlue, .bgWhite;\n        }\n\n        .button.green-on-white {\n          @p: .green, .bgWhite;\n        }\n\n        .link.button.white :global(svg) {\n          fill: $darkBlue !important;\n        }\n\n        .button.green-on-white :global(svg) {\n          fill: $green !important;\n        }\n\n        .link :global(.arrow) {\n          @p: .ml10;\n        }\n\n        .link.arrowToLeft :global(.arrow) {\n          @p: .ml0, .mr10;\n        }\n\n        .link.arrowToBottom :global(.arrow) {\n          transform: rotate(90deg) !important;\n        }\n\n        .link.arrowToLeft :global(.arrow) {\n          transform: rotate(180deg) !important;\n        }\n\n        .link:hover {\n          color: #69a4e0;\n        }\n\n        .button:hover {\n          color: $white;\n          background: #3f8ad7;\n          box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.15);\n          transform: translate3D(0, -1px, 0);\n        }\n\n        .button.green:hover {\n          background: #3cb66f;\n        }\n\n        .button.white:hover {\n          color: $darkBlue80;\n          background: $white;\n        }\n\n        .button.green-on-white:hover {\n          color: #3cb66f;\n          background: $white;\n        }\n\n        .link:hover :global(.arrow) {\n          animation: move 1s ease infinite;\n        }\n\n        .link.arrowToBottom:hover :global(.arrow) {\n          animation: moveToBottom 1s ease infinite;\n        }\n\n        .link.arrowToLeft:hover :global(.arrow) {\n          animation: moveToLeft 1s ease infinite;\n        }\n\n        @keyframes move {\n          0% {\n            transform: translate3D(0, 0, 0);\n          }\n\n          50% {\n            transform: translate3D(3px, 0, 0);\n          }\n\n          100% {\n            transform: translate3D(0, 0, 0);\n          }\n        }\n\n        @keyframes moveToBottom {\n          0% {\n            transform: rotate(90deg) translate3D(0, 0, 0);\n          }\n\n          50% {\n            transform: rotate(90deg) translate3D(3px, 0, 0);\n          }\n\n          100% {\n            transform: rotate(90deg) translate3D(0, 0, 0);\n          }\n        }\n\n        @keyframes moveToLeft {\n          0% {\n            transform: rotate(180deg) translate3D(0, 0, 0);\n          }\n\n          50% {\n            transform: rotate(180deg) translate3D(3px, 0, 0);\n          }\n\n          100% {\n            transform: rotate(180deg) translate3D(0, 0, 0);\n          }\n        }\n\n        @media (min-width: 1000px) {\n          .link.primary {\n            @p: .f16;\n          }\n        }\n      "}</style>
      {<div>
          {children ? children : 'Learn more'}
          {!hideArrow &&
        <graphcool_styles_1.Icon src={require('graphcool-styles/icons/fill/fullArrowRight.svg')} color={graphcool_styles_1.$v.blue} width={14} height={11} className="arrow"/>}
        </div>}
    </div>);
}
exports.A = A;
function Button(_a) {
    var hideArrow = _a.hideArrow, primary = _a.primary, green = _a.green, white = _a.white, greenOnWhite = _a.greenOnWhite, arrowToBottom = _a.arrowToBottom, arrowToLeft = _a.arrowToLeft, children = _a.children, className = _a.className, wrap = _a.wrap, onClick = _a.onClick;
    return (<A button={true} hideArrow={hideArrow} primary={primary} green={green} white={white} greenOnWhite={greenOnWhite} arrowToBottom={arrowToBottom} arrowToLeft={arrowToLeft} className={className} wrap={wrap} onClick={onClick}>
      {children || null}
    </A>);
}
exports.Button = Button;
//# sourceMappingURL=Button.jsx.map