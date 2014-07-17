/*
----------------------------------------------------------------------------

    P1X Team
    Project Riese (codename)

    abstract: Game for TheJam.pl
    created: 01-07-2014
    license: do what you want and dont bother me

    webpage: http://p1x.in
    twitter: @w84death

----------------------------------------------------------------------------

    CAMERA
    Everything for managing the game state machine

----------------------------------------------------------------------------
*/
ig.module(
    'plugins.camera'
)
.requires(
    'impact.game'
)
.defines(function(){

ig.Camera = ig.Class.extend({

    // vars for smoothing
    k:      0.9, // 0.8 - very fast, 0.99 - very slow
    sX:     0,
    sY:     0,

    shakeTimer:  new ig.Timer(),
    shakeTime: 0.2,
    cameraPaningDirection: 1,

    init: function(){

    },

    shake: function(){
        if(ig.game.enableShake){
            this.shakeTimer.set(this.shakeTime);
        }
    },

    panning: function() {
        // move to main.js
        var maxX = ig.game.collisionMap.width * ig.game.collisionMap.tilesize - ig.system.width;

        if(ig.game.screen.x > maxX) { this.cameraPaningDirection = -1; }
        if(ig.game.screen.x < 0 ) { this.cameraPaningDirection = 1; }

        ig.game.screen.x += 0.1 * this.cameraPaningDirection;
    },

    center: function() {
        //move to main.js
        var maxX = ig.game.collisionMap.width * ig.game.collisionMap.tilesize - ig.system.width;
        var centerX = maxX*0.5;
        this.xS = centerX;
        ig.game.screen.x = centerX;
        ig.game.screen.y = 0;
    },


    update: function() {
        var shakeX = 0,
            shakeY = 0,
            players = ig.game.getEntitiesByType( EntityPlayer );

        if( players[0] ) {

            this.sX = this.k * this.sX + (1.0 - this.k) * (players[0].pos.x + players[0].offset.x + (players[0].size.x*0.5) + (players[0].flip?32:-32) );
            this.sY = this.k * this.sY + (1.0 - this.k) * (players[0].pos.y - 16);

        }

        if(this.shakeTimer.delta() < 0){
            if(Math.random()*10 > 5){
                shakeX = 8 - ((Math.random()*16)<<0);
                shakeY = 8 - ((Math.random()*16)<<0);
            }
        }

        ig.game.screen.x = this.sX - ig.system.width*0.5 + shakeX;
        ig.game.screen.y = this.sY- ig.system.height*0.5 + shakeY;
    }

});
});