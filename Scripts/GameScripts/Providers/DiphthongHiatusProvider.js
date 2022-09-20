class DiphthongHiatusProvider extends Provider {
    constructor() {
        super();
        this.vocals = [
            "a",
            "e",
            "o",
            "i",
            "u"
        ],
        this.openedVocals = [
            "a",
            "e",
            "o"
        ];
        this.closedVocals = [
            "i",
            "u"
        ];
        this.tildedOpenedVocals = [
            "á",
            "é",
            "ó",
        ],
        this.tildedClosedVocals = [
            "í",
            "ú"
        ];
        this.extraAnswers = true;
    }

    getElements() {
        return this.elements[this.currentIndex].completeWord.split("");
    }

    getAnswers(isAlternativeModeActive) {
        var answers = [];
        var elements = this.getElements();
        
        for (var i = 0; i < elements.length; i++) {
            if (i > 0) {
                let letterA = elements[i - 1];
                let letterB = elements[i];

                if (this.isHiatus(letterA, letterB) || this.isDipthong(letterA, letterB)) {
                    answers.push(i - 1);
                    answers.push(i);
                }
            }
        }

        if (answers.length == 0) answers = [-1];
        return answers;
    }

    getExtraAnswers() {
        let extraAnswers = [];
        let answers = this.getAnswers();
        let elements = this.getElements();
        if (answers.length == 1) return [];

        for (var i = 0; i < answers.length; i++) {
            if ( i > 0 ) {
                let letterA = elements[answers[i - 1]];
                let letterB = elements[answers[i]];
                if (this.isHiatus(letterA, letterB)) extraAnswers.push(1);
                if (this.isDipthong(letterA, letterB)) extraAnswers.push(2);
            }
        }
        return extraAnswers;
    }

    isHiatus(letterA, letterB) {
        if (this.tildedClosedVocals.includes(letterA) && this.openedVocals.includes(letterB)) return true;
        if (this.openedVocals.includes(letterA) && this.tildedClosedVocals.includes(letterB)) return true;
        if (this.openedVocals.includes(letterA) && this.openedVocals.includes(letterB)) return true;
        return false;
    }

    isDipthong(letterA, letterB) {
        if (this.tildedOpenedVocals.includes(letterA) && this.closedVocals.includes(letterB)) return true;
        if (this.closedVocals.includes(letterA) && this.tildedOpenedVocals.includes(letterB)) return true;
        if (this.openedVocals.includes(letterA) && this.closedVocals.includes(letterB)) return true;
        if (this.closedVocals.includes(letterA) && this.openedVocals.includes(letterB)) return true;
        if (this.closedVocals.includes(letterA) && this.closedVocals.includes(letterB)) return true;
        return false;
    }
}