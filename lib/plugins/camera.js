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

    k:0.9,
    sX:0,
    sY:0,

    init: function(){

    },

    update: function() {
        var players = ig.game.getEntitiesByType( EntityPlayer );

        if( players[0] ) {

            this.sX = this.k * this.sX + (1.0 - this.k) * (players[0].pos.x + players[0].offset.x + (players[0].size.x*0.5) + (players[0].flip?32:-32) );
            this.sY = this.k * this.sY + (1.0 - this.k) * (players[0].pos.y - 32);

        }

        ig.game.screen.x = this.sX - ig.system.width*0.5;
        ig.game.screen.y = this.sY- ig.system.height*0.5;
    }

});
});