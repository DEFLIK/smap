export class HashIndexer {
    private static splitChars = [' ', '.', ',', '!', '?', ':', '-', '\r', '\n', '"', '\'', '«', '»'];
    private _sentencesIdByWord = new Map<string, Set<number>>();
    private _sortedPhrases = Array<string>();
    private _initalSentences: Array<string>;

    constructor (sentences: string[]) {
        this._initalSentences = sentences;

        this.initializeSentences(sentences);
    }

    public getSentencesIds(word: string): Set<number> | undefined {
        return this._sentencesIdByWord.get(word);
    }

    public getSentences(word: string): Array<string> {
        let resId = this.getSentencesIds(word);

        if (resId) {
            return Array.from(resId).map(id => this._initalSentences[id])
        }

        return [];
    }

    public getPhrases() {
        return this._sortedPhrases;
    }

    private initializeSentences(sentences: string[]) {
        for (let i = 0; i < sentences.length; i++) {
            let words = sentences[i].split(' ');
            for (let j = 0; j < words.length; j++) {
                if(!this._sentencesIdByWord.has(words[j])) {
                    this._sentencesIdByWord.set(words[j], new Set());
                    this._sortedPhrases.push(words[j]);
                }
                if (!this._sentencesIdByWord.get(words[j])?.has(i)) {
                    this._sentencesIdByWord.get(words[j])?.add(i);
                }
            }
        }

        this._sortedPhrases.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        })
    }
}
