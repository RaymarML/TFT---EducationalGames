class GameManager {

    constructor(
        provider,
        settings,
        timer
    ) {
        this.provider = provider;
        this.settings = settings;
        this.timer = timer;
        this.isDeviceRotatedHorizontally = false;
        this.nextElementButtonCallback = this.loadNextElement.bind(this);
    }

    get game() {
        return this._game;
    }

    set game(incomingGame) {
        this._game = incomingGame;
    }

    getGameManagerCallBack() {
        return this.checkSettings.bind(this);
    }

    startGame() {

        if (screen.width < 578 && !this.isDeviceRotatedHorizontally) {
            this.showRotateScreenPop();
            return;
        }
        

        this.provider.setRoundsInView();
        this.provider.updateRoundCounter();

        this.game.setupElements(this.provider.getElements(this.settings.isAlternativeModeActice()));
        this.game.setupAnwers(this.provider.getAnswers(this.settings.isAlternativeModeActice()));
        if (this.provider.hasExtraAnswers()) this.game.setExtraAnswers(this.provider.getExtraAnswers());
        this.timer.startChronometer(this.settings.isTimeTrialActive());

        this.settings.hideSettings();
        this.settings.showGameInfo();

        this.setGameTitleData();
        this.setButtonsActions();
    }

    checkSettings() {
        if (this.settings.isAlternativeModeActice() && !this.game.isAlternativeModeDone()) {
            this.game.showAlternativeMode();
            return;
        }

        this.timer.pauseChronometer();
        this.provider.updateCounter();

        if (this.settings.isTimeTrialActive()) {
            this.checkTimeTrialPoint();
        }

        this.checkNextElement();
    }

    checkNextElement() {
        if (this.provider.hasNextElement()) {
            this.settings.isContinuedModeActive() ? this.loadNextElement() : this.showNextButton();
        } else {
            document.getElementById("playAgainButton").style.display = "initial";
            document.getElementById("MatchPointsPlaceholder").value = this.game.getTotalPoints();
            document.getElementById("matchFinished").click();
        }
    }

    showNextButton() {
        document.getElementById("nextButton").addEventListener("click", this.nextElementButtonCallback);
        document.getElementById("nextButton").classList.remove("d-none");
    }

    loadNextElement() {
        this.game.setupElements(this.provider.nextElements(this.settings.isAlternativeModeActice()));
        this.game.setupAnwers(this.provider.getAnswers(this.settings.isAlternativeModeActice()));
        this.game.pointManager.resetActionPoints();
        this.timer.resetChronometer(this.settings.isTimeTrialActive());
        this.provider.updateRoundCounter();
        if (this.provider.hasExtraAnswers()) this.game.setExtraAnswers(this.provider.getExtraAnswers());
        this.setGameTitleData();
        this.hideNextButton();
    }

    hideNextButton() {
        document.getElementById("nextButton").classList.add("d-none");
        document.getElementById("nextButton").removeEventListener("click", this.nextElementButtonCallback);
    }

    checkTimeTrialPoint() {
        !this.timer.isTimeOut()
            ? this.game.pointManager.addTimeTrialPoints()
            : this.game.pointManager.decreaseTimeTrialPoints();
    }

    setGameTitleData() {
        if (this.elementExist(document.getElementById("titleData"))) {
            document.getElementById("titleData").innerText = this.provider.getTitleData(this.settings.isAlternativeModeActice());
        }
    }

    elementExist(element) {
        return typeof (element) != 'undefined' && element != null;
    }

    setButtonsActions() {
        document.getElementById("registerButton").addEventListener("click", this.showRegisterPopup.bind(this));
        document.getElementById("playAgainButton").addEventListener("click", this.playAgain.bind(this));   
    }

    showRankPopUp() {
        document.getElementById("registerButton").style.display = "initial";
        this.settings.showRankPopUp();
    }

    showNotInRankPopUp() {
        this.settings.showNotInRankPopUp();
    }

    showRegisterPopup() {
        this.settings.showRankPopUp();
    }

    showRotateScreenPop() {
        this.settings.showRotateScreenPop();
    }

    setRotatedScreenHorizontally() {
        this.isDeviceRotatedHorizontally = !this.isDeviceRotatedHorizontally;
    }

    playAgain() {
        window.location.reload();
    }
}