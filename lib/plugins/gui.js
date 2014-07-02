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

    GAME FLOW
    Everything for managing the game state machine

----------------------------------------------------------------------------
*/
ig.module(
    'plugins.gui'
)
.requires(
    'impact.game'
)
.defines(function(){

ig.GUI = ig.Class.extend({

    center: {},

    init: function(){
        this.center = {
            x: ig.system.width * 0.5,
            y: ig.system.height * 0.5
        };

        this.bottom = {
            x: ig.system.width * 0.5,
            y: ig.system.height - 64
        };
    },

});
});