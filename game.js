/* global Phaser */
'use strict';
var game = new Phaser.Game(400, 500, Phaser.AUTO, 'game_div');

var score = 0;

game.state.add('load', load_state);
game.state.add('menu', menu_state);
game.state.add('play', play_state);

game.state.start('load');