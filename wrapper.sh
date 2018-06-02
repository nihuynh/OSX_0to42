#!/bin/bash
DOTPATH=$(dirname "$0")
# Install oh-my-zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
# Install brew
git clone --depth=1 https://github.com/Homebrew/brew $HOME/.brew  && brew update
# Install fonts
mkdir -p $HOME/Library/Fonts
git clone https://github.com/powerline/fonts.git --depth=1 $HOME/fonts
sh $HOME/fonts/install.sh
# Install the themes
git clone https://github.com/mbadolato/iTerm2-Color-Schemes.git --depth=1 $HOME/themes
# open $HOME/themes/schemes/* -a iterm && rm -rf $HOME/themes
rm -rf $HOME/fonts
# make symlink for the next dotfiles
ln -sF $PWD/dotfiles/.alias ~/.alias
ln -sF $PWD/dotfiles/.myzshrc ~/.myzshrc
ln -sF $PWD/dotfiles/.vimrc ~/.vimrc
ln -sF $PWD/dotfiles/.zshrc ~/.zshrc
ln -sF $PWD/dotfiles/.zsh_history ~/.zsh_history
# Link the goinfre
ln -sF /sgoinfre/goinfre/Perso/nihuynh ~/goinfre
# run .defaults
sh $DOTPATH/set_defaults.sh
# run the applescripts
osascript $DOTPATH/on_reset.applescript