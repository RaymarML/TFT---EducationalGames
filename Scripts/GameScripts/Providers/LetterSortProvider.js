class LetterSortProvider extends Provider {
    constructor(elements) {
        super(elements);
    }

    getElements() {
        return this.elements[this.currentIndex].completeWord.split("");
    }

    getAnswers(isAlternativeModeActive) {
        return this.elements[this.currentIndex].completeWord.split("");
    }
}