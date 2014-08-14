/* global Phaser */
'use strict';    
var play_state = {
    create: function() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.create_background_stars();
        this.create_bullets();
        this.create_ship();
        this.create_add_meteorites();
        this.create_score_label();
    },

    update: function() {
        this.ship_animations();
        this.ship_move();
        this.fire_bullet();
        this.physics.arcade.overlap(this.ship, this.meteorites, this.damage_ship, null, this);
        this.physics.arcade.overlap(this.bullets, this.meteorites, this.damage_meteorite, null, this);
        this.make_background_stars();
    },
    
    render:function(){
        //this.game.debug.body(this.ship);
        /*this.meteorites.forEach(function (e) {
                this.game.debug.body(e);
            }, this);*/
        /*this.bullets.forEach(function (e) {
                this.game.debug.body(e);
            }, this);*/
    },
    
    damage_ship:function(ship,meteorite){
        ship.damage(meteorite.danio);
        meteorite.kill();
        if(ship.health == 0)
            this.gameover();
    },

    damage_meteorite:function(bullet, meteorite){
        meteorite.damage(bullet.danio);
        bullet.kill(); 
        if(meteorite.health === 0)
            this.aumentar_puntaje();
    },

    fire_bullet:function(){
        if(this.fireButton.isDown && this.ship.alive && (this.time.now > this.fire_time)) {
            switch(this.ship.fireModifier){
            case 1:
                this.normal_bullet(0, 150, 0, 20, 8);
                break;
            case 2:
                this.multi_bullet();
                break;
            default:
                break;
            }
        }
    },

    normal_bullet: function(angulo, velX, velY, difXship, difYship){
        var bullet = this.bullets.getFirstDead();
        if(!bullet)
            return;
        bullet.angle=angulo;
        bullet.lifespan = 2200;
        bullet.reset(this.ship.body.x+difXship, this.ship.body.y+difYship);
        bullet.body.velocity.x= velX;
        bullet.body.velocity.y= velY;
        this.fire_time = this.time.now +400;
    },

    multi_bullet: function(){
        this.normal_bullet(-45, 150, -100, 5, 8);
        this.normal_bullet(-30, 150, -50, 10, 8);
        this.normal_bullet(0, 150, 0, 20, 8);
        this.normal_bullet(30, 150, 50, 10, 8);
        this.normal_bullet(45, 150, 100, 5, 8);
    },

    create_bullets:function(){
        this.bullets = this.add.group();
        this.bullets.createMultiple(30, 'bullet');
        this.bullets.forEach(function (e) {
                e.animations.add('redBullet', [0,1,2,3], 30, true);
                e.animations.add('lowBlueBullet', [4,5,6,7], 30, true);
                e.animations.play('redBullet');
                e.danio = 1;
            }, this);
        this.bullets.enableBody = true;
        this.physics.enable(this.bullets, Phaser.Physics.ARCADE);
        this.fire_time = 0;
    },
    
    ship_animations:function(){
        this.cursors.up.onDown.add(function(){
            this.ship.animations.play('down');
            }, this);
        this.cursors.down.onDown.add(function(){
            this.ship.animations.play('up');
            }, this);
        this.cursors.up.onUp.add(this.stop_move, this);
        this.cursors.down.onUp.add(this.stop_move, this);
    },
    
    ship_move:function(){
        if (this.cursors.up.isDown){
            this.ship.body.velocity.y=-150;
        }else if(this.cursors.down.isDown){
            this.ship.body.velocity.y=150;
        }else
            this.ship.body.velocity.y= 0;
    },
  
    create_score_label:function(){
        score = 0;
        var style = { font: '35px Arial', fill: '#ffffff' };
        this.label_score = this.add.text(20, 20, '0', style);
    },

    create_add_meteorites:function(){
        this.meteorites = this.add.group();
        this.meteorites.createMultiple(20, 'meteorite');
        this.meteorites.forEach(function (e) {
                e.animations.add('rotar', [0,1,2,3], 10, true);
                e.animations.play('rotar');
                e.danio = 1;
            }, this);
        this.meteorites.enableBody = true;
        this.physics.enable(this.meteorites, Phaser.Physics.ARCADE);
        this.timer_add_meteorites = this.time.events.loop(300, this.add_meteorites, this);
    },

    add_meteorites: function() {
        var x = (Math.random()*475);
        var w = (Math.random()*475);
        var s = ((Math.random()*275)+240);
        var t = ((Math.random()*275)+240);
        if ((Math.abs(x-w))<42)
            x += (Math.random()*475);
        this.add_meteorite(400, x, s);
        this.add_meteorite(400, w, t);
    },

    add_meteorite: function(x, y, velocity) {
        var meteorite = this.meteorites.getFirstDead();
        meteorite.reset(x, y);
        meteorite.body.velocity.x = -velocity;
        meteorite.lifespan = 1800;
        meteorite.health = 2;
        var rand = 0.3+Math.random();
        meteorite.scale.setTo(rand, rand);
    },

    create_ship:function(){
        this.ship = this.add.sprite(50, 250, 'ship',6);
        this.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.body.collideWorldBounds = true;
        this.ship.animations.add('down', [7,8,9,10,11], 15, false);
        this.ship.animations.add('up', [5,4,3,2,1,0], 15, false);
        this.ship.animations.add('up_down', [0,1,2,3,4,5,6], 15, false);
        this.ship.animations.add('down_up', [11,10,9,8,7,6], 15, false);
        this.ship.health = 1;
        this.ship.fireModifier = 1;
    },

    create_background_stars:function(){
        var i;
        this.star1 = this.make.sprite(0, 0, 'star1');
        this.star2 = this.make.sprite(0, 0, 'star2');
        this.stars = [];
        this.texture1 = this.add.renderTexture(400, 500, 'texture1');
        this.texture2 = this.add.renderTexture(400, 500, 'texture2');
        this.add.sprite(0, 0, this.texture1);
        this.add.sprite(0, 0, this.texture2);
        for (i = 0; i < 100; i++)
            this.stars.push( {
                x: this.world.randomX,
                y: this.world.randomY,
                speed: -1,
                texture: this.texture1
            });
        for (i = 100; i < 150; i++)
            this.stars.push( {
                x: this.world.randomX,
                y: this.world.randomY,
                speed: -1.5,
                texture: this.texture2
            });
    },

    make_background_stars:function(){
        var i,star;
        for (i = 0; i < 150; i++){
            this.stars[i].x += this.stars[i].speed;
            if (this.stars[i].x < -32){
                this.stars[i].y = this.world.randomY;
                this.stars[i].x = 432;
            }
            if (this.stars[i].texture == this.texture1)
                star = this.star1;
            else
                star = this.star2;
            if (i === 0 || i == 100)
                this.stars[i].texture.renderXY(star, this.stars[i].x, this.stars[i].y, true);
            else
                this.stars[i].texture.renderXY(star, this.stars[i].x, this.stars[i].y, false);
        }
    },

    gameover: function(){
        var _this = this;
        this.explotar(this.ship.x,this.ship.y);
        this.ship.kill();
        this.bullets.removeAll();
        setTimeout(function(){
            _this.restart_game();
            }, 1000);
    },

    restart_game: function() {
        this.time.events.remove(this.timer_add_meteorites);
        this.state.start('menu');
    },

    stop_move: function(){
        if (this.ship.body.velocity.y>0)
            this.ship.animations.play('up_down');
        else
            this.ship.animations.play('down_up');
    },

    aumentar_puntaje: function(){
        score += 1;
        switch (score) {
        case 10:
            this.bullets.forEach(function (e) {
                e.animations.play('lowBlueBullet');
                e.danio = 2;
            }, this);
            this.ship.fireModifier = 1;
            break;
        case 20:
            this.bullets.forEach(function (e) {
                e.animations.play('redBullet');
                e.danio = 1;
            }, this);
            this.ship.fireModifier = 2;
            break;
        case 30:
            this.bullets.forEach(function (e) {
                e.animations.play('lowBlueBullet');
                e.danio = 2;
            }, this);
            this.ship.fireModifier = 2;
            break;
        default:
            break;
        }
        this.label_score.text = score;
    },

    explotar: function(x, y){
        var explocion = this.add.sprite(x, y-7, 'explocion');
        explocion.animations.add('a');
        explocion.animations.play('a', 13, true);
    },
};