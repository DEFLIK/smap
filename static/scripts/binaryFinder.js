define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BinaryFinder = void 0;
    var BinaryFinder = /** @class */ (function () {
        function BinaryFinder() {
        }
        BinaryFinder.getLeftBorderIndex = function (phrases, prefix, left, right) {
            if (left === right - 1) {
                return left;
            }
            var middle = Math.round((right + left) / 2); // to fix int overflow
            var compare = prefix.toLowerCase().localeCompare(phrases[middle].toLowerCase()) < 0;
            var startsWith = phrases[middle].toLowerCase().startsWith(prefix.toLowerCase());
            if (compare || startsWith) { // to fix disable case check
                return this.getLeftBorderIndex(phrases, prefix, left, middle);
            }
            return this.getLeftBorderIndex(phrases, prefix, middle, right);
        };
        BinaryFinder.getRightBorderIndex = function (phrases, prefix, left, right) {
            while (left !== right - 1) {
                var middle = Math.round((right + left) / 2); // to fix int overflow
                var compare = prefix.toLowerCase().localeCompare(phrases[middle].toLowerCase()) >= 0;
                var startsWith = phrases[middle].toLowerCase().startsWith(prefix.toLowerCase());
                if (compare || startsWith) { // to fix disable case check
                    left = middle;
                }
                else {
                    right = middle;
                }
                return right;
            }
        };
        BinaryFinder.findFirstByPrefix = function (phrases, prefix) {
            var index = this.getLeftBorderIndex(phrases, prefix, -1, phrases.length) + 1;
            if (index < phrases.length && phrases[index].startsWith(prefix)) { // to remove index < phrases.length? & to fix disable case check
                return phrases[index];
            }
            return undefined;
        };
        BinaryFinder.getCountByPrefix = function (phrases, prefix) {
            var leftBorder = this.getLeftBorderIndex(phrases, prefix, -1, phrases.length);
            var rightBorder = this.getRightBorderIndex(phrases, prefix, -1, phrases.length);
            return rightBorder ? rightBorder - leftBorder : 0;
        };
        BinaryFinder.getTopByPrefix = function (phrases, prefix, count) {
            count = Math.min(this.getCountByPrefix(phrases, prefix), count);
            var leftBorder = this.getLeftBorderIndex(phrases, prefix, -1, phrases.length) + 1;
            var result = new Array();
            for (var i = 0; i < count - 1; i++) {
                result[i] = phrases[leftBorder + i];
            }
            return result;
        };
        return BinaryFinder;
    }());
    exports.BinaryFinder = BinaryFinder;
});
