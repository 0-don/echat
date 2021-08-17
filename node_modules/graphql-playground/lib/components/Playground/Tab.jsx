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
var Icon_1 = require("graphcool-styles/dist/components/Icon/Icon");
var graphcool_styles_1 = require("graphcool-styles");
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    function Tab(props) {
        var _this = _super.call(this, props) || this;
        _this.handleMouseOverCross = function () {
            _this.setState({ overCross: true });
        };
        _this.handleMouseOutCross = function () {
            _this.setState({ overCross: false });
        };
        _this.handleSelectSession = function () {
            _this.props.onSelectSession(_this.props.session);
        };
        _this.handleCloseSession = function (e) {
            e.stopPropagation();
            _this.props.onCloseSession(_this.props.session);
        };
        _this.state = {
            overCross: false,
        };
        return _this;
    }
    Tab.prototype.render = function () {
        var _a = this.props, session = _a.session, index = _a.index, selectedSessionIndex = _a.selectedSessionIndex, localTheme = _a.localTheme;
        var queryTypes = session.queryTypes;
        return (<div className={"tab " + (index === selectedSessionIndex && 'active') + " " + localTheme} onClick={this.handleSelectSession}>
        <style jsx={true}>{"\n          .tab {\n            @p: .flex,\n              .itemsCenter,\n              .bgDarkerBlue,\n              .br2,\n              .brTop,\n              .ml10,\n              .bbox,\n              .pointer,\n              .nowrap;\n            height: 43px;\n            padding: 10px;\n            padding-top: 9px;\n            &.active {\n              @p: .bgDarkBlue;\n            }\n            border-bottom: 2px solid #172a3a;\n          }\n          .tab:first-of-type {\n            margin-left: 0;\n          }\n          .light.tab {\n            background-color: #e7eaec;\n            &.active {\n              background-color: #eeeff0;\n            }\n            border-bottom: 2px solid #eeeff0;\n          }\n          .tab:hover {\n            @p: .bgDarkBlue;\n          }\n          .tab:hover :global(.close) {\n            opacity: 1;\n          }\n          .light.tab:hover {\n            background-color: #eeeff0;\n          }\n\n          .icons {\n            @p: .flex, .itemsCenter, .o50;\n            &.active {\n              @p: .o100;\n            }\n          }\n\n          .red-dot {\n            @p: .br100, .bgrRed, .mr10;\n            width: 7px;\n            height: 7px;\n          }\n\n          .query-type {\n            @p: .br2, .flex, .itemsCenter, .justifyCenter, .mr4, .fw7, .f12;\n            height: 21px;\n            width: 21px;\n            margin-right: 2px;\n          }\n\n          .light .query-type {\n            @p: .white;\n          }\n\n          .subscription {\n            @p: .bgPurple;\n          }\n\n          .query {\n            @p: .bgBlue;\n          }\n\n          .mutation {\n            @p: .bgLightOrange;\n          }\n\n          .viewer {\n            @p: .mr10;\n          }\n\n          .operation-name {\n            @p: .o50;\n            &.active {\n              @p: .o100;\n            }\n          }\n\n          .close {\n            @p: .ml10, .relative;\n            top: 1px;\n            height: 13px;\n            width: 13px;\n            opacity: 0;\n\n            &.active {\n              @p: .o100;\n              opacity: 1;\n            }\n\n            &.hasCircle {\n              opacity: 1;\n            }\n          }\n\n          .plus {\n            @p: .flex, .justifyCenter, .itemsCenter;\n            width: 43px;\n          }\n\n          .history {\n            @p: .pointer, .absolute;\n            top: 15px;\n            right: 56px;\n          }\n\n          .change-theme {\n            @p: .absolute, .pointer;\n            top: 200px;\n            right: 200px;\n          }\n          .border-bottom {\n            height: 8px;\n            background-color: #eeeff0;\n            width: 100%;\n          }\n\n          .circle {\n            @p: .white40, .relative;\n            font-size: 9px;\n            top: -2px;\n          }\n\n          .light .circle {\n            @p: .darkBlue40;\n          }\n          .query-types {\n            @p: .flex;\n          }\n        "}</style>
        <div className={"icons " + (index === selectedSessionIndex && 'active')}>
          {session.subscriptionActive && <div className="red-dot"/>}
          <div className="query-types">
            {queryTypes.query && <div className="query-type query">Q</div>}
            {(session.isSettingsTab || session.isConfigTab) && (<div className="query-type query">
                <Icon_1.default src={require('graphcool-styles/icons/fill/settings.svg')} width={12} height={12} color="white"/>
              </div>)}
            {queryTypes.mutation && (<div className="query-type mutation">M</div>)}
            {queryTypes.subscription && (<div className="query-type subscription">S</div>)}
          </div>
        </div>
        <div className={"operation-name " + (index === selectedSessionIndex &&
            'active')}>
          {session.name ||
            session.operationName ||
            queryTypes.firstOperationName ||
            'New Tab'}
        </div>
        <div className={"close" + (index === selectedSessionIndex ? ' active' : '') + (session.isFile && session.hasChanged && !this.state.overCross
            ? ' hasCircle'
            : '')} onClick={this.handleCloseSession} onMouseEnter={this.handleMouseOverCross} onMouseLeave={this.handleMouseOutCross}>
          {session.isFile && session.hasChanged && !this.state.overCross ? (<div className="circle">⬤</div>) : (<Icon_1.default src={require('graphcool-styles/icons/stroke/cross.svg')} stroke={true} color={localTheme === 'dark' ? 'rgb(74, 85, 95)' : graphcool_styles_1.$v.darkBlue40} width={12} height={11} strokeWidth={7}/>)}
        </div>
      </div>);
    };
    return Tab;
}(React.PureComponent));
exports.default = Tab;
//# sourceMappingURL=Tab.jsx.map