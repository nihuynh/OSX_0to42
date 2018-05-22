# you can read default with default read
# check stuff here https://www.defaults-write.com
# Require password as soon as screensaver or sleep mode starts
# defaults write com.apple.screensaver askForPassword -int 1
# defaults write com.apple.screensaver askForPasswordDelay -int 0

# Disable animations when opening and closing windows
# defaults write NSGlobalDomain NSAutomaticWindowAnimationsEnabled -bool false

# Change the expose animation speed
# defaults write com.apple.dock expose-animation-duration -float 0.1

# Show filename extensions by default
defaults write NSGlobalDomain AppleShowAllExtensions -bool true

# activate the autohide
defaults write com.apple.dock autohide -bool true

# Change the dock hide animation speed
defaults write com.apple.dock autohide-delay -float 0
defaults write com.apple.dock autohide-time-modifier -float 0.12

# Wipe the dock
defaults write com.apple.dock persistent-apps -array

# Place the dock on the left
defaults write com.apple.Dock orientation -string left

# Hot corners
# Possible values:
#  0: no-op
#  2: Mission Control
#  3: Show application windows
#  4: Desktop
#  5: Start screen saver
#  6: Disable screen saver
#  7: Dashboard
# 10: Put display to sleep
# 11: Launchpad
# 12: Notification Center
# top left = tl etc
defaults write com.apple.dock wvous-br-corner -int 5

# Dont make .DS_STORE on network device and USB drives
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true
defaults write com.apple.desktopservices DSDontWriteUSBStores -bool true

# Don’t display the annoying prompt when quitting iTerm
defaults write com.googlecode.iterm2 PromptOnQuit -bool false

# set the secondary button on the apple mouse
defaults write com.apple.driver.AppleHIDMouse Button2 -int 2
defaults write com.apple.driver.AppleHIDMouse ButtonDominance -int 1

# kill the stuff
killall Dock
killall Finder
