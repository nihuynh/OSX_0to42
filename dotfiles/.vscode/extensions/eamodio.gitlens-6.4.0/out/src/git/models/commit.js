'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const system_1 = require("../../system");
const vscode_1 = require("vscode");
const constants_1 = require("../../constants");
const git_1 = require("../git");
const gitUri_1 = require("../gitUri");
const path = require("path");
var GitCommitType;
(function (GitCommitType) {
    GitCommitType["Blame"] = "blame";
    GitCommitType["Branch"] = "branch";
    GitCommitType["File"] = "file";
    GitCommitType["Stash"] = "stash";
    GitCommitType["StashFile"] = "stash-file";
})(GitCommitType = exports.GitCommitType || (exports.GitCommitType = {}));
class GitCommit {
    constructor(type, repoPath, sha, author, date, message, fileName, originalFileName, previousSha, previousFileName) {
        this.repoPath = repoPath;
        this.sha = sha;
        this.author = author;
        this.date = date;
        this.message = message;
        this.type = type;
        this._fileName = fileName || '';
        this.originalFileName = originalFileName;
        this._previousSha = previousSha;
        this.previousFileName = previousFileName;
    }
    get fileName() {
        return this.isFile ? this._fileName : '';
    }
    get shortSha() {
        if (this._shortSha === undefined) {
            this._shortSha = git_1.Git.shortenSha(this.sha);
        }
        return this._shortSha;
    }
    get isFile() {
        return this.type === GitCommitType.Blame || this.type === GitCommitType.File || this.type === GitCommitType.StashFile;
    }
    get isStash() {
        return this.type === GitCommitType.Stash || this.type === GitCommitType.StashFile;
    }
    get isStagedUncommitted() {
        if (this._isStagedUncommitted === undefined) {
            this._isStagedUncommitted = git_1.Git.isStagedUncommitted(this.sha);
        }
        return this._isStagedUncommitted;
    }
    get isUncommitted() {
        if (this._isUncommitted === undefined) {
            this._isUncommitted = git_1.Git.isUncommitted(this.sha);
        }
        return this._isUncommitted;
    }
    get previousFileShortSha() {
        return git_1.Git.shortenSha(this.previousFileSha);
    }
    get previousSha() {
        return this._previousSha;
    }
    set previousSha(value) {
        if (value === this._previousSha)
            return;
        this._previousSha = value;
        this._resolvedPreviousFileSha = undefined;
    }
    get previousShortSha() {
        return this.previousSha && git_1.Git.shortenSha(this.previousSha);
    }
    get previousUri() {
        return this.previousFileName ? vscode_1.Uri.file(path.resolve(this.repoPath, this.previousFileName || this.originalFileName)) : this.uri;
    }
    get uri() {
        return vscode_1.Uri.file(path.resolve(this.repoPath, this.fileName));
    }
    formatDate(format) {
        if (this._dateFormatter === undefined) {
            this._dateFormatter = system_1.Dates.toFormatter(this.date);
        }
        return this._dateFormatter.format(format);
    }
    fromNow() {
        if (this._dateFormatter === undefined) {
            this._dateFormatter = system_1.Dates.toFormatter(this.date);
        }
        return this._dateFormatter.fromNow();
    }
    getFormattedPath(separator = system_1.Strings.pad(constants_1.GlyphChars.Dot, 2, 2)) {
        return gitUri_1.GitUri.getFormattedPath(this.fileName, separator);
    }
    resolvePreviousFileSha(git) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._resolvedPreviousFileSha !== undefined)
                return;
            this._resolvedPreviousFileSha = yield git.resolveReference(this.repoPath, this.previousFileSha, this.fileName ? this.previousUri : undefined);
        });
    }
    toGitUri(previous = false) {
        return gitUri_1.GitUri.fromCommit(this, previous);
    }
    getChangedValue(change, original) {
        if (change === undefined)
            return original;
        return change !== null ? change : undefined;
    }
}
exports.GitCommit = GitCommit;
//# sourceMappingURL=commit.js.map