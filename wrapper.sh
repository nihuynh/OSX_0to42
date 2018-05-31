#!/bin/bash
DOTPATH=$(dirname "$0")
# Install brew & oh_my_zsh
sh $DOTPATH/install_app.sh
# make symlink for the next dotfiles
ln -sF $PWD/dotfiles/.alias ~/.alias
ln -sF $PWD/dotfiles/.myzshrc ~/.myzshrc
ln -sF $PWD/dotfiles/.vimrc ~/.vimrc
ln -sF $PWD/dotfiles/.zshrc ~/.zshrc
# run .defaults
sh $DOTPATH/set_defaults.sh
# run the applescripts
osascript $DOTPATH/on_reset.applescript
exit 0