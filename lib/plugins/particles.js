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

    PARTICLE
    bum!

----------------------------------------------------------------------------
*/
ig.module(
    'plugins.particles'
)
.requires(
    'impact.game'
)
.defines(function(){

ig.Particles = ig.Class.extend({


    timer:  new ig.Timer(),

    init: function(){

    },

    blood: function(params){
        if(ig.game.getEntitiesByType( EntityParticle ).length < ig.game.settings.particlesOnScreen){
            for (var i = 0; i < params.blood; i++) {
                ig.game.spawnEntity( EntityParticle_blood,params.x,params.y);
            };
        }
    },

    update: function() {

    }

});
});