"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var graphcool_styles_1 = require("graphcool-styles");
var cx = require("classnames");
/* tslint:disable */
var HistoryChooser = function (_a) {
    var selectedFilter = _a.selectedFilter, onSelectFilter = _a.onSelectFilter;
    return <div>
    <style jsx={true}>{"\n      .chooser {\n        @inherit: .flex, .itemsCenter;\n      }\n\n      .filter {\n        @inherit: .br2,\n          .relative,\n          .pointer,\n          .ttu,\n          .flex,\n          .itemsCenter,\n          .black30,\n          .fw6,\n          .f14,\n          .bgBlack07,\n          .cbox;\n        padding: 5px 13px 6px 13px;\n        margin: 0 -2px;\n        height: 24px;\n        &.active {\n          @inherit: .z2, .white, .bgGreen;\n          padding: 7px 9px 8px 9px;\n        }\n      }\n\n      .filter-text {\n        @inherit: .ml6;\n      }\n    "}</style>
    <div className="chooser">
      <div className={cx('filter', {
        active: selectedFilter === 'HISTORY',
    })} onClick={function () { return onSelectFilter('HISTORY'); }}>
        <graphcool_styles_1.Icon src={require('graphcool-styles/icons/stroke/history.svg')} color={selectedFilter === 'HISTORY' ? graphcool_styles_1.$v.white : graphcool_styles_1.$v.gray30} stroke={true} strokeWidth={3} width={25} height={25}/>
        <div className="filter-text">History</div>
      </div>
      <div className={cx('filter', {
        active: selectedFilter === 'STARRED',
    })} onClick={function () { return onSelectFilter('STARRED'); }}>
        <graphcool_styles_1.Icon src={require('../../assets/icons/star.svg')} color={selectedFilter === 'STARRED' ? graphcool_styles_1.$v.white : graphcool_styles_1.$v.gray30} width={16} height={16}/>
        <div className="filter-text">Starred</div>
      </div>
    </div>
  </div>;
};
exports.default = HistoryChooser;
//# sourceMappingURL=HistoryChooser.jsx.map