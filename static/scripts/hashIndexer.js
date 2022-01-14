define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HashIndexer = void 0;
    var HashIndexer = /** @class */ (function () {
        function HashIndexer(sentences) {
            this._sentencesIdByWord = new Map();
            this._sortedPhrases = Array();
            this._initalSentences = sentences;
            this.initializeSentences(sentences);
        }
        HashIndexer.prototype.getSentencesIds = function (word) {
            return this._sentencesIdByWord.get(word);
        };
        HashIndexer.prototype.getSentences = function (word) {
            var _this = this;
            var resId = this.getSentencesIds(word);
            if (resId) {
                return Array.from(resId).map(function (id) { return _this._initalSentences[id]; });
            }
            return [];
        };
        HashIndexer.prototype.getPhrases = function () {
            return this._sortedPhrases;
        };
        HashIndexer.prototype.initializeSentences = function (sentences) {
            var _a, _b;
            for (var i = 0; i < sentences.length; i++) {
                var words = sentences[i].split(' ');
                for (var j = 0; j < words.length; j++) {
                    if (!this._sentencesIdByWord.has(words[j])) {
                        this._sentencesIdByWord.set(words[j], new Set());
                        this._sortedPhrases.push(words[j]);
                    }
                    if (!((_a = this._sentencesIdByWord.get(words[j])) === null || _a === void 0 ? void 0 : _a.has(i))) {
                        (_b = this._sentencesIdByWord.get(words[j])) === null || _b === void 0 ? void 0 : _b.add(i);
                    }
                }
            }
            this._sortedPhrases.sort(function (a, b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
        };
        HashIndexer.splitChars = [' ', '.', ',', '!', '?', ':', '-', '\r', '\n', '"', '\'', '«', '»'];
        return HashIndexer;
    }());
    exports.HashIndexer = HashIndexer;
});
