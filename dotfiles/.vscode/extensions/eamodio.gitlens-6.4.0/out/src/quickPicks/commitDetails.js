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
const commands_1 = require("../commands");
const common_1 = require("./common");
const constants_1 = require("../constants");
const gitService_1 = require("../gitService");
const keyboard_1 = require("../keyboard");
const remotes_1 = require("./remotes");
const path = require("path");
class CommitWithFileStatusQuickPickItem extends common_1.OpenFileCommandQuickPickItem {
    constructor(commit, status) {
        const octicon = gitService_1.getGitStatusOcticon(status.status);
        const description = gitService_1.GitStatusFile.getFormattedDirectory(status, true);
        super(gitService_1.GitUri.toRevisionUri(commit.sha, status, commit.repoPath), {
            label: `${system_1.Strings.pad(octicon, 4, 2)} ${path.basename(status.fileName)}`,
            description: description
        });
        this.commit = commit.toFileCommit(status);
        this.status = status.status;
    }
    get sha() {
        return this.commit.sha;
    }
    onDidPressKey(key) {
        if (this.commit.previousSha === undefined)
            return super.onDidPressKey(key);
        return vscode_1.commands.executeCommand(commands_1.Commands.DiffWithPrevious, this.commit.toGitUri(), {
            commit: this.commit,
            showOptions: {
                preserveFocus: true,
                preview: false
            }
        });
    }
}
exports.CommitWithFileStatusQuickPickItem = CommitWithFileStatusQuickPickItem;
class OpenCommitFilesCommandQuickPickItem extends common_1.OpenFilesCommandQuickPickItem {
    constructor(commit, versioned = false, item) {
        const repoPath = commit.repoPath;
        const uris = system_1.Arrays.filterMap(commit.fileStatuses, f => gitService_1.GitUri.fromFileStatus(f, repoPath));
        super(uris, item || {
            label: `$(file-symlink-file) Open Files`,
            description: ''
        });
    }
}
exports.OpenCommitFilesCommandQuickPickItem = OpenCommitFilesCommandQuickPickItem;
class OpenCommitFileRevisionsCommandQuickPickItem extends common_1.OpenFilesCommandQuickPickItem {
    constructor(commit, item) {
        const uris = system_1.Arrays.filterMap(commit.fileStatuses, f => gitService_1.GitUri.toRevisionUri(f.status === 'D' ? commit.previousFileSha : commit.sha, f, commit.repoPath));
        super(uris, item || {
            label: `$(file-symlink-file) Open Revisions`,
            description: `${system_1.Strings.pad(constants_1.GlyphChars.Dash, 2, 3)} in ${constants_1.GlyphChars.Space}$(git-commit) ${commit.shortSha}`
        });
    }
}
exports.OpenCommitFileRevisionsCommandQuickPickItem = OpenCommitFileRevisionsCommandQuickPickItem;
class CommitDetailsQuickPick {
    static show(git, commit, uri, goBackCommand, currentCommand, repoLog) {
        return __awaiter(this, void 0, void 0, function* () {
            yield commit.resolvePreviousFileSha(git);
            const items = commit.fileStatuses.map(fs => new CommitWithFileStatusQuickPickItem(commit, fs));
            const stash = commit.isStash;
            let index = 0;
            if (stash) {
                items.splice(index++, 0, new common_1.CommandQuickPickItem({
                    label: `$(git-pull-request) Apply Stashed Changes`,
                    description: `${system_1.Strings.pad(constants_1.GlyphChars.Dash, 2, 3)} ${commit.message}`
                }, commands_1.Commands.StashApply, [
                    {
                        confirm: true,
                        deleteAfter: false,
                        stashItem: commit,
                        goBackCommand: currentCommand
                    }
                ]));
                items.splice(index++, 0, new common_1.CommandQuickPickItem({
                    label: `$(x) Delete Stashed Changes`,
                    description: `${system_1.Strings.pad(constants_1.GlyphChars.Dash, 2, 3)} ${commit.message}`
                }, commands_1.Commands.StashDelete, [
                    {
                        confirm: true,
                        stashItem: commit,
                        goBackCommand: currentCommand
                    }
                ]));
            }
            else {
                const remotes = (yield git.getRemotes(commit.repoPath)).filter(r => r.provider !== undefined);
                if (remotes.length) {
                    items.splice(index++, 0, new remotes_1.OpenRemotesCommandQuickPickItem(remotes, {
                        type: 'commit',
                        sha: commit.sha
                    }, currentCommand));
                }
            }
            items.splice(index++, 0, new OpenCommitFilesCommandQuickPickItem(commit));
            items.splice(index++, 0, new OpenCommitFileRevisionsCommandQuickPickItem(commit));
            items.splice(index++, 0, new common_1.CommandQuickPickItem({
                label: `$(git-compare) Compare Directory with Previous Revision`,
                description: `${system_1.Strings.pad(constants_1.GlyphChars.Dash, 2, 3)} $(git-commit) ${commit.previousFileShortSha} ${constants_1.GlyphChars.Space} $(git-compare) ${constants_1.GlyphChars.Space} $(git-commit) ${commit.shortSha}`
            }, commands_1.Commands.DiffDirectory, [
                commit.uri,
                {
                    shaOrBranch1: commit.previousFileSha,
                    shaOrBranch2: commit.sha
                }
            ]));
            items.splice(index++, 0, new common_1.CommandQuickPickItem({
                label: `$(git-compare) Compare Directory with Working Tree`,
                description: `${system_1.Strings.pad(constants_1.GlyphChars.Dash, 2, 3)} $(git-commit) ${commit.shortSha} ${constants_1.GlyphChars.Space} $(git-compare) ${constants_1.GlyphChars.Space} $(file-directory) Working Tree`
            }, commands_1.Commands.DiffDirectory, [
                uri,
                {
                    shaOrBranch1: commit.sha
                }
            ]));
            if (!stash) {
                items.splice(index++, 0, new common_1.CommandQuickPickItem({
                    label: `$(clippy) Copy Commit ID to Clipboard`,
                    description: `${system_1.Strings.pad(constants_1.GlyphChars.Dash, 2, 3)} ${commit.shortSha}`
                }, commands_1.Commands.CopyShaToClipboard, [
                    uri,
                    {
                        sha: commit.sha
                    }
                ]));
            }
            items.splice(index++, 0, new common_1.CommandQuickPickItem({
                label: `$(clippy) Copy Commit Message to Clipboard`,
                description: `${system_1.Strings.pad(constants_1.GlyphChars.Dash, 2, 3)} ${commit.message}`
            }, commands_1.Commands.CopyMessageToClipboard, [
                uri,
                {
                    message: commit.message,
                    sha: commit.sha
                }
            ]));
            items.splice(index++, 0, new common_1.CommandQuickPickItem({
                label: `Changed Files`,
                description: commit.getDiffStatus()
            }, commands_1.Commands.ShowQuickCommitDetails, [
                uri,
                {
                    commit,
                    repoLog,
                    sha: commit.sha,
                    goBackCommand
                }
            ]));
            if (goBackCommand) {
                items.splice(0, 0, goBackCommand);
            }
            let previousCommand = undefined;
            let nextCommand = undefined;
            if (!stash) {
                if (repoLog !== undefined && !repoLog.truncated && repoLog.sha === undefined) {
                    previousCommand = commit.previousSha === undefined
                        ? undefined
                        : new common_1.KeyCommandQuickPickItem(commands_1.Commands.ShowQuickCommitDetails, [
                            commit.previousUri,
                            {
                                repoLog,
                                sha: commit.previousSha,
                                goBackCommand
                            }
                        ]);
                    nextCommand = commit.nextSha === undefined
                        ? undefined
                        : new common_1.KeyCommandQuickPickItem(commands_1.Commands.ShowQuickCommitDetails, [
                            commit.nextUri,
                            {
                                repoLog,
                                sha: commit.nextSha,
                                goBackCommand
                            }
                        ]);
                }
                else {
                    previousCommand = () => __awaiter(this, void 0, void 0, function* () {
                        let log = repoLog;
                        let c = log && log.commits.get(commit.sha);
                        if (c === undefined || c.previousSha === undefined) {
                            log = yield git.getLogForRepo(commit.repoPath, commit.sha, git.config.advanced.maxQuickHistory);
                            c = log && log.commits.get(commit.sha);
                            if (c) {
                                c.nextSha = commit.nextSha;
                            }
                        }
                        if (c === undefined || c.previousSha === undefined)
                            return keyboard_1.KeyNoopCommand;
                        return new common_1.KeyCommandQuickPickItem(commands_1.Commands.ShowQuickCommitDetails, [
                            c.previousUri,
                            {
                                repoLog: log,
                                sha: c.previousSha,
                                goBackCommand
                            }
                        ]);
                    });
                    nextCommand = () => __awaiter(this, void 0, void 0, function* () {
                        let log = repoLog;
                        let c = log && log.commits.get(commit.sha);
                        if (c === undefined || c.nextSha === undefined) {
                            log = undefined;
                            c = undefined;
                            const nextLog = yield git.getLogForRepo(commit.repoPath, commit.sha, 1, true);
                            const next = nextLog && system_1.Iterables.first(nextLog.commits.values());
                            if (next !== undefined && next.sha !== commit.sha) {
                                c = commit;
                                c.nextSha = next.sha;
                            }
                        }
                        if (c === undefined || c.nextSha === undefined)
                            return keyboard_1.KeyNoopCommand;
                        return new common_1.KeyCommandQuickPickItem(commands_1.Commands.ShowQuickCommitDetails, [
                            c.nextUri,
                            {
                                repoLog: log,
                                sha: c.nextSha,
                                goBackCommand
                            }
                        ]);
                    });
                }
            }
            const scope = yield keyboard_1.Keyboard.instance.beginScope({
                left: goBackCommand,
                ',': previousCommand,
                '.': nextCommand
            });
            const pick = yield vscode_1.window.showQuickPick(items, {
                matchOnDescription: true,
                matchOnDetail: true,
                placeHolder: `${commit.shortSha} ${system_1.Strings.pad(constants_1.GlyphChars.Dot, 1, 1)} ${commit.author ? `${commit.author}, ` : ''}${commit.fromNow()} ${system_1.Strings.pad(constants_1.GlyphChars.Dot, 1, 1)} ${commit.message}`,
                ignoreFocusOut: common_1.getQuickPickIgnoreFocusOut(),
                onDidSelectItem: (item) => {
                    scope.setKeyCommand('right', item);
                    if (typeof item.onDidSelect === 'function') {
                        item.onDidSelect();
                    }
                }
            });
            yield scope.dispose();
            return pick;
        });
    }
}
exports.CommitDetailsQuickPick = CommitDetailsQuickPick;
//# sourceMappingURL=commitDetails.js.map