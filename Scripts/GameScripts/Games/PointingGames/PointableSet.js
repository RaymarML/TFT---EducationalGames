class PointableSet {

    constructor(
        container,
        callback,
        firstActionsActive
    ) {
        this.container = container;
        this.callback = callback;

        this.showCallback = this.showPointer.bind(this);
        this.hideCallback = this.hidePointer.bind(this);
        this.stickCallback = this.stickPointer.bind(this);

        this.correctSelection = [];
        this.incorrectSelection = [];
        this.firstActionsActive = firstActionsActive;

        this.pointManager = new PointManager();
    }

    get pointManager() {
        return this._pointManager;
    }

    set pointManager(pM) {
        this._pointManager = pM;
    }

    getContainer() {
        return this.container;
    }

    setupElements(elements) {
        this.elements = elements;
        this.setTemplate();
        this.setActions();
        this.resetAssets();
    }

    setupAnwers(answers) {
        this.answers = answers;
    }

    resetAssets() {
        this.correctSelection = [];
        this.incorrectSelection = [];
        document.getElementById("mistakesCounter").innerText = 0;
        this.pointManager.resetCurrtentPoints();
    }

    setTemplate() {
        document.getElementById(this.container).innerHTML =
            this.elements.
                reduce((template, letter, index) => {
                    return template + this.getTemplate(letter, index);
                }, "");
    }

    setActions() {
        this.elements.
            filter((letter, index) => {
                return this.firstActionsActive || (index > 0);
            }).
            forEach((letter, index) => {
                let realIndex = this.firstActionsActive ? index : (index + 1);
                let letterBoxId = this.buildLetterBoxId(letter, realIndex);
                let el = document.getElementById(this.getActionOverlayId(letterBoxId));
                el.addEventListener("mouseover", this.showCallback, false);
                el.addEventListener("mouseleave", this.hideCallback, false);
                el.addEventListener("click", this.stickCallback, false);
            });
        if (document.getElementById("noneButton")) {
            this.showButtons();
        }
    }

    unsetActions() {
        this.elements.
            filter((letter, index) => {
                return this.firstActionsActive || (index > 0);
            }).
            forEach((letter, index) => {
                let realIndex = this.firstActionsActive ? index : (index + 1);
                let letterBoxId = this.buildLetterBoxId(letter, realIndex);
                let el = document.getElementById(this.getActionOverlayId(letterBoxId));
                el.removeEventListener("mouseover", this.showCallback, false);
                el.removeEventListener("mouseleave", this.hideCallback, false);
                el.removeEventListener("click", this.stickCallback, false);
            });
    }

    getActionOverlayId(id) {
        return id + "overlay";
    }

    isOverlayFixed(id) {
        return document.getElementById(this.getActionOverlayId(id)).classList.contains("overlaySticked");
    }

    buildLetterBoxId(letter, index) {
        return letter + "-" + index;
    }

    getIndexFromLetterId(id) {
        return parseInt(id.split("-")[1]);
    }

    showPointer(e) {
        let id = e.target.getAttribute('data-id');
        if (!this.isOverlayFixed(id)) {
            this.showPointerActions(id);
        }
    }

    hidePointer(e) {
        let id = e.target.getAttribute('data-id');
        if (!this.isOverlayFixed(id)) {
            this.hidePointerActions(id);
        }
    }

    stickPointer(e) {
        let index, id;
        if (e == -1) {
            index = -1;
        } else {
            id = e.target.getAttribute('data-id');
            index = this.getIndexFromLetterId(id);
        }

        this.answers.includes(index) ? this.markCorrect(id, index) : this.markIncorrect(id, index);
        if (this.isCompleted()) {
            this.unsetActions();
            this.callback();
        }
    }

    markCorrect(id, index) {
        if (!this.correctSelection.includes(index)) {
            this.correctSelection.push(index);
            this.pointManager.addCorrect();
        }
        if(index == -1) return;

        document.getElementById(this.getActionOverlayId(id)).classList.add("overlaySticked");
        this.markCorrectActions(id);
    }

    markIncorrect(id, index) {
        if (!this.incorrectSelection.includes(index)) {
            this.incorrectSelection.push(index);
            this.pointManager.decreaseIncorrect();
            document.getElementById("mistakesCounter").innerText = this.incorrectSelection.length;
        }
        if(index == -1) return;

        document.getElementById(this.getActionOverlayId(id)).classList.remove("overlaySticked");
        this.markIncorrectActions(id);
    }

    getTotalPoints() {
        return this.pointManager.getTotalPoints();
    }
}