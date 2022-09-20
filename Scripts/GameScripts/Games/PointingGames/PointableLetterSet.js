class PointableLetterSet extends PointableSet {
    constructor(
        container,
        callback,
    ) {
        super(container, callback, false);
        this.elements = undefined;
        this.answers = undefined;
    }

    getTemplate(element, index) {
        let elementBoxId = element + "-" + index;
        let separatorTemplate = index != 0 ? this.getSeparatorTemplate(elementBoxId) : "";
        let overlayTemplate = index != 0 ? this.getOverlayTemplate(elementBoxId) : "";
        return `<div id="${elementBoxId}" class="letter-wrapper">
                    ${separatorTemplate}
                    <div class="letter-box">
                        ${overlayTemplate}
                        <div class="letter">${element}</div>
                    </div>
                </div>`;
    }

    getOverlayTemplate(letterBoxId) {
        return `<div id="${letterBoxId}overlay" data-id="${letterBoxId}" class="action-overlay"></div>`;
    }

    getSeparatorTemplate(letterBoxId) {
        return `<div id="${letterBoxId}separator-zone" class="separator-zone">
                    <div class="separator-item">
                        <i id="${letterBoxId}incorrect-separation" class="hide incorrect-separation fa-solid fa-xmark"></i>
                        <i id="${letterBoxId}correct-separation" class="hide correct-separation fa-solid fa-minus"></i>
                        <i id="${letterBoxId}default-separation" class="default-separation fa-solid fa-question"></i>
                    </div>
                </div>`;
    }

    showPointerActions(id) {
        this.toggleSeparator(id, 17);
        this.resizeActionOverlay(id, 17);
    }

    hidePointerActions(id) {
        this.toggleSeparator(id, 0);
        this.resizeActionOverlay(id, -17);
    }

    toggleSeparator(id, width) {
        document.getElementById(this.getSeparatorZoneId(id)).style.width = width + "px";
        document.getElementById(this.getSeparatorZoneId(id)).style.contentVisibility =
            width == 0 ? "hidden" : "visible";
    }

    resizeActionOverlay(id, width) {
        var actionOverlay = document.getElementById(this.getActionOverlayId(id));
        var actionOverlayWith = parseInt(getComputedStyle(actionOverlay).width.replace('px', ''));
        actionOverlay.style.width = (actionOverlayWith + width) + "px";
    }

    markCorrectActions(id) {
        document.getElementById(this.getDefaultSeparationId(id)).classList.add("hide");
        document.getElementById(this.getCorrectSeparationId(id)).classList.remove("hide");
        document.getElementById(this.getCorrectSeparationId(id)).classList.add("show");
    }

    markIncorrectActions(id) {
        document.getElementById(this.getDefaultSeparationId(id)).classList.add("hide");
        document.getElementById(this.getIncorrectSeparationId(id)).classList.remove("hide");
        document.getElementById(this.getIncorrectSeparationId(id)).classList.add("show")
    }

    getSeparatorZoneId(id) {
        return id + "separator-zone";
    }

    getCorrectSeparationId(id) {
        return id + "correct-separation";
    }

    getIncorrectSeparationId(id) {
        return id + "incorrect-separation";
    }

    getDefaultSeparationId(id) {
        return id + "default-separation";
    }

    isCompleted() {
        let sortedSelection = [ ...this.correctSelection ];
        sortedSelection.sort((a, b) => {
            return a - b;
        });
        return JSON.stringify(sortedSelection) == JSON.stringify(this.answers);
    }

    isAlternativeModeDone() {
        if(JSON.stringify(this.correctSelection.reverse()) == JSON.stringify(this.answers)) {
            this.pointManager.addAlternativeMode();
        }
        return true;
    }
}