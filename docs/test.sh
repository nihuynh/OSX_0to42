# Desktop
defaults write com.apple.symbolichotkeys.plist AppleSymbolicHotKeys -dict-add 118 '{enabled = 1; value = { parameters = (65535, 18, 262144); type = standard; }; }'
defaults write com.apple.symbolichotkeys.plist AppleSymbolicHotKeys -dict-add 119 '{enabled = 1; value = { parameters = (65535, 19, 262144); type = standard; }; }'
defaults write com.apple.symbolichotkeys.plist AppleSymbolicHotKeys -dict-add 120 '{enabled = 1; value = { parameters = (65535, 20, 262144); type = standard; }; }'

defaults write com.apple.symbolichotkeys AppleSymbolicHotKeys -dict-add 120 "{enabled = 0; value = { parameters = (65535, 20, 262144); type = standard; }; }"