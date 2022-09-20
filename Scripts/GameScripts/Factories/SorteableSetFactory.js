class SorteableSetFactory {
    constructor() { }

    getSorter(type, callback) {
        if (type == "words") return this.getWordsSorter(callback);
        if (type == "syllable") return this.getSyllableSorter(callback);
        if (type == "letter") return this.getLetterSorter(callback);
        return null;
    }

    getWordsSorter(callback) {
        return new SorteableSet(
            "gameWrapper",
            "word-wrapper",
            "word",
            "vertical",
            callback
        );
    }

    getSyllableSorter(callback) {
        return new SorteableSet(
            "gameWrapper",
            "syllable-wrapper",
            "syllable",
            "horizontal",
            callback
        );
    }

    getLetterSorter(callback) {
        return new SorteableSet(
            "gameWrapper",
            "letter-wrapper",
            "letter",
            "horizontal",
            callback
        );
    }
}