export class BinaryFinder {
    static getLeftBorderIndex(phrases: Array<string>, prefix: string, left: number, right: number): number {
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

    static getRightBorderIndex(phrases: Array<string>, prefix: string, left: number, right: number): number | undefined {
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

    static findFirstByPrefix(phrases: Array<string>, prefix: string): string | undefined {
        let index = this.getLeftBorderIndex(phrases, prefix, -1, phrases.length) + 1;
        if (index < phrases.length && phrases[index].startsWith(prefix)) { // to remove index < phrases.length? & to fix disable case check
            return phrases[index];
        }

        return undefined
    }

    static getCountByPrefix(phrases: Array<string>, prefix: string): number {
        let leftBorder = this.getLeftBorderIndex(phrases, prefix, -1, phrases.length);
        let rightBorder = this.getRightBorderIndex(phrases, prefix, -1, phrases.length);
        
        return rightBorder ? rightBorder - leftBorder : 0;
    }

    static getTopByPrefix(phrases: Array<string>, prefix: string, count: number) {
        count = Math.min(this.getCountByPrefix(phrases, prefix), count);
        let leftBorder = this.getLeftBorderIndex(phrases, prefix, -1, phrases.length) + 1;
        let result = new Array<string>();

        for (let i = 0; i < count - 1; i++) {
            result[i] = phrases[leftBorder + i];
        }

        return result;
    }
}