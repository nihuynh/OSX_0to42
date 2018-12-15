#!/usr/bin/env bash
echo "Linking to the dotfiles..."
ln -sF $PWD/dotfiles/.alias ~/.alias
ln -sF $PWD/dotfiles/.mbzshrc ~/.myzshrc
ln -sF $PWD/dotfiles/.vimrc ~/.vimrc
ln -sF $PWD/dotfiles/.zsh_history ~/.zsh_history