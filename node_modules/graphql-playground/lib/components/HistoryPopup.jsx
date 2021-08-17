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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Modal = require("react-modal");
var HistoryHeader_1 = require("./HistoryPopup/HistoryHeader");
var HistoryItems_1 = require("./HistoryPopup/HistoryItems");
var graphcool_styles_1 = require("graphcool-styles");
var constants_1 = require("../constants");
var Theme_1 = require("./Theme");
var cn = require("classnames");
var QueryEditor_1 = require("./Playground/QueryEditor");
var HistoryPopup = /** @class */ (function (_super) {
    __extends(HistoryPopup, _super);
    function HistoryPopup(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClickUse = function () {
            var _a = _this.state, searchTerm = _a.searchTerm, selectedFilter = _a.selectedFilter;
            // TODO refactor
            var items = _this.props.historyItems.filter(function (item) {
                return selectedFilter === 'STARRED'
                    ? item.starred
                    : true &&
                        (searchTerm && searchTerm.length > 0
                            ? item.query.toLowerCase().includes(searchTerm.toLowerCase())
                            : true);
            });
            var selectedItem = items[_this.state.selectedItemIndex];
            _this.props.onCreateSession(selectedItem);
            _this.props.onRequestClose();
        };
        _this.handleItemSelect = function (index) {
            _this.setState({ selectedItemIndex: index });
        };
        _this.handleSelectFilter = function (filter) {
            _this.setState({ selectedFilter: filter });
        };
        _this.handleSearch = function (term) {
            _this.setState({ searchTerm: term });
        };
        _this.state = {
            selectedFilter: 'HISTORY',
            selectedItemIndex: 0,
            searchTerm: '',
        };
        return _this;
    }
    HistoryPopup.prototype.render = function () {
        var _a = this.state, searchTerm = _a.searchTerm, selectedFilter = _a.selectedFilter;
        var localTheme = this.props.localTheme;
        var items = this.props.historyItems.filter(function (item) {
            return selectedFilter === 'STARRED'
                ? item.starred
                : true &&
                    (searchTerm && searchTerm.length > 0
                        ? item.query.toLowerCase().includes(searchTerm.toLowerCase())
                        : true);
        });
        var selectedItem = items[this.state.selectedItemIndex];
        var customModalStyle = constants_1.modalStyle;
        if (localTheme === 'light') {
            customModalStyle = __assign({}, constants_1.modalStyle, { overlay: __assign({}, constants_1.modalStyle.overlay, { backgroundColor: 'rgba(255,255,255,0.9)' }) });
        }
        return (<Modal isOpen={this.props.isOpen} onRequestClose={this.props.onRequestClose} contentLabel="GraphiQL Session History" style={customModalStyle}>
        <style jsx={true}>{"\n          .history-popup {\n            @p: .flex;\n            min-height: 500px;\n          }\n          .left {\n            @p: .flex1, .bgWhite;\n          }\n          .right {\n            @p: .z2;\n            flex: 0 0 464px;\n          }\n          .right-header {\n            @p: .justifyBetween, .flex, .bgDarkBlue, .itemsCenter, .ph25;\n            padding-top: 20px;\n            padding-bottom: 20px;\n          }\n          .right-header.light {\n            background-color: #f6f7f7;\n          }\n          .right-empty {\n            @p: .bgDarkBlue, .h100, .flex, .justifyCenter, .itemsCenter;\n          }\n          .right-empty.light {\n            background-color: #f6f7f7;\n          }\n          .right-empty-text {\n            @p: .f16, .white60;\n          }\n          .view {\n            @p: .f14, .white40, .ttu, .fw6;\n          }\n          .use {\n            @p: .f14, .fw6, .pv10, .ph16, .bgGreen, .flex, .br2, .itemsCenter,\n              .pointer;\n          }\n          .use-text {\n            @p: .mr6, .white;\n          }\n          .graphiql-wrapper {\n            @p: .w100, .h100, .relative, .flex, .flexAuto;\n          }\n          .big {\n            @p: .h100, .flex, .flexAuto;\n          }\n        "}</style>
        <div className={cn('history-popup', localTheme)}>
          <div className="left">
            <HistoryHeader_1.default onSelectFilter={this.handleSelectFilter} selectedFilter={this.state.selectedFilter} onSearch={this.handleSearch}/>
            <HistoryItems_1.default items={items} selectedItemIndex={this.state.selectedItemIndex} searchTerm={this.state.searchTerm} onItemSelect={this.handleItemSelect} onItemStarToggled={this.props.onItemStarToggled}/>
          </div>
          {Boolean(selectedItem) ? (<div className={cn('right', localTheme)}>
              <div className={cn('right-header', localTheme)}>
                <div className="view"/>
                <div className="use" onClick={this.handleClickUse}>
                  <div className="use-text">Use</div>
                  <graphcool_styles_1.Icon src={require('../assets/icons/arrowRight.svg')} color={graphcool_styles_1.$v.white} stroke={true} width={13} height={13}/>
                </div>
              </div>
              <div className={cn('big', {
            'docs-graphiql': localTheme === 'light',
        })}>
                <div className={cn('big', {
            'graphiql-wrapper': localTheme === 'light',
        })}>
                  <div className="graphiql-container">
                    <div className="queryWrap">
                      <QueryEditor_1.QueryEditor value={selectedItem.query}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>) : (<div className={cn('right', localTheme)}>
              <div className={cn('right-empty', localTheme)}>
                <div className="right-empty-text">No History yet</div>
              </div>
            </div>)}
        </div>
      </Modal>);
    };
    return HistoryPopup;
}(React.Component));
exports.default = Theme_1.withTheme(HistoryPopup);
//# sourceMappingURL=HistoryPopup.jsx.map