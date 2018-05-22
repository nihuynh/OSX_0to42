-- Main Loop :
try
	changeBackground()
on error
	displayError()
end try

-- Desktop backgroud
on changeBackground()
	repeat with desktopid from 18 to 20
		tell application "System Events"
			key code desktopid using (control down)
		end tell
		delay 0.3
		tell application "System Events"
			tell current desktop
				set pictures folder to "/Users/nihuynh/Pictures/Wallpapers"
				set picture rotation to 1
				set change interval to 600
				set random order to true
			end tell
		end tell
		delay 0.3
	end repeat
end changeBackground

on displayError()
	display dialog "The script encountered a problem."
end displayError
