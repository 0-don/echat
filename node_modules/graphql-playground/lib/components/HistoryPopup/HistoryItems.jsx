"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var graphcool_styles_1 = require("graphcool-styles");
var cx = require("classnames");
/* tslint:disable */
var HistoryItems = function (_a) {
    var items = _a.items, onItemSelect = _a.onItemSelect, selectedItemIndex = _a.selectedItemIndex, onItemStarToggled = _a.onItemStarToggled;
    return (<div className="history-items">
    <style jsx={true}>{"\n      .history-items {\n        @inherit: .overflowYScroll;\n        max-height: calc(100vh - 121px);\n      }\n      .item {\n        @inherit: .flex,\n          .itemsCenter,\n          .justifyBetween,\n          .bb,\n          .bBlack10,\n          .pointer;\n        padding: 25px 20px;\n        &.active {\n          @inherit: .bgBlack04;\n        }\n      }\n      .operation,\n      .star,\n      .viewer,\n      .left,\n      .right {\n        @inherit: .flex, .itemsCenter;\n      }\n      .operation {\n        @inherit: .itemsCenter;\n        margin-left: 20px;\n      }\n      .operation-text {\n        @inherit: .fw3, .f20, .mr16;\n      }\n      .operation-icon {\n        @inherit: .br2, .flex, .itemsCenter, .justifyCenter, .mr4, .fw7, .f12;\n        height: 21px;\n        width: 21px;\n        &.subscription {\n          @inherit: .purple, .bgPurple20;\n        }\n        &.query {\n          @inherit: .blue, .bgBlue20;\n        }\n        &.mutation {\n          @inherit: .lightOrange, .bgLightOrange20;\n        }\n      }\n      .date {\n        @inherit: .f14, .black50, .ml16;\n      }\n      .viewer {\n        @inherit: .ml6;\n      }\n    "}</style>
    {items.map(function (item, index) { return (<div key={item.id} className={cx('item', {
        active: selectedItemIndex === index,
    })} onClick={function () { return onItemSelect(index); }}>
        <div className="left">
          <div className="star" onClick={function () { return onItemStarToggled(item); }}>
            <graphcool_styles_1.Icon src={require('../../assets/icons/star.svg')} color={item.starred ? 'rgb(221,171,0)' : graphcool_styles_1.$v.gray30} stroke={!item.starred} strokeWidth={0.5} width={25} height={25}/>
          </div>
          <div className="operation">
            <div className="operation-text">
              {item.operationName ||
        item.queryTypes.firstOperationName ||
        'New Session'}
            </div>
            {item.queryTypes.query && (<div className="operation-icon query">Q</div>)}
            {item.queryTypes.mutation && (<div className="operation-icon mutation">M</div>)}
            {item.queryTypes.subscription && (<div className="operation-icon subscription">S</div>)}
          </div>
        </div>
        <div className="right">
          {item.date && (<div className="date">
              {typeof item.date.getMonth === 'function' && (<span>
                  {item.date.getMonth() + 1}/{item.date.getDate()}/{item.date
        .getFullYear()
        .toString()
        .slice(2, 4)}
                </span>)}
            </div>)}
        </div>
      </div>); })}
  </div>);
};
exports.default = HistoryItems;
//# sourceMappingURL=HistoryItems.jsx.map