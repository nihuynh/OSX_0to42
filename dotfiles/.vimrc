" colorize text
syntax on

" be iMproved
set nocompatible

" Make tabs as wide as two spaces
set tabstop=4
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

"80 Columns Max
hi OverLength ctermbg=red ctermfg=white guibg=#592929
match OverLength /\%81v.\+/

" Show trailing whitespace:
hi TrailWhite ctermbg=red ctermfg=white guibg=#592929
2match TrailWhite /\s\+$/

" Test for the Highlights
   
" test line test line test line test line test line test line test line test line test

" set colours to 256 for iTerm2
set t_Co=256

" Vim header plugins
set runtimepath^=~/.vim/plugin/42header.vim
