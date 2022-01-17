class BinaryFinder {
    /**
     * 
     * @param {Array<string>} phrases 
     * @param {String} prefix 
     * @param {Number} left 
     * @param {Number} right 
     * @returns 
     */
    static getLeftBorderIndex(phrases, prefix, left, right) {
        if (left === right - 1) {
            return left;
        }
        let middle = Math.round((right + left) / 2); // to fix int overflow
        let compare = prefix.toLowerCase().localeCompare(phrases[middle].toLowerCase()) < 0;
        let startsWith = phrases[middle].toLowerCase().startsWith(prefix.toLowerCase());
        if (compare || startsWith) { // to fix disable case check
            return this.getLeftBorderIndex(phrases, prefix, left, middle);
        }
        return this.getLeftBorderIndex(phrases, prefix, middle, right);
    }

    /**
     * 
     * @param {Array<string>} phrases 
     * @param {String} prefix 
     * @param {Number} left 
     * @param {Number} right 
     * @returns 
     */
    static getRightBorderIndex(phrases, prefix, left, right) {
        while (left !== right - 1) {
            let middle = Math.round((right + left) / 2); // to fix int overflow
            let compare = prefix.toLowerCase().localeCompare(phrases[middle].toLowerCase()) >= 0;
            let startsWith = phrases[middle].toLowerCase().startsWith(prefix.toLowerCase());
            if (compare || startsWith) { // to fix disable case check
                left = middle;
            } else {
                right = middle;
            }
            return right;
        }
    }

    /**
     * 
     * @param {Array<String>} phrases 
     * @param {String} prefix 
     */
    static findFirstByPrefix(phrases, prefix) {
        let index = this.getLeftBorderIndex(phrases, prefix, -1, phrases.length) + 1;
        if (index < phrases.length && phrases[index].startsWith(prefix)) { // to remove index < phrases.length? & to fix disable case check
            return phrases[index];
        }

        return null;
    }

    /**
     * 
     * @param {Array<String>} phrases 
     * @param {String} prefix 
     */
    static getCountByPrefix(phrases, prefix) {
        let leftBorder = this.getLeftBorderIndex(phrases, prefix, -1, phrases.length);
        let rightBorder = this.getRightBorderIndex(phrases, prefix, -1, phrases.length);

        return rightBorder - leftBorder;
    }

    /**
     * 
     * @param {Array<String>} phrases 
     * @param {String} prefix 
     * @param {Number} count 
     */
    static getTopByPrefix(phrases, prefix, count) {
        count = Math.min(this.getCountByPrefix(phrases, prefix), count);
        let leftBorder = this.getLeftBorderIndex(phrases, prefix, -1, phrases.length) + 1;
        let result = [];

        for (let i = 0; i < count; i++) {
            result[i] = phrases[leftBorder + i];
        }

        return result;
    }
}

class BinaryFinderTester {
    static init() {
        console.log(BinaryFinder.getTopByPrefix(this.phrases, 'АН', 3));
    }

    static phrases = [
        "АН", "АНГ", "АМН", "БВ", "БВГД", "АНГВ"
    ].sort();
}