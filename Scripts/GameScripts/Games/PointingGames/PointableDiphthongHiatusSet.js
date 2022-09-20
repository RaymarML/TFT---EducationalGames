class PointableDipthongHiatusSet extends PointableSet {
    constructor(
        container,
        callback
    ) {
        super(container, callback, true);
        this.elements = undefined;
        this.answers = undefined;
        this.alternativeModeAnswers = [];
        this.alternativeModeSelection = [];
        this.alternativeModeCallBack = this.checkAlternativeMode.bind(this);
        this.noOptionCallBack = this.buttonActions.bind(this);
    }

    getTemplate(element, index) {
        let elementBoxId = element + "-" + index;
        let overlayTemplate = this.getOverlayTemplate(elementBoxId);
        return `<div id="${elementBoxId}" class="letter-wrapper">
                    <div id="${elementBoxId}letter-box" class="letter-box">
                        ${overlayTemplate}
                        <div class="letter">${element}</div>
                    </div>
                </div>`;
    }

    showButtons() {
        document.getElementById("noneButton").classList.remove("d-none");
        document.getElementById("noneButton").removeEventListener("click", this.noOptionCallBack, false);
        document.getElementById("noneButton").addEventListener("click", this.noOptionCallBack, false);
    }

    getOverlayTemplate(elementBoxId) {
        return `<div id="${elementBoxId}overlay" data-id="${elementBoxId}" class="action-overlay"></div>`;
    }

    showPointerActions(id) {
        document.getElementById(this.getLetterBoxId(id)).classList.add("hovered");
    }

    hidePointerActions(id) {
        document.getElementById(this.getLetterBoxId(id)).classList.remove("hovered");
    }

    markCorrectActions(id) {
        document.getElementById(this.getLetterBoxId(id)).classList.add("selected-ok");
    }

    markIncorrectActions(id) {
        document.getElementById(this.getLetterBoxId(id)).classList.add("selected-ko");
    }

    getLetterBoxId(id) {
        return id + "letter-box";
    }

    setExtraAnswers(alternativeModeAnswers) {
        this.alternativeModeAnswers = alternativeModeAnswers;
    }

    isCompleted() {
        let sortedSelection = [ ...this.correctSelection ];
        sortedSelection.sort((a, b) => {
            return a - b;
        });
        return JSON.stringify(sortedSelection) == JSON.stringify(this.answers);
    }

    showAlternativeMode() {
        if (this.alternativeModeAnswers.length == 0) return;

        document.getElementById("noneButton").classList.add("d-none");
        document.getElementById("dipthongButton").classList.remove("d-none");
        document.getElementById("hiatusButton").classList.remove("d-none");

        document.getElementById("dipthongButton").addEventListener("click", this.alternativeModeCallBack, false);
        document.getElementById("hiatusButton").addEventListener("click", this.alternativeModeCallBack, false);
    }

    hideAlternativeMode() {
        document.getElementById("dipthongButton").classList.add("d-none");
        document.getElementById("hiatusButton").classList.add("d-none");
        document.getElementById("dipthongButton").removeEventListener("click", this.alternativeModeCallBack, false);
        document.getElementById("hiatusButton").removeEventListener("click", this.alternativeModeCallBack, false);
    }

    buttonActions() {
        document.getElementById("noneButton").removeEventListener("click", this.noOptionCallBack, false);
        this.stickPointer(-1);
    }

    checkAlternativeMode(e) {
        let type = parseInt(e.target.getAttribute("type-id"));
        if (this.alternativeModeAnswers.includes(type) && this.alternativeModeSelection.length < this.alternativeModeAnswers.length) {
            this.alternativeModeSelection.push(type);
        }

        if (this.isAlternativeModeDone()) {
            this.pointManager.addAlternativeMode();
            this.alternativeModeAnswers = [];
            this.alternativeModeSelection = [];
            this.hideAlternativeMode();
            this.callback();
        }
    }

    isAlternativeModeDone() {
        return JSON.stringify(this.alternativeModeAnswers) == JSON.stringify(this.alternativeModeSelection);
    }
}