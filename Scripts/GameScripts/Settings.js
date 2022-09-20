class Settings {
    constructor() {
        this.timeTrial = false;
        this.continuedMode = false;
        this.advanceDificulty = false;
        this.oppositeWay = false;
        this.multioptions = false;
        this.indicateType = false;
        this.hiatusTild = false;
        this.popupOverlay = document.getElementById("popupOverlay");
        this.popupWrapper = document.getElementById("popupWrapper");
        this.addSettingsListeners();
    }

    addSettingsListeners() {
        if (this.elementExist(document.getElementById("continuedMode"))) {
            document.getElementById("continuedMode").addEventListener("click", this.setContinuedMode.bind(this));
            document.getElementById("continuedModeInfo").addEventListener("click", this.showPopUp.bind(this));
        }
        if (this.elementExist(document.getElementById("timeTrial"))) {
            document.getElementById("timeTrial").addEventListener("click", this.setTimeTrial.bind(this));
            document.getElementById("timeTrialInfo").addEventListener("click", this.showPopUp.bind(this));
        }
        if (this.elementExist(document.getElementById("advanceDificulty"))) {
            document.getElementById("advanceDificulty").addEventListener("click", this.setAdvanceDificulty.bind(this));
            document.getElementById("advanceDificultyInfo").addEventListener("click", this.showPopUp.bind(this));
        }
        if (this.elementExist(document.getElementById("oppositeWay"))) {
            document.getElementById("oppositeWay").addEventListener("click", this.setOppositeWay.bind(this));
            document.getElementById("oppositeWayInfo").addEventListener("click", this.showPopUp.bind(this));
        }
        if (this.elementExist(document.getElementById("multioptions"))) {
            document.getElementById("multioptions").addEventListener("click", this.setMultioptions.bind(this));
            document.getElementById("multioptionsInfo").addEventListener("click", this.showPopUp.bind(this));
        }
        if (this.elementExist(document.getElementById("indicateType"))) {
            document.getElementById("indicateType").addEventListener("click", this.setIndicateType.bind(this));
            document.getElementById("indicateTypeInfo").addEventListener("click", this.showPopUp.bind(this));
        }
        if (this.elementExist(document.getElementById("hiatusTild"))) {
            document.getElementById("hiatusTild").addEventListener("click", this.setHiatusTild.bind(this));
            document.getElementById("hiatusTildInfo").addEventListener("click", this.showPopUp.bind(this));
        }
        document.getElementById("rank").addEventListener("click", () => {
            document.getElementById("rankOverlay").style.display = "initial";
        });
        document.getElementById("rankOverlay").addEventListener("click", () => {
            document.getElementById("rankOverlay").style.display = "none";
        });

        this.popupOverlay.addEventListener("click", this.hidePopups.bind(this), false);

    }

    elementExist(element) {
        return typeof (element) != 'undefined' && element != null;
    }

    hideSettings() {
        document.getElementById("gameSettingsBox").style.display = "none";
    }

    showGameInfo() {
        document.getElementById("gameInfoBox").style.display = "flex";
    }

    showPopUp(e) {
        document.getElementById("popupOverlay").style.display = "initial";
        document.getElementById(e.target.id.replace("Info", "Popup")).style.display = "initial";
    }

    showRankPopUp() {
        document.getElementById("popupOverlay").style.display = "initial";
        document.getElementById("registerInRankPopUp").style.display = "initial";
    }

    showNotInRankPopUp() {
        document.getElementById("popupOverlay").style.display = "initial";
        document.getElementById("notInRankPopup").style.display = "initial";
    }

    showRotateScreenPop() {
        document.getElementById("popupOverlay").style.display = "initial";
        document.getElementById("rotateScreenPop").style.display = "initial";
    }

    setTimeTrial() {
        this.timeTrial = document.getElementById("timeTrial").checked;
    }

    setContinuedMode() {
        this.continuedMode = document.getElementById("continuedMode").checked;
    }

    setAdvanceDificulty() {
        this.advanceDificulty = document.getElementById("advanceDificulty").checked;
    }

    setOppositeWay() {
        this.oppositeWay = document.getElementById("oppositeWay").checked;
    }

    setHiatusTild() {
        this.hiatusTild = document.getElementById("hiatusTild").checked;
    }

    setMultioptions() {
        this.multioptions = document.getElementById("multioptions").checked;
    }

    setIndicateType() {
        this.indicateType = document.getElementById("indicateType").checked;
    }

    isTimeTrialActive() {
        return this.timeTrial;
    }

    isContinuedModeActive() {
        return this.continuedMode;
    }

    isAdvanceDificultyActive() {
        return this.advanceDificulty;
    }

    isAlternativeModeActice() {
        return this.oppositeWay
            || this.multioptions
            || this.indicateType
            || this.hiatusTild;
    }

    hidePopups(e) {
        if (e.target !== this.popupWrapper) return;

        document.getElementById("popupOverlay").style.display = "none";
        document.getElementById("continuedModePopup").style.display = "none";
        document.getElementById("timeTrialPopup").style.display = "none";
        document.getElementById("advanceDificultyPopup").style.display = "none";
        document.getElementById("registerInRankPopUp").style.display = "none";
        document.getElementById("notInRankPopup").style.display = "none";
        document.getElementById("rotateScreenPop").style.display = "none";

        if (this.elementExist(document.getElementById("oppositeWay"))) {
            document.getElementById("oppositeWayPopup").style.display = "none";
        }
        if (this.elementExist(document.getElementById("multioptions"))) {
            document.getElementById("multioptionsPopup").style.display = "none";
        }
        if (this.elementExist(document.getElementById("hiatusTild"))) {
            document.getElementById("hiatusTildPopup").style.display = "none";
        }
        if (this.elementExist(document.getElementById("indicateType"))) {
            document.getElementById("indicateTypePopup").style.display = "none";
        }
    }
}