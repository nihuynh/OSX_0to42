#!/bin/bash
DOTDIR=$(dirname "$0")
BACKUPDIR=~/dotfiles_old
##########
# create dotfiles_old in homedir
mkdir -p $BACKUPDIR
# Back up some of the current files
mv ~/.zshrc $BACKUPDIR/
mv ~/.vimrc $BACKUPDIR/
# make symlink for the next dotfiles
ln -s $DOTDIR/.alias ~/.alias
ln -s $DOTDIR/.myzshrc ~/.myzshrc
ln -s $DOTDIR/.vimrc ~/.vimrc
echo "source ~/.alias" > ~/.zshrc
echo "source ~/.myzshrc" > ~/.zshrc
# install brew
rm -rf $HOME/.brew && \
git clone --depth=1 https://github.com/Homebrew/brew $HOME/.brew && \
echo 'export PATH=$HOME/.brew/bin:$PATH' >> $HOME/.zshrc && \
source $HOME/.zshrc && brew update
# run .defaults
sh .defaults
# run the applescripts
osascript on_reset.applescript
# Make the symbolics links