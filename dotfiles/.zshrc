PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/X11/bin:/usr/texbin:$HOME/.brew/bin
HISTFILE=~/.zshrc_history
SAVEHIST=5000
HISTSIZE=5000
USER=nihuynh
export USER
MAIL="$USER@student.42.fr"
export MAIL
setopt inc_append_history
setopt share_history

if [[ -f ~/.myzshrc ]]; then
source ~/.myzshrc
fi

if [[ -f ~/.alias ]]; then
source ~/.alias
fi
export PATH=$HOME/.brew/bin:$PATH
