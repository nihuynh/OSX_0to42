'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const logCommit_1 = require("./logCommit");
class GitStashCommit extends logCommit_1.GitLogCommit {
    constructor(type, stashName, repoPath, sha, date, message, fileName, fileStatuses, status, originalFileName, previousSha, previousFileName) {
        super(type, repoPath, sha, 'You', date, message, fileName, fileStatuses, status, originalFileName, previousSha === undefined ? `${sha}^` : previousSha, previousFileName);
        this.stashName = stashName;
    }
    get shortSha() {
        return this.stashName;
    }
    with(changes) {
        return new GitStashCommit(changes.type || this.type, this.stashName, this.repoPath, this.getChangedValue(changes.sha, this.sha), changes.date || this.date, changes.message || this.message, changes.fileName || this.fileName, this.getChangedValue(changes.fileStatuses, this.fileStatuses) || [], changes.status || this.status, this.getChangedValue(changes.originalFileName, this.originalFileName), this.getChangedValue(changes.previousSha, this.previousSha), this.getChangedValue(changes.previousFileName, this.previousFileName));
    }
}
exports.GitStashCommit = GitStashCommit;
//# sourceMappingURL=stashCommit.js.map