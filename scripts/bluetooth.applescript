tell application "System Preferences"
	activate
	set the current pane to pane "com.apple.preferences.Bluetooth"
	delay 1
end tell

tell application "System Events"
	tell process "System Preferences"
		set toggleBluetooth to the checkbox 1 of the window 1
		tell toggleBluetooth to if value is 0 then click
	end tell
end tell

tell application "System Preferences"
	quit
end tell