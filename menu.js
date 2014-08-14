/* global Phaser */
'use strict';
    var menu_state = {
    create: function() {
        var xControl = 20, yControl = game.world.height-80;
        var xCenter = game.world.width/2, yCenter = game.world.height/2;
        var startButtom = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        startButtom.onDown.add(this.start, this);
        this.input.onDown.add(this.start, this);
        
        var style = { font: '30px Arial', fill: '#ffffff' };
        var text = this.add.text(xCenter, yCenter-50, 'Press Space to start', style);
        text.anchor.setTo(0.5, 0.5);

        var controlStyle = { font: '20px Arial', fill: '#0fa0ff' };
        var heightStyle = 20;
        var fireText = this.add.text(xControl, yControl, 'Fire: Space Bar', controlStyle);
        var upText = this.add.text(xControl, yControl+heightStyle, 'Move up: Up arrow', controlStyle);
        var downText = this.add.text(xControl, yControl+(heightStyle*2), 'Dove down: Down arrow', controlStyle);

        if (score > 0) {
            var score_label = this.add.text(xCenter, yCenter+50, 'score: ' + score, style);
            score_label.anchor.setTo(0.5, 0.5);
        }
    },

    start: function() {
        this.game.state.start('play');
    }
};