class Provider {
    constructor() {
        this.currentIndex = 0;
        this.extraAnswers = false;
        this.loadElements();
    }

    loadElements() {
        this.elements = JSON.parse(document.getElementById("WordPlaceholder").value);
    }

    reloadInformation() {
        this.loadElements();
    }

    nextElements(isAlternativeModeActive) {
        return this.hasNextElement()
            ? this.getElements(isAlternativeModeActive)
            : [];
    }

    hasNextElement() {
        return this.currentIndex < this.elements.length;
    }

    setRoundsInView() {
        document.getElementById("totalWords").innerText = this.elements.length;
    }

    updateRoundCounter() {
        document.getElementById("wordCounter").innerText = this.currentIndex + 1;
    }

    hasExtraAnswers() {
        return this.extraAnswers;
    }

    updateCounter() {
        this.currentIndex = this.currentIndex + 1;
    }
}
