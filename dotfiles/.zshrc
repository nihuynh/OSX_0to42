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
# Set docker env variables
eval export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.100:2376"
export DOCKER_CERT_PATH="/Users/nihuynh/.docker/machine/machines/default"
export DOCKER_MACHINE_NAME="default"
# Run this command to configure your shell: 
# eval $(docker-machine env default)
