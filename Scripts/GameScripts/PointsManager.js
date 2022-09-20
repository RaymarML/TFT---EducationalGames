class PointManager {
    constructor(

    ) {
        this.currentPoints = 0;
        this.totalPoints = 0;
    }

    updatePoints(points) {
        this.updateActionPoints(points);
        this.currentPoints += points;
        if (this.currentPoints <= 0) this.currentPoints = 0;
        this.updateDisplayedTotalPoints();
    }

    updateActionPoints(points) {
        let pointsSign = points > 0;
        let cssClass = pointsSign ? "point-correct" : "point-incorrect";
        points = pointsSign ? "+" + points : points;
        let currentActionPoints = document.getElementById("actionPoints").innerHTML
        document.getElementById("actionPoints").innerHTML =  `${currentActionPoints} <span class="${cssClass} mx-2">${points}</span>`;
    }

    updateDisplayedTotalPoints() {
        document.getElementById("currentPoints").innerText = this.currentPoints;
    }

    addCorrect() {
        this.updatePoints(+2);
    }

    decreaseIncorrect() {
        this.updatePoints(-1);
    }

    addTimeTrialPoints() {
        this.updatePoints(+3);
    }

    decreaseTimeTrialPoints() {
        this.updatePoints(-3);
    }

    decreaseIncorrect() {
        this.updatePoints(-1);
    }

    addAlternativeMode() {
        this.updatePoints(+7);
    }

    resetCurrtentPoints() {
        this.totalPoints += this.currentPoints;
        this.currentPoints = 0;
        this.updateDisplayedTotalPoints();
    }

    resetActionPoints() {
        document.getElementById("actionPoints").innerText = "";
    }

    getTotalPoints() {
        return this.totalPoints;
    }
 }


