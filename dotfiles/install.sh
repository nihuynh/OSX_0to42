#!/bin/bash
DOTDIR=$(dirname "$0")
# make symlink for the next dotfiles
ln -sF $PWD/$DOTDIR/.alias ~/.alias
ln -sF $PWD/$DOTDIR/.myzshrc ~/.myzshrc
ln -sF $PWD/$DOTDIR/.vimrc ~/.vimrc
ln -sF $PWD/$DOTDIR/.zshrc ~/.zshrc
# Install brew & oh_my_zsh
sh $DOTDIR/.app_install
# run .defaults
sh $DOTDIR/.defaults
# run the applescripts
osascript $DOTDIR/on_reset.applescript