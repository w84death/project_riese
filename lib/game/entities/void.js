ig.module(
    'game.entities.void'
)
.requires(
    'impact.entity'
)
.defines(function(){

    EntityVoid = ig.Entity.extend({

        size: {x: 8, y: 8},
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
    	collides: ig.Entity.COLLIDES.NONE,
        maxVel: {x: 0, y: 0},

    	init: function( x, y, settings ) {
    		this.parent( x, y, settings );
    	},


        check: function( other ) {
            ig.game.flow.restartLevel();
        }

    });


});