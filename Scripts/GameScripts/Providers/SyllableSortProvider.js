class SyllableSortProvider extends Provider {
    constructor(elements) {
        super(elements);
    }

    getElements(isAlternativeModeActive) {
        return isAlternativeModeActive
            ? this.elements[this.currentIndex].completeWord.split("")
            : this.elements[this.currentIndex].syllables.split("-");
    }

    getAnswers(isAlternativeModeActive) {
        return isAlternativeModeActive
           ? this.elements[this.currentIndex].completeWord.split("")
           : this.elements[this.currentIndex].syllables.split("-");
    }
}