"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var AppFooter = /** @class */ (function (_super) {
    __extends(AppFooter, _super);
    function AppFooter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppFooter.prototype.render = function () {
        return (<react_1.Fragment>
                <hr />
                <p>Copyright &copy 2021 Acme Ltd.</p>
            </react_1.Fragment>);
    };
    return AppFooter;
}(react_1.Component));
exports.default = AppFooter;
