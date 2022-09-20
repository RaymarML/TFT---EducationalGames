class SorteableSet {

    constructor(
        container,
        itemWrapper,
        item,
        direction,
        callback
    ) {
        this.container = container
        this.direction = direction;
        this.itemWrapper = itemWrapper;
        this.item = item;
        this.callback = callback;

        this.elements = undefined;
        this.answers = undefined;
        this.sortableObject = undefined;
        this.isCompletedFunction = this.isCompleted;

        this.pointManager = new PointManager();
    }

    setupElements(elements) {
        this.elements = elements;
        this.setActions();
        this.setTemplate();
        this.pointManager.resetCurrtentPoints();
    }

    setupAnwers(answers) {
        this.answers = JSON.stringify(answers);
    }

    setTemplate() {
        let container = document.getElementById(this.container);
        container.innerHTML =
            this.getShuffledElements().
                reduce((template, element) => {
                    return template + this.getTemplate(element);
                }, "");
        container.classList.remove("d-none");
    }

    setActions() {
        let scope = this;
        this.sortableObject = new Sortable(
            document.getElementById(this.container),
            {
                animation: 300,
                dataIdAttr: 'data-id',
                onUpdate: function (evt) {
                    scope.isCompletedFunction();
                }
            }
        );
    }

    getShuffledElements() {
        const shuffledElements = this.elements.
            map(syllable => ({ syllable, sort: Math.random() })).
            sort((a, b) => a.sort - b.sort).
            map(({ syllable }) => syllable);
        return this.isSorted(shuffledElements)
            ? this.getShuffledElements()
            : shuffledElements;
    }

    getTemplate(element) {
        return `<div class="${this.itemWrapper}" data-id="${element}">
                    <div class="${this.item}">${element}</div>
                </div>`;
    }

    isSorted(shuffledElements) {
        return JSON.stringify(shuffledElements) == this.answers
    }

    isCompleted() {
        if (JSON.stringify(this.sortableObject.toArray()) == this.answers) {
            this.sortableObject.option("disabled", true);
            let letters = document.getElementsByClassName(this.item);
            this.pointManager.addCorrect();
            Array.from(letters).forEach(letter => {
                letter.style.color = "#6ECB63";
            });
            this.callback();
        }
    }

    getContainer() {
        return this.container;
    }

    isAlternativeModeDone() {
        console.log(this.item);
        if (this.item == "word") return this.checkWordSortAlterantiveMode();
        if (this.item == "syllable") return this.checkSyllableSortAlterantiveMode();
        if (this.item == "letter") return this.checkLetterSortAlterantiveMode();
        return false;
    }

    checkWordSortAlterantiveMode() {
        if (JSON.stringify(this.sortableObject.toArray()) == this.answers) {
            this.pointManager.addAlternativeMode();
            return true;
        }
        return false;
    }

    checkSyllableSortAlterantiveMode() {
        if (JSON.stringify(this.sortableObject.toArray()) == this.answers) {
            this.pointManager.addAlternativeMode();
            return true;
        }
        return false;
    }

    checkLetterSortAlterantiveModecheckLetterSortAlterantiveMode() {
        if (JSON.stringify(this.sortableObject.toArray()) == this.answers) {
            this.pointManager.addAlternativeMode();
            return true;
        }
        return false;
    }

    showAlternativeMode() { }

    getTotalPoints() {
        return this.pointManager.getTotalPoints();
    }
}