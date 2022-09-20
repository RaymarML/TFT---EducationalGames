class Timer {
    constructor() {
        this.hours = `00`;
        this.minutes = `00`;
        this.seconds = `00`;
        this.chronometer = document.getElementById("chronometer");
        this.chronometerCallBack = undefined;
    }

    isTimeOut() {
        return parseInt(this.seconds) <= 0;
    }

    pauseChronometer() {
        clearInterval(this.chronometerCallBack);
    }

    startChronometer(isTimeTrialActive) {
        isTimeTrialActive
            ? this.setTimeTrialDisplayMode()
            : this.setNormalDisplayMode();

        this.chronometerCallBack = isTimeTrialActive
            ? setInterval(this.decrementChronometer.bind(this), 1000)
            : setInterval(this.incrementChronometer.bind(this), 1000);
    }

    resetChronometer(isTimeTrialActive) {
        this.startChronometer(isTimeTrialActive);
    }

    setTimeTrialDisplayMode() {
        this.hours = `00`, this.minutes = `00`, this.seconds = `05`;
        this.chronometer.innerText = `00:00:05`;
    }

    setNormalDisplayMode() {
        this.hours = `00`, this.minutes = `00`, this.seconds = `00`;
        this.chronometer.innerText = `00:00:00`;
    }

    decrementChronometer() {
        if (!this.isTimeOut()) {
            this.seconds--;
            this.seconds = `0` + this.seconds;
            this.chronometer.innerText = `${this.hours}:${this.minutes}:${this.seconds}`;
        } else {
            this.pauseChronometer();
        }
    }

    incrementChronometer() {
        this.seconds++;
        if (this.seconds < 10) this.seconds = `0` + this.seconds;
        if (this.seconds > 59) {
            this.seconds = `00`;
            this.minutes++;
            if (this.minutes < 10) this.minutes = `0` + this.minutes;
        }
        if (this.minutes > 59) {
            this.minutes = `00`;
            this.hours++;
            if (this.hours < 10) this.hours = `0` + this.hours;
        }
        this.chronometer.innerText = `${this.hours}:${this.minutes}:${this.seconds}`;
    }
}

