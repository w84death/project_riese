
ig.module(
	'game.entities.particle_blood'
)
.requires(
    'game.entities.particle'
)
.defines(function(){

	EntityParticle_blood = EntityParticle.extend({

		animSheet: new ig.AnimationSheet( 'media/gfx/particle/blood.png', 4, 4 ),
		size: { x:2, y:2 },
		offset: { x:0, y:0 },
		lifetime:10,

		//sSplash:  new ig.Sound( 'media/sounds/splash.*' ),

		init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0,1,2,3] );
            this.currentAnim.gotoRandomFrame();
	    	this.vel.x = -60+(Math.random()*120)<<0;
	    	this.vel.y = -60-(Math.random()*120)<<0;
		},

		reset: function( x, y, settings ) {
        	this.parent( x, y, settings );
            this.currentAnim.gotoRandomFrame();
            this.vel.x = -60+(Math.random()*120)<<0;
            this.vel.y = -60-(Math.random()*120)<<0;
        },

        update: function(){
			this.parent();
            console.log(this.pos.x)
        },

    });

});