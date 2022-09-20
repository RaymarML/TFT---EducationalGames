class WordSortProvider extends Provider {
    constructor(elements) {
        super(elements);
        this.elementsPerRound = 5;
    }

    getElements() {
        return this.getSortedElements();
    }

    hasNextElement() {
        return this.currentIndex * 5 < this.elements.length;
    }

    getAnswers(isAlternativeModeActive) {
        return isAlternativeModeActive
            ? this.getAlternativeModeSort()
            : this.getSortedElements();
    }

    getSortedElements() {
        return this.elements.slice(this.currentIndex * this.elementsPerRound, this.currentIndex * this.elementsPerRound + this.elementsPerRound).
            map((element) => { return element.completeWord }).
            sort((a, b) => { return a.localeCompare(b) });
    }

    getAlternativeModeSort() {  
        return this.elements.slice(this.currentIndex * 5, this.currentIndex * 5 + 5).
            sort(this.compareWords).
            map((element) => {
                console.log(element.completeWord + "")
                return element.completeWord + ""
            });
    }

    compareWords(a, b) {
        if (a.syllables.split("-").length < b.syllables.split("-").length) {
            return -1;
        }
        if (a.syllables.split("-").length > b.syllables.split("-").length) {
            return 1;
        }
        return a.completeWord.localeCompare(b.completeWord);
    }

    setRoundsInView() {
        document.getElementById("totalWords").innerText = this.elements.length / 5;
    }
}