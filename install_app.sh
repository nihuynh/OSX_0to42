#!/bin/bash
# Install oh-my-zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
# Install brew
rm -rf $HOME/.brew && git clone --depth=1 https://github.com/Homebrew/brew $HOME/.brew  && brew update
# Install fonts
mkdir $HOME/Library/Fonts
git clone https://github.com/powerline/fonts.git --depth=1 $HOME/fonts
sh $HOME/fonts/install.sh
# Install the themes
git clone https://github.com/mbadolato/iTerm2-Color-Schemes.git --depth=1 $HOME/themes
# open $HOME/themes/schemes/* -a iterm && rm -rf $HOME/themes
rm -rf $HOME/fonts && exit 0