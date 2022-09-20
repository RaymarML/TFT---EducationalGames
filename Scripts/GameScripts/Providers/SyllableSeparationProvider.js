class SyllableSeparatorProvider extends Provider {
    constructor() {
        super();
    }

    getElements() {
        return this.elements[this.currentIndex].completeWord.split("");
    }

    getAnswers(isAlternativeModeActive) {
        var answers = [];
        var acumulatedLength = 0;
        var wordSyllbles = this.elements[this.currentIndex].syllables.split("-");
        for (var i = 0; i < wordSyllbles.length - 1; i++) {
            acumulatedLength += wordSyllbles[i].length;
            answers.push(acumulatedLength);
        }
        return answers;
    }
}