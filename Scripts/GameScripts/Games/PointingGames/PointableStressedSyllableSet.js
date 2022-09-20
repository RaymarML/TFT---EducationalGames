class PointableStressedSyllableSet extends PointableSet {
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
        document.getElementById("AcuteButton").addEventListener("click", this.alternativeModeCallBack, false);
        document.getElementById("TrowelButton").addEventListener("click", this.alternativeModeCallBack, false);
        document.getElementById("EsdrujulaButton").addEventListener("click", this.alternativeModeCallBack, false);

        document.getElementById("AcuteButton").classList.remove("d-none");
        document.getElementById("TrowelButton").classList.remove("d-none");
        document.getElementById("EsdrujulaButton").classList.remove("d-none");
    }

    hideAlternativeMode() {
        document.getElementById("AcuteButton").removeEventListener("click", this.alternativeModeCallBack, false);
        document.getElementById("TrowelButton").removeEventListener("click", this.alternativeModeCallBack, false);
        document.getElementById("EsdrujulaButton").removeEventListener("click", this.alternativeModeCallBack, false);

        document.getElementById("AcuteButton").classList.add("d-none");
        document.getElementById("TrowelButton").classList.add("d-none");
        document.getElementById("EsdrujulaButton").classList.add("d-none");
    }
    
    checkAlternativeMode(e) {
        let type = parseInt(e.target.getAttribute("type-id"));
        let parsedSelection = this.elements.length - 1 - type;
        if (this.alternativeModeAnswers.includes(parsedSelection)) {
            this.alternativeModeSelection.push(parsedSelection);
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