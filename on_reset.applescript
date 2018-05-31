-- Main Loop :
try
	changeBackground()
	darkMode()
	enableScreenSaverClock()
on error
	displayError()
end try

-- Set the dark mode
on darkMode()
	tell application "System Events"
		tell appearance preferences
			set properties to {dark mode:true, scroll bar action:jump to here}
		end tell
	end tell
end darkMode

-- Add the clock on the screen saver
on enableScreenSaverClock()
	tell application "System Events"
		tell screen saver preferences
			set properties to {show clock:true}
		end tell
	end tell
end enableScreenSaverClock

-- Desktop backgroud
on changeBackground()
	repeat with desktopid from 18 to 20
		tell application "System Events"
			key code desktopid using (control down)
		end tell
		delay 0.3
		tell application "System Events"
			tell current desktop
				set pictures folder to "/Volumes/Storage/goinfre/nihuynh/Pictures/Wallpapers"
				set picture rotation to 1
				set change interval to 600
				set random order to true
			end tell
		end tell
		delay 0.3
	end repeat
end changeBackground

-- Error prompt
on displayError()
	display dialog "The script encountered a problem."
end displayError