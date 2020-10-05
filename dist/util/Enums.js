"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationStatus = exports.MatchStatus = exports.MatchType = exports.Level = void 0;
var Level;
(function (Level) {
    Level["LOW"] = "LOW";
    Level["MIDDLE"] = "MEDIUM";
    Level["HIGH"] = "HIGH";
})(Level = exports.Level || (exports.Level = {}));
var MatchType;
(function (MatchType) {
    MatchType["SOCCER"] = "SOCCER";
    MatchType["FUTSAL5"] = "FUTSAL5";
    MatchType["FUTSAL6"] = "FUTSAL6";
})(MatchType = exports.MatchType || (exports.MatchType = {}));
var MatchStatus;
(function (MatchStatus) {
    MatchStatus["WAITING"] = "WAITING";
    MatchStatus["CONFIRMED"] = "CONFIRMED";
    MatchStatus["DENIED"] = "DENIED";
    MatchStatus["CANCEL"] = "CANCEL";
})(MatchStatus = exports.MatchStatus || (exports.MatchStatus = {}));
var ApplicationStatus;
(function (ApplicationStatus) {
    ApplicationStatus["WAITING"] = "WAITING";
    ApplicationStatus["CONFIRMED"] = "CONFIRMED";
    ApplicationStatus["DENIED"] = "DENIED";
    ApplicationStatus["CANCEL"] = "CANCEL";
})(ApplicationStatus = exports.ApplicationStatus || (exports.ApplicationStatus = {}));
