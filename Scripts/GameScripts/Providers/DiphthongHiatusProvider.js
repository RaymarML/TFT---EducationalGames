class DiphthongHiatusProvider extends Provider {
    constructor() {
        super();

        this.openedVocals = [
            "a",
            "e",
            "o"
        ];
        this.closedVocals = [
            "i",
            "u",
            "y",
            "ü"
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
        this.extraAnswersArray = [];
    }

    getElements() {
        return this.elements[this.currentIndex].completeWord.split("");
    }


    getAnswers(isAlternativeModeActive) {
        var answers = [];
        this.extraAnswersArray = [];
        answers = answers.concat(this.getHiatusIndexes());
        answers = answers.concat(this.getDipthongTripthongIndexes());

        if (answers.length == 0) answers = [-1];
        return answers.sort((a, b) => a - b);
    }


    getExtraAnswers() {
        return this.extraAnswersArray;
    }

    getHiatusIndexes() {
        var hiatusIndexes = [];
        var elements = this.getElements();
        for (var i = 0; i < elements.length; i++) {
            if (i > 1) {

                var firstIndex = i - 2;
                var secondIndex = i - 1;
                var thirdIndex = i;

                var letterA = elements[firstIndex];
                var letterB = elements[secondIndex];
                var letterC = elements[thirdIndex];

                if (this.isHiatusWithInterleavedH(letterA, letterB, letterC)) {
                    hiatusIndexes.push(firstIndex);
                    hiatusIndexes.push(thirdIndex);
                    this.extraAnswersArray.push(1);
                }

                if (this.isHiatus(letterA, letterB)
                    && !hiatusIndexes.includes(firstIndex)
                    && !hiatusIndexes.includes(secondIndex)
                ) {
                    hiatusIndexes.push(firstIndex);
                    hiatusIndexes.push(secondIndex);
                    this.extraAnswersArray.push(1);
                }

                if (this.isHiatus(letterB, letterC)
                    && !hiatusIndexes.includes(secondIndex)
                    && !hiatusIndexes.includes(thirdIndex)
                ) {
                    hiatusIndexes.push(secondIndex);
                    hiatusIndexes.push(thirdIndex);
                    this.extraAnswersArray.push(1);
                }
            }
        }
        return hiatusIndexes;
    }

    isHiatusWithInterleavedH(letterA, letterB, letterC) {
        if (letterB != 'h') return false;
        return this.isHiatus(letterA, letterC);
    }

    isHiatus(letterA, letterB) {
        if (this.tildedClosedVocals.includes(letterA) && this.openedVocals.includes(letterB)) return true;
        if (this.openedVocals.includes(letterA) && this.tildedClosedVocals.includes(letterB)) return true;

        if (this.openedVocals.includes(letterA) && this.openedVocals.includes(letterB)) return true;
        return false;
    }

    getDipthongTripthongIndexes() {
        var dipthongTripthongIndexes = [];
        var syllables = this.elements[this.currentIndex].syllables.split("-");

        var currentLetterIndex = 0;

        for (var i = 0; i < syllables.length; i++) {
            var dipthongIndexInSyllable = this.getDipthongIndexes(syllables[i]);
            var tripthongIndexInSyllable = this.getTripthongIndexes(syllables[i]);


            if (tripthongIndexInSyllable.length != 0) {
                dipthongTripthongIndexes = dipthongTripthongIndexes.concat(
                    tripthongIndexInSyllable.map(el => el + currentLetterIndex)
                );
                this.extraAnswersArray.push(3);
                currentLetterIndex += syllables[i].length;
                continue;
            }

            if (dipthongIndexInSyllable != 0) {
                dipthongTripthongIndexes = dipthongTripthongIndexes.concat(
                    dipthongIndexInSyllable.map(el => el + currentLetterIndex)
                );
                this.extraAnswersArray.push(2);
            }

            currentLetterIndex += syllables[i].length;
        }

        return dipthongTripthongIndexes;
    }

    getDipthongIndexes(syllable) {
        var indexes = [];
        var syllablesLetters = syllable.split("");

        for (var i = 0; i <= syllablesLetters.length; i++) {
            if (i > 0) {
                if (i == 2 && this.hasFakeDipthong(syllable)) {
                    continue;
                }

                if (this.isDipthong(syllablesLetters[i], syllablesLetters[i - 1])) {
                    indexes.push(i - 1);
                    indexes.push(i);
                }
            }
        }

        return indexes;
    }

    getTripthongIndexes(syllable) {
        var indexes = [];
        var syllablesLetters = syllable.split("");

        if (syllablesLetters.length < 3) return indexes;

        for (var i = 0; i <= syllablesLetters.length; i++) {
            if (i > 0 && i < syllablesLetters.length - 1) {
                if (this.isTripthong(syllablesLetters[i - 1], syllablesLetters[i], syllablesLetters[i + 1])) {
                    indexes.push(i - 1);
                    indexes.push(i);
                    indexes.push(i + 1);
                }
            }
        }

        return indexes;
    }

    hasFakeDipthong(syllable) {
        if (syllable.startsWith("que")) return true;
        if (syllable.startsWith("qui")) return true;
        if (syllable.startsWith("gue")) return true;
        if (syllable.startsWith("gui")) return true;
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

    isTripthong(letterA, letterB, letterC) {
        if (
            this.closedVocals.includes(letterA) 
            && this.openedVocals.includes(letterB)
            && this.closedVocals.includes(letterC)
        ) return true;

        if (
            this.closedVocals.includes(letterA)
            && this.tildedOpenedVocals.includes(letterB)
            && this.closedVocals.includes(letterC)
        ) return true;

        return false;
    }
}