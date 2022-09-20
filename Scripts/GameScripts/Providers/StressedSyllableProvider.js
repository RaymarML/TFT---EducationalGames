class StressedSyllableProvider extends Provider {
    constructor(elements) {
        super(elements);
        this.extraAnswers = true;
    }

    getElements() {
        return this.elements[this.currentIndex].syllables.split("-");
    }

    getAnswers(isAlternativeModeActive) {
        let answers = (this.getElements().length - 1) - this.elements[this.currentIndex].stressedSyllable;
        return [answers];
    }

    getExtraAnswers() {
        return this.getAnswers();
    }
}