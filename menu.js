/* global Phaser */
'use strict';
    var menu_state = {
    create: function() {
        var startButtom = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        startButtom.onDown.add(this.start, this);
  
        var style = { font: '30px Arial', fill: '#ffffff' };
        var x = game.world.width/2, y = game.world.height/2;

        var text = this.add.text(x, y-50, 'Press Space to start', style);
        text.anchor.setTo(0.5, 0.5);

        if (score > 0) {
            var score_label = this.add.text(x, y+50, 'score: ' + score, style);
            score_label.anchor.setTo(0.5, 0.5);
        }
    },

    start: function() {
        this.game.state.start('play');
    }
};