window.app = window.app || {};
(function f() {
    'use strict';
    var app = window.app,
        DEFECT = window.app.DEFECT || 1,
        COOPERATE = window.app.COOPERATE || 0;

    function AllC() {
        return COOPERATE;
    }

    function AllD() {
        return DEFECT;
    }

    function Rand() {
        return (Math.random() > 0.5) ? COOPERATE : DEFECT;
    }

    function Grim(opponentHistory) {
        return opponentHistory.some(function(elem) {
            return elem.move === DEFECT;
        }) ? DEFECT : COOPERATE;
    }

    function Neg(opponentHistory) {
        var lastOpponent = opponentHistory.slice(-1)[0];
        return (lastOpponent && lastOpponent.move === COOPERATE) ? DEFECT : COOPERATE;
    }

    function TFT(opponentHistory) {
        var lastOpponent = opponentHistory.slice(-1)[0];
        if (lastOpponent)
            return lastOpponent.move;
        return COOPERATE;
    }

    function STFT(opponentHistory) {
        var lastOpponent = opponentHistory.slice(-1)[0];
        if (lastOpponent)
            return lastOpponent.move;
        return DEFECT;
    }

    function TFTT(opponentHistory) {
        return opponentHistory.length > 1 && opponentHistory[opponentHistory.length - 1].move === DEFECT && opponentHistory[opponentHistory.length - 2].move === DEFECT ? DEFECT : COOPERATE;
    }

    function Pavlov(opponentHistory, ownHistory) {
        if (ownHistory.length) {
            var lastOwn = ownHistory.slice(-1)[0];
            return lastOwn.success ? lastOwn.move : lastOwn.move === DEFECT ? COOPERATE : DEFECT;
        }
        return (Math.random() > 0.5) ? COOPERATE : DEFECT;
    }

    app.strategies = [AllC, AllD, Rand, Grim, Neg, TFT, STFT, TFTT, Pavlov];
}());
