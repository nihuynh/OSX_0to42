# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    run.sh                                             :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: nihuynh <marvin@42.fr>                     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2018/04/11 01:57:50 by nihuynh           #+#    #+#              #
#    Updated: 2018/04/11 05:38:25 by nihuynh          ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#!/bin/bash
# dump used :
SEPARATOR=" »» on the »» "
echo $(uname -n)$SEPARATOR$(date +"%m-%d-%y/%T") >> ~/42_2018/playground/log/dumps_used.log
# desktop bkgnd :
osascript screen.applescript
