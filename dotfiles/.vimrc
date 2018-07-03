" colorize text
syntax on

" be iMproved
set nocompatible
"indenting

" Make tabs as wide as two spaces
set tabstop=2
set shiftwidth=4
set smartindent
set autoindent

" Line  count
set number
" Highlight current line
set cursorline
" Show the cursor position
set ruler
"enable mouse for iterm2
"set mouse=a

" Show trailing whitespace:
" hi TrailWhite ctermbg=red ctermfg=white guibg=#592929
" match TrailWhite /\s\+$/
   
" test line test line test line test line test line test line test line test line test

"80 Columns Max
hi OverLength ctermbg=red ctermfg=white guibg=#592929
match OverLength /\%81v.\+/
match OverLength /\s\+$/

" match OverLength /\s\+$/
" match OverLength /^\t*\zs \+/

" set colours to 256 for iTerm2
set t_Co=256

" Vim header plugins
set runtimepath^=~/.vim/plugin/42header.vim
