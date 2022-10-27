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
        this.answersArray = [];
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
        this.answersArray = [ ...answers.sort((a, b) => a - b) ];
        return [ ...new Set(this.answersArray) ];
    }


    getExtraAnswers() {
        let elements = this.getElements();
        let extraAnswersArray = [];
        let aux = [];   

        for (var i = 0; i < this.answersArray.length; i++) {
            if (i > 0) {
                
                if (this.answersArray[i] - this.answersArray[i - 1] == 1) {


                    if (!aux.includes(this.answersArray[i - 1])) {
                        aux.push(this.answersArray[i - 1]);
                    }

                    if (!aux.includes(this.answersArray[i])) {
                        aux.push(this.answersArray[i]);
                    }
                }

                if (this.answersArray[i] - this.answersArray[i - 1] == 2
                    && elements[this.answersArray[i] - 1] == 'h') {

                    if (!aux.includes(this.answersArray[i - 1])) {
                        aux.push(this.answersArray[i - 1]);
                    }

                    if (!aux.includes(this.answersArray[i])) {
                        aux.push(this.answersArray[i]);
                    }
                }

                if (this.answersArray[i] - this.answersArray[i - 1] != 1 || i == this.answersArray.length - 1) {

                    if (aux.length == 3
                        && this.isTripthong(elements[aux[0]], elements[aux[1]], elements[aux[2]])) {
                        extraAnswersArray.push(3);
                    }

                    if (aux.length == 2 && this.isHiatus(elements[aux[0]], elements[aux[1]])) {
                        extraAnswersArray.push(1);
                    }

                    if (aux.length == 2 && this.isDipthong(elements[aux[0]], elements[aux[1]])) {
                        extraAnswersArray.push(2);
                    }

                    aux = [];
                }
            }
        }


        return extraAnswersArray;
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
                }

                if (this.isHiatus(letterA, letterB)
                    && !hiatusIndexes.includes(firstIndex)
                    && !hiatusIndexes.includes(secondIndex)
                ) {
                    hiatusIndexes.push(firstIndex);
                    hiatusIndexes.push(secondIndex);
                }

                if (this.isHiatus(letterB, letterC)
                    && !hiatusIndexes.includes(secondIndex)
                    && !hiatusIndexes.includes(thirdIndex)
                ) {
                    hiatusIndexes.push(secondIndex);
                    hiatusIndexes.push(thirdIndex);
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
                currentLetterIndex += syllables[i].length;
                continue;
            }

            if (dipthongIndexInSyllable != 0) {
                dipthongTripthongIndexes = dipthongTripthongIndexes.concat(
                    dipthongIndexInSyllable.map(el => el + currentLetterIndex)
                );
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