define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StateController = void 0;
    var StateController = /** @class */ (function () {
        function StateController(_mainClass, _activeStateClass) {
            this._mainClass = _mainClass;
            this._activeStateClass = _activeStateClass;
        }
        StateController.prototype.activate = function () {
            $(".".concat(this._mainClass)).addClass("".concat(this._activeStateClass));
        };
        StateController.prototype.disable = function () {
            $(".".concat(this._mainClass)).removeClass("".concat(this._activeStateClass));
        };
        return StateController;
    }());
    exports.StateController = StateController;
});
