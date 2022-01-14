define(["require", "exports", "./binaryFinder", "./hashIndexer"], function (require, exports, binaryFinder_1, hashIndexer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HintsController = void 0;
    var HintsController = /** @class */ (function () {
        function HintsController() {
        }
        HintsController.getHints = function (words, indexer, count) {
            if (words.length === 0)
                return [];
            var currentIndexer = indexer;
            if (true) {
                for (var i = 0; i < words.length - 1; i++) {
                    currentIndexer = new hashIndexer_1.HashIndexer(currentIndexer.getSentences(words[i]));
                }
                var topSuggestions = binaryFinder_1.BinaryFinder.getTopByPrefix(currentIndexer.getPhrases(), words[words.length - 1], count);
                var res = new Array();
                for (var _i = 0, topSuggestions_1 = topSuggestions; _i < topSuggestions_1.length; _i++) {
                    var suggest = topSuggestions_1[_i];
                    res = res.concat(currentIndexer.getSentences(suggest));
                }
                return Array.from(new Set(res));
            }
        };
        return HintsController;
    }());
    exports.HintsController = HintsController;
});
