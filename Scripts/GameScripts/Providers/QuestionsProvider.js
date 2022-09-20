class QuestionsProvider extends Provider {
    constructor() {
        super();
        this.elementsPerRound = 5;
        this.extraAnswers = true;
        this.currentAnswerIndex = -1;
        this.currentSyllables = 0;
    }

    hasNextElement() {
        return this.currentIndex * 5 < this.elements.length;
    }

    getElements() {
        return this.elements
            .slice(this.currentIndex * this.elementsPerRound, this.currentIndex * this.elementsPerRound + this.elementsPerRound)
            .map((element) => {
                return element.completeWord;
            });
    }

    getAnswers(isAlternativeModeActive) {
        let currentElements = this.elements.slice(this.currentIndex * this.elementsPerRound, this.currentIndex * this.elementsPerRound + this.elementsPerRound);

        if (this.currentAnswerIndex == -1) {
            this.currentAnswerIndex = Math.floor(Math.random() * currentElements.length);
            this.currentSyllables = currentElements[this.currentAnswerIndex].syllables.split("-").length;
        }

        let currentSyllables = this.currentSyllables;
        return currentElements.
            filter((element) => element.syllables.split("-").length == currentSyllables).
            map((element) => {

               return currentElements.findIndex(x =>
                    x.completeWord.localeCompare(element.completeWord) == 0
               );
            });
    }

    getTitleData(isAlternativeModeActive) {
        return isAlternativeModeActive
            ? `¿Qué palabras tiene ${this.currentSyllables} sílabas?`
            : `¿Qué palabra tiene ${this.currentSyllables} sílabas?`;
    }

    getExtraAnswers() {
        return this.getAnswers(true)
    }

    setRoundsInView() {
        document.getElementById("totalWords").innerText = this.elements.length / 5;
    }
}