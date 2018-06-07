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
const system_1 = require("../system");
const vscode_1 = require("vscode");
const constants_1 = require("../constants");
const gitService_1 = require("../gitService");
const path = require("path");
class GitUri extends vscode_1.Uri {
    constructor(uri, commitOrRepoPath) {
        if (uri === undefined) {
            super();
            return;
        }
        if (uri.scheme === constants_1.DocumentSchemes.GitLensGit) {
            const data = JSON.parse(uri.query);
            super(uri.scheme, uri.authority, path.resolve(data.repoPath, data.fileName), uri.query, uri.fragment);
            this.repoPath = data.repoPath;
            if (gitService_1.GitService.isStagedUncommitted(data.sha) || !gitService_1.GitService.isUncommitted(data.sha)) {
                this.sha = data.sha;
            }
            return;
        }
        if (commitOrRepoPath === undefined) {
            super(uri.scheme, uri.authority, uri.path, uri.query, uri.fragment);
            return;
        }
        if (typeof commitOrRepoPath === 'string') {
            super(uri.scheme, uri.authority, uri.path, uri.query, uri.fragment);
            this.repoPath = commitOrRepoPath;
            return;
        }
        super(uri.scheme, uri.authority, path.resolve(commitOrRepoPath.repoPath, commitOrRepoPath.fileName || uri.fsPath), uri.query, uri.fragment);
        this.repoPath = commitOrRepoPath.repoPath;
        if (gitService_1.GitService.isStagedUncommitted(commitOrRepoPath.sha) || !gitService_1.GitService.isUncommitted(commitOrRepoPath.sha)) {
            this.sha = commitOrRepoPath.sha;
        }
    }
    get shortSha() {
        return this.sha && gitService_1.GitService.shortenSha(this.sha);
    }
    fileUri(useSha = true) {
        return vscode_1.Uri.file(useSha && this.sha ? this.path : this.fsPath);
    }
    getFormattedPath(separator = system_1.Strings.pad(constants_1.GlyphChars.Dot, 2, 2), relativeTo) {
        let directory = path.dirname(this.fsPath);
        if (this.repoPath) {
            directory = path.relative(this.repoPath, directory);
        }
        if (relativeTo !== undefined) {
            directory = path.relative(relativeTo, directory);
        }
        directory = gitService_1.GitService.normalizePath(directory);
        return (!directory || directory === '.')
            ? path.basename(this.fsPath)
            : `${path.basename(this.fsPath)}${separator}${directory}`;
    }
    getRelativePath(relativeTo) {
        let relativePath = path.relative(this.repoPath || '', this.fsPath);
        if (relativeTo !== undefined) {
            relativePath = path.relative(relativeTo, relativePath);
        }
        return gitService_1.GitService.normalizePath(relativePath);
    }
    static fromCommit(commit, previous = false) {
        if (!previous)
            return new GitUri(commit.uri, commit);
        return new GitUri(commit.previousUri, {
            repoPath: commit.repoPath,
            sha: commit.previousSha
        });
    }
    static fromFileStatus(status, repoPath, sha, original = false) {
        const uri = vscode_1.Uri.file(path.resolve(repoPath, (original && status.originalFileName) || status.fileName));
        return sha === undefined
            ? new GitUri(uri, repoPath)
            : new GitUri(uri, { repoPath: repoPath, sha: sha });
    }
    static fromRepoPath(repoPath, ref) {
        return ref === undefined
            ? new GitUri(vscode_1.Uri.file(repoPath), repoPath)
            : new GitUri(vscode_1.Uri.file(repoPath), { repoPath: repoPath, sha: ref });
    }
    static fromRevisionUri(uri) {
        return new GitUri(uri);
    }
    static fromUri(uri, git) {
        return __awaiter(this, void 0, void 0, function* () {
            if (uri instanceof GitUri)
                return uri;
            if (!git.isTrackable(uri))
                return new GitUri(uri);
            if (uri.scheme === constants_1.DocumentSchemes.GitLensGit)
                return new GitUri(uri);
            if (uri.scheme === constants_1.DocumentSchemes.Git) {
                const data = JSON.parse(uri.query);
                const repoPath = yield git.getRepoPath(data.path);
                return new GitUri(uri, {
                    fileName: data.path,
                    repoPath: repoPath,
                    sha: data.ref === '' || data.ref == null
                        ? undefined
                        : data.ref
                });
            }
            const gitUri = git.getGitUriForVersionedFile(uri);
            if (gitUri)
                return gitUri;
            return new GitUri(uri, yield git.getRepoPath(uri));
        });
    }
    static getDirectory(fileName, relativeTo) {
        let directory = path.dirname(fileName);
        if (relativeTo !== undefined) {
            directory = path.relative(relativeTo, directory);
        }
        directory = gitService_1.GitService.normalizePath(directory);
        return (!directory || directory === '.') ? '' : directory;
    }
    static getFormattedPath(fileNameOrUri, separator = system_1.Strings.pad(constants_1.GlyphChars.Dot, 2, 2), relativeTo) {
        let fileName;
        if (fileNameOrUri instanceof vscode_1.Uri) {
            if (fileNameOrUri instanceof GitUri)
                return fileNameOrUri.getFormattedPath(separator, relativeTo);
            fileName = fileNameOrUri.fsPath;
        }
        else {
            fileName = fileNameOrUri;
        }
        const directory = GitUri.getDirectory(fileName, relativeTo);
        return !directory
            ? path.basename(fileName)
            : `${path.basename(fileName)}${separator}${directory}`;
    }
    static getRelativePath(fileNameOrUri, relativeTo, repoPath) {
        let fileName;
        if (fileNameOrUri instanceof vscode_1.Uri) {
            if (fileNameOrUri instanceof GitUri)
                return fileNameOrUri.getRelativePath(relativeTo);
            fileName = fileNameOrUri.fsPath;
        }
        else {
            fileName = fileNameOrUri;
        }
        let relativePath = path.relative(repoPath || '', fileName);
        if (relativeTo !== undefined) {
            relativePath = path.relative(relativeTo, relativePath);
        }
        return gitService_1.GitService.normalizePath(relativePath);
    }
    static toRevisionUri(uriOrSha, fileNameOrStatus, repoPath) {
        let fileName;
        let sha;
        let shortSha;
        if (typeof uriOrSha === 'string') {
            if (typeof fileNameOrStatus === 'string') {
                fileName = fileNameOrStatus;
            }
            else {
                fileName = path.resolve(repoPath, fileNameOrStatus.fileName);
            }
            sha = uriOrSha;
            shortSha = gitService_1.GitService.shortenSha(sha);
        }
        else {
            fileName = uriOrSha.fsPath;
            repoPath = uriOrSha.repoPath;
            sha = uriOrSha.sha;
            shortSha = uriOrSha.shortSha;
        }
        const data = {
            fileName: gitService_1.GitService.normalizePath(path.relative(repoPath, fileName)),
            repoPath: repoPath,
            sha: sha
        };
        const parsed = path.parse(fileName);
        return vscode_1.Uri.parse(`${constants_1.DocumentSchemes.GitLensGit}:${path.join(parsed.dir, parsed.name)}:${shortSha}${parsed.ext}?${JSON.stringify(data)}`);
    }
}
exports.GitUri = GitUri;
//# sourceMappingURL=gitUri.js.map