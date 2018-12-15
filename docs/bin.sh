# bin
# TODO UNUSED
# Increase sound quality for Bluetooth headphones/headsets
# defaults write com.apple.BluetoothAudioAgent "Apple Bitpool Min (editable)" -int 40

# TODO BROKEN
# Require password as soon as screensaver or sleep mode starts
defaults write com.apple.screensaver askForPassword -int 1
defaults write com.apple.screensaver askForPasswordDelay -int 0

# Disable animations when opening and closing windows (dont do shit in sierra)
# defaults write NSGlobalDomain NSAutomaticWindowAnimationsEnabled -bool false

# Change the expose animation speed (dont do shit in sierra)
# defaults write com.apple.dock expose-animation-duration -float 0

# Change minimize/maximize window effect
defaults write com.apple.dock mineffect -string "scale"