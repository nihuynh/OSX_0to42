PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/X11/bin:/usr/texbin:$HOME/.brew/bin
HISTFILE=~/.zsh_history
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

# Xquartz & docker
set PATH $PATH:/usr/X11R6/bin

# Display settings for XQuartz (Dietrich Onnasch)
# X11_FOLDER=/tmp/.X11-unix
# currentUser=`(set \`whoami\`; echo $1)`
# bb=`ls -l $X11_FOLDER | grep $currentUser`
# bbb=${bb/*X/:}
# usedDISPLAY=$bbb.0
# export DISPLAY=$usedDISPLAY

# Docker config:
eval $(docker-machine env)
IP=$(ifconfig en0 | grep inet | awk '$1=="inet" {print $2}')
