"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var HistoryChooser_1 = require("./HistoryChooser");
var SearchBox_1 = require("../Playground/DocExplorer/SearchBox");
var HistoryHeader = function (props) {
    return <div className="history-header">
    <style jsx={true}>{"\n      .history-header {\n        @inherit: .pa16, .flex, .justifyBetween, .itemsCenter, .bgBlack02;\n      }\n\n      .search-box {\n        @inherit: .pa0, .bgTransparent;\n      }\n    "}</style>
    <HistoryChooser_1.default onSelectFilter={props.onSelectFilter} selectedFilter={props.selectedFilter}/>
    <SearchBox_1.default placeholder="Search the history..." onSearch={props.onSearch} clean={true} isShown={true}/>
  </div>;
};
exports.default = HistoryHeader;
//# sourceMappingURL=HistoryHeader.jsx.map