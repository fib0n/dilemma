//var window = window || {};
(function f(window, undefined) {
    'use strict';
    var app = window.app = window.app || {},
        DEFECT = app.DEFECT = window.app.DEFECT || 1,
        COOPERATE = app.COOPERATE = window.app.COOPERATE || 0;

    app.AllC = function AllC() {
        return COOPERATE;
    }

    app.AllD = function AllD() {
        return DEFECT;
    }

    app.Rand = function Rand() {
        return (Math.random() > 0.5) ? COOPERATE : DEFECT;
    }

    app.Grim = function Grim(opponentHistory) {
        return opponentHistory.some(function(elem) {
            return elem.move === DEFECT;
        }) ? DEFECT : COOPERATE;
    }

    app.Neg = function Neg(opponentHistory) {
        var lastOpponent = opponentHistory.slice(-1)[0];
        return (lastOpponent && lastOpponent.move === COOPERATE) ? DEFECT : COOPERATE;
    }

    app.TFT = function TFT(opponentHistory) {
        var lastOpponent = opponentHistory.slice(-1)[0];
        if (lastOpponent)
            return lastOpponent.move;
        return COOPERATE;
    }

    app.STFT = function STFT(opponentHistory) {
        var lastOpponent = opponentHistory.slice(-1)[0];
        if (lastOpponent)
            return lastOpponent.move;
        return DEFECT;
    }

    app.TFTT = function TFTT(opponentHistory) {
        return opponentHistory.length > 1 && opponentHistory[opponentHistory.length - 1].move === DEFECT && opponentHistory[opponentHistory.length - 2].move === DEFECT ? DEFECT : COOPERATE;
    }

    app.Pavlov = function Pavlov(opponentHistory, ownHistory) {
        if (ownHistory.length) {
            var lastOwn = ownHistory.slice(-1)[0];
            return lastOwn.success ? lastOwn.move : lastOwn.move === DEFECT ? COOPERATE : DEFECT;
        }
        return (Math.random() > 0.5) ? COOPERATE : DEFECT;
    }

    app.strategies = [app.AllC, app.AllD, app.Rand, app.Grim, app.Neg, app.TFT, app.STFT, app.TFTT, app.Pavlov];
}(window, undefined));