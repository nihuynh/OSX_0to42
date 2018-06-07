'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const commit_1 = require("./commit");
const git_1 = require("../git");
const path = require("path");
class GitLogCommit extends commit_1.GitCommit {
    constructor(type, repoPath, sha, author, date, message, fileName, fileStatuses, status, originalFileName, previousSha, previousFileName, parentShas) {
        super(type, repoPath, sha, author, date, message, fileName, originalFileName, previousSha, previousFileName);
        this.fileStatuses = fileStatuses;
        this.status = status;
        this.parentShas = parentShas;
    }
    get isMerge() {
        return this.parentShas && this.parentShas.length > 1;
    }
    get nextShortSha() {
        return this.nextSha && git_1.Git.shortenSha(this.nextSha);
    }
    get nextUri() {
        return this.nextFileName ? vscode_1.Uri.file(path.resolve(this.repoPath, this.nextFileName)) : this.uri;
    }
    get previousFileSha() {
        if (this._resolvedPreviousFileSha !== undefined)
            return this._resolvedPreviousFileSha;
        return (this.isFile && this.previousSha)
            ? this.previousSha
            : `${this.sha}^`;
    }
    getDiffStatus() {
        let added = 0;
        let deleted = 0;
        let changed = 0;
        for (const f of this.fileStatuses) {
            switch (f.status) {
                case 'A':
                case '?':
                    added++;
                    break;
                case 'D':
                    deleted++;
                    break;
                default:
                    changed++;
                    break;
            }
        }
        return `+${added} ~${changed} -${deleted}`;
    }
    toFileCommit(fileNameOrStatus) {
        let status;
        if (typeof fileNameOrStatus === 'string') {
            const fileName = git_1.Git.normalizePath(path.relative(this.repoPath, fileNameOrStatus));
            status = this.fileStatuses.find(f => f.fileName === fileName);
            if (status === undefined)
                return undefined;
        }
        else {
            status = fileNameOrStatus;
        }
        const previousSha = this.isFile
            ? this.previousSha
            : `${this.sha}^`;
        return this.with({
            type: this.isStash ? commit_1.GitCommitType.StashFile : commit_1.GitCommitType.File,
            fileName: status.fileName,
            originalFileName: status.originalFileName,
            previousSha: previousSha,
            previousFileName: status.originalFileName || status.fileName,
            status: status.status,
            fileStatuses: [status]
        });
    }
    with(changes) {
        return new GitLogCommit(changes.type || this.type, this.repoPath, this.getChangedValue(changes.sha, this.sha), changes.author || this.author, changes.date || this.date, changes.message || this.message, changes.fileName || this.fileName, this.getChangedValue(changes.fileStatuses, this.fileStatuses) || [], changes.status || this.status, this.getChangedValue(changes.originalFileName, this.originalFileName), this.getChangedValue(changes.previousSha, this.previousSha), this.getChangedValue(changes.previousFileName, this.previousFileName), undefined);
    }
}
exports.GitLogCommit = GitLogCommit;
//# sourceMappingURL=logCommit.js.map