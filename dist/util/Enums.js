"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationType = exports.ApplicationStatus = exports.MatchStatus = exports.MatchType = void 0;
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
var ApplicationType;
(function (ApplicationType) {
    ApplicationType["TEAM"] = "TEAM";
    ApplicationType["PERSONAL"] = "PERSONAL";
})(ApplicationType = exports.ApplicationType || (exports.ApplicationType = {}));
