'use strict';
var load_state = {
    preload: function() {

        this.load.atlasJSONHash('explocion', 'assets/explocion.png', 'assets/explocion.json');
        this.load.atlasJSONHash('ship', 'assets/ship.png', 'assets/ship.json');
        this.load.atlasJSONHash('meteorite', 'assets/meteo.png', 'assets/meteo.json');
        this.load.atlasJSONHash('bullet', 'assets/bullet.png', 'assets/bullet.json');
        
        this.load.image('star1', 'assets/star1.png');
        this.load.image('star2', 'assets/star3.png');

        this.stage.backgroundColor = '#000000';
    },
	create: function() {
        this.game.state.start('menu');
    }
};