"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// HARDCODED CURRENT USER. for now....
const CURRENT_USER_HANDLE = 'treasurymog';
const MAX_DELAY = 2000;
const FAILURE_ODDS = 0.000000000001;
// const FAILURE_ODDS : number = 0.2;
const simulateProblems = (res, data) => {
    const delay = Math.random() * MAX_DELAY;
    setTimeout(() => {
        const shouldError = Math.random() <= FAILURE_ODDS;
        if (shouldError) {
            res.sendStatus(500);
            return;
        }
        res.json(data);
    }, delay);
};
