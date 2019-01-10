#!/usr/bin/env bash
# Settings OSX

# TODO:
* trackpad => touch to click
* trackpad => remove launchpad
* activate fire-wall
* change resolution
* remove mouse shake to locate
* change the screen saver
* Reduce time for the screen saver
* Keyboard => full speed for repetition and pause
* retro-eclairage keyboard eco on 5 s
* create 2 more space and put the shortcut
* add google account for mail n shit
* add date and second in menu bar
* Change accentuation color

# Wipe the dock
defaults write com.apple.dock persistent-apps -array

# Place the dock on the left
defaults write com.apple.Dock orientation -string left

# Change the dock hide animation speed
defaults write com.apple.dock autohide-delay -float 0
defaults write com.apple.dock autohide-time-modifier -float 0.12

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

# Add bluetooth and sound to the menu bar
# found here : https://www.jamf.com/jamf-nation/discussions/10576/menu-bar-customization
open '/System/Library/CoreServices/Menu Extras/Volume.menu'
open '/System/Library/CoreServices/Menu Extras/Bluetooth.menu'

# Show icons for hard drives, servers, and removable media on the desktop
defaults write com.apple.finder ShowExternalHardDrivesOnDesktop -bool true
defaults write com.apple.finder ShowHardDrivesOnDesktop -bool true
defaults write com.apple.finder ShowMountedServersOnDesktop -bool true
defaults write com.apple.finder ShowRemovableMediaOnDesktop -bool true

# Show filename extensions by default
defaults write NSGlobalDomain AppleShowAllExtensions -bool true
