#!/usr/bin/env bash
# Close any open System Preferences panes, to prevent them from overriding
# settings we’re about to change
osascript -e 'tell application "System Preferences" to quit'

# disable the dashboard
defaults write com.apple.dashboard mcx-disabled -bool true

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

# Show icons for hard drives, servers, and removable media on the desktop
defaults write com.apple.finder ShowExternalHardDrivesOnDesktop -bool true
defaults write com.apple.finder ShowHardDrivesOnDesktop -bool true
defaults write com.apple.finder ShowMountedServersOnDesktop -bool true
defaults write com.apple.finder ShowRemovableMediaOnDesktop -bool true

# Show the ~/Library folder
chflags nohidden ~/Library

# Add bluetooth and sound to the menu bar
# found here : https://www.jamf.com/jamf-nation/discussions/10576/menu-bar-customization
open '/System/Library/CoreServices/Menu Extras/Volume.menu'
open '/System/Library/CoreServices/Menu Extras/Bluetooth.menu'

# Desktop shotcuts for switching spaces (effective after closing session)
# defaults write com.apple.symbolichotkeys AppleSymbolicHotKeys -dict-add 118 "<dict><key>enabled</key><true/><key>value</key><dict><key>type</key><string>standard</string>\
# <key>parameters</key><array><integer>65535</integer><integer>18</integer><integer>262144</integer></array></dict></dict>"
# defaults write com.apple.symbolichotkeys AppleSymbolicHotKeys -dict-add 119 "<dict><key>enabled</key><true/><key>value</key><dict><key>type</key><string>standard</string>\
# <key>parameters</key><array><integer>65535</integer><integer>19</integer><integer>262144</integer></array></dict></dict>"
# defaults write com.apple.symbolichotkeys AppleSymbolicHotKeys -dict-add 120 "<dict><key>enabled</key><true/><key>value</key><dict><key>type</key><string>standard</string>\
# <key>parameters</key><array><integer>65535</integer><integer>20</integer><integer>262144</integer></array></dict></dict>"

# kill the stuff
for app in "Dashboard" "Dock" "Finder" ; do
	killall "$app" > /dev/null 2>&1
done

# DeleteAll_.DS_onOSXDisk
find ~ -name ".DS_Store" -delete;
exit 0