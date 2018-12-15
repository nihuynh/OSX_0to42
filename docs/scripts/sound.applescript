tell application "System Preferences"
	activate
	set the current pane to pane "com.apple.preference.sound"
	delay 1
end tell

tell application "System Events"
	tell process "System Preferences"
		set toggleMenuBar to the checkbox 2 of the window 1
		tell toggleMenuBar to if value is 0 then click
	end tell
end tell

tell application "System Preferences"
	quit
end tell