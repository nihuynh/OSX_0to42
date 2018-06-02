# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    wrapper.sh                                         :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: nihuynh <nihuynh@student.42.fr>            +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2018/06/02 15:11:12 by nihuynh           #+#    #+#              #
#    Updated: 2018/06/02 15:12:02 by nihuynh          ###   ########.fr        #
#                                                                              #
# **************************************************************************** #
#!/bin/bash
DOTPATH=$(dirname "$0")
# Install oh-my-zsh 
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
# Install brew
git clone --depth=1 https://github.com/Homebrew/brew $HOME/.brew  && brew update
# Install fonts
echo "Installing the themes and fonts..."
mkdir -p $HOME/Library/Fonts
git clone https://github.com/powerline/fonts.git --depth=1 $HOME/fonts
sh $HOME/fonts/install.sh
# Install the themes
git clone https://github.com/mbadolato/iTerm2-Color-Schemes.git --depth=1 $HOME/themes
# open $HOME/themes/schemes/* -a iterm && rm -rf $HOME/themes
rm -rf $HOME/fonts
# make symlink for the next dotfiles
echo "Linking to the dotfiles..."
ln -sF $PWD/dotfiles/.alias ~/.alias
ln -sF $PWD/dotfiles/.myzshrc ~/.myzshrc
ln -sF $PWD/dotfiles/.vimrc ~/.vimrc
ln -sF $PWD/dotfiles/.zshrc ~/.zshrc
ln -sF $PWD/dotfiles/.zsh_history ~/.zsh_history
# Link the goinfre
echo "Linking to the NAS..."
rm -rf ~/goinfre
ln -sF /sgoinfre/goinfre/Perso/nihuynh ~/goinfre
# run .defaults
echo "Setting defaults..."
sh $DOTPATH/set_defaults.sh
echo "Configuring the background..."
# run the applescripts
osascript $DOTPATH/on_reset.applescript
