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
var react_virtualized_1 = require("react-virtualized");
function pZ(n) {
    return n < 10 ? "0" + n : n;
}
var TableComponent = /** @class */ (function (_super) {
    __extends(TableComponent, _super);
    function TableComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.rowClassName = function (_a) {
            var index = _a.index;
            return "table-row " + (_this.props.rows[index] &&
                _this.props.rows[index].selected
                ? 'selected'
                : '');
        };
        _this.noRowsRenderer = function () {
            return (<div className="no-rows">
        <style jsx={true}>{"\n          .no-rows {\n            @inherit: .w100, .h100, .flex, .justifyCenter, .itemsCenter;\n          }\n        "}</style>
        <div>No Users</div>
      </div>);
        };
        _this.rowGetter = function (_a) {
            var index = _a.index;
            var row = _this.props.rows[index];
            if (!row) {
                return {};
            }
            return Object.keys(row).reduce(function (prev, current) {
                prev[current] = _this.textToString(row[current]);
                return prev;
            }, {});
        };
        // private cellRenderer = ({key, style, columnIndex, rowIndex}) => {
        //   const field = this.props.fields[columnIndex]
        //   const {selectedRow} = this.state
        //   return (
        //     <div
        //       key={key}
        //       style={style}
        //       className={`cell ${selectedRow === rowIndex ? 'selected' : ''}`}
        //       onClick={() => this.selectRow(rowIndex)}
        //     >
        //       <style jsx>{`
        //         .cell {
        //           @inherit: .bbox, .pv16, .ph25, .f16;
        //           &.selected {
        //             @inherit: .bgBlue, .white;
        //           }
        //         }
        //       `}</style>
        //       {this.textToString(this.props.rows[rowIndex][field])}
        //     </div>
        //   )
        // }
        // private selectRow(rowIndex: number) {
        //   this.setState({selectedRow: rowIndex} as State)
        // }
        _this.isRowLoaded = function (_a) {
            var index = _a.index;
            var loaded = Boolean(_this.props.rows[index]);
            return loaded;
        };
        _this.state = {
            height: 400,
            rowHeight: 54,
            overscanRowCount: 20,
            selectedRow: -1,
        };
        global.t = _this;
        return _this;
    }
    TableComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, rowCount = _a.rowCount, fields = _a.fields;
        var _b = this.state, height = _b.height, rowHeight = _b.rowHeight, overscanRowCount = _b.overscanRowCount;
        return (<div className="popup-table">
        <style jsx={true} global={true}>{"\n          .popup-table {\n            @inherit: .bgBlack02, .w100, .overflowXScroll;\n            padding-top: 30px;\n          }\n          .popup-table .table-row {\n            @inherit: .flex, .pointer;\n            &:focus {\n              outline: none;\n            }\n          }\n          .popup-table .table-row.selected {\n            @inherit: .bgBlue, .white;\n          }\n          .ReactVirtualized__Table__Grid {\n            @inherit: .bgWhite;\n            box-shadow: 0 1px 4px rgba(0, 0, 0, .1);\n          }\n          .table-header {\n            @inherit: .fw6;\n          }\n          .ReactVirtualized__Table__headerColumn {\n            @inherit: .ph25, .pv16, .bbox, .overflowHidden, .toe, .black60;\n          }\n          .ReactVirtualized__Table__rowColumn {\n            @inherit: .overflowHidden, .ph25, .pv16, .toe, .br, .bb, .bBlack10,\n              .nowrap;\n          }\n        "}</style>
        <react_virtualized_1.InfiniteLoader isRowLoaded={this.isRowLoaded} loadMoreRows={this.props.loadMoreRows} rowCount={rowCount}>
          {function (_a) {
            var onRowsRendered = _a.onRowsRendered, registerChild = _a.registerChild;
            return <react_virtualized_1.Table headerHeight={54} height={height} noRowsRenderer={_this.noRowsRenderer} overscanRowCount={overscanRowCount} rowHeight={rowHeight} rowCount={rowCount} rowGetter={_this.rowGetter} headerClassName="table-header" ref={registerChild} width={fields
                .map(function (field) { return field.width; })
                .reduce(function (acc, value) { return acc + value; }, 0)} onRowsRendered={onRowsRendered} onRowClick={_this.props.onRowSelection} rowClassName={_this.rowClassName} scrollToIndex={_this.props.scrollToIndex}>
              {fields.map(function (field) {
                return <react_virtualized_1.Column key={field.name} label={field.name} dataKey={field.name} width={field.width}/>;
            })}
            </react_virtualized_1.Table>;
        }}
        </react_virtualized_1.InfiniteLoader>
      </div>);
    };
    TableComponent.prototype.textToString = function (value) {
        if (value instanceof Date) {
            return (pZ(value.getMonth() + 1) + "/" + pZ(value.getDate()) + "/" + value.getFullYear().toString().slice(2, 4) + " " +
                (value.getHours() + ":" + pZ(value.getMinutes()) + ":" + pZ(value.getSeconds())));
        }
        return String(value);
    };
    return TableComponent;
}(React.Component));
exports.default = TableComponent;
//# sourceMappingURL=Table.jsx.map