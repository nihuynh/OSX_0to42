'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const commit_1 = require("./commit");
class GitBlameCommit extends commit_1.GitCommit {
    constructor(repoPath, sha, author, date, message, fileName, originalFileName, previousSha, previousFileName, lines) {
        super(commit_1.GitCommitType.Blame, repoPath, sha, author, date, message, fileName, originalFileName, previousSha, previousFileName);
        this.lines = lines;
    }
    get previousFileSha() {
        if (this._resolvedPreviousFileSha !== undefined)
            return this._resolvedPreviousFileSha;
        return `${this.sha}^`;
    }
    with(changes) {
        return new GitBlameCommit(this.repoPath, changes.sha || this.sha, this.author, this.date, this.message, changes.fileName || this.fileName, this.getChangedValue(changes.originalFileName, this.originalFileName), this.getChangedValue(changes.previousSha, this.previousSha), this.getChangedValue(changes.previousFileName, this.previousFileName), this.getChangedValue(changes.lines, (changes.sha || changes.fileName) ? [] : this.lines) || []);
    }
}
exports.GitBlameCommit = GitBlameCommit;
//# sourceMappingURL=blameCommit.js.map