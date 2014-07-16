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

    SCRIPTER
    for scripted scenarios and runing npc's

----------------------------------------------------------------------------
*/
ig.module(
    'plugins.scripter'
)
.requires(
    'impact.game'
)
.defines(function(){

ig.Scripter = ig.Class.extend({


    timer:  new ig.Timer(),
    generate: [{
        entity:             'EntityNpc_bird',
        quanity:            1,
        timer:              new ig.Timer(),
        respawn:            function(){
            return 3+(Math.random()*30)<<0;
        }
    }],

    init: function(){

    },

    update: function() {
        var generator = null;

        for (var i = 0; i < this.generate.length; i++) {
            generator = this.generate[i];
            if(generator.timer.delta() > generator.respawn()){
                ig.game.spawnEntity( generator.entity, 0, 0);
                generator.timer.set(0);
            }
        };
    }

});
});