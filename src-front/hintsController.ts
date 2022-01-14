import { BinaryFinder } from "./binaryFinder";
import { HashIndexer } from "./hashIndexer";

export class HintsController {
    public static getHints(words: string[], indexer: HashIndexer, count: number): string[] {
        if (words.length === 0) return [];
        let currentIndexer = indexer;

        if (true) {
            for (let i = 0; i < words.length - 1; i++)  {
                currentIndexer = new HashIndexer(currentIndexer.getSentences(words[i]));
            }

            let topSuggestions = BinaryFinder.getTopByPrefix(currentIndexer.getPhrases(), words[words.length - 1], count);
            let res = new Array<string>();
            for (let suggest of topSuggestions) {
                res = res.concat(currentIndexer.getSentences(suggest));
            }

            return Array.from(new Set(res));
        }
    }
}