class PointableQuestionsSet extends PointableSet {
    constructor(
        container,
        callback
    ) {
        super(container, callback, true);
        this.elements = undefined;
        this.answers = undefined;
        this.alternativeModeAnswers = undefined;
    }

    getTemplate(element, index) {
        let elementBoxId = element + "-" + index;
        let overlayTemplate = this.getOverlayTemplate(elementBoxId);
        return `<div id="${elementBoxId}" class="word-wrapper">
                    <div id="${elementBoxId}word-box" class="word-box">
                        ${overlayTemplate}
                        <div class="word">${element}</div>
                    </div>
                </div>`;
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
        return id + "word-box";
    }

    isCompleted() {
        let completed = this.correctSelection.reduce((completed, element) => {
            if (this.answers.includes(element)) {
                return true;
            }
        }, false);
        return completed;
    }

    setExtraAnswers(alternativeModeAnswers) {
        this.alternativeModeAnswers = alternativeModeAnswers;
    }

    isAlternativeModeDone() {
        let sortedSelection = [ ...this.correctSelection ];
        sortedSelection.sort((a, b) => {
            return a - b;
        });
        if (JSON.stringify(this.alternativeModeAnswers) == JSON.stringify(sortedSelection)) {
            this.unsetActions();
            return true;
        }
        return false;
    }

    showAlternativeMode() {
        this.setActions();
    }
}