ig.module(
	'game.entities.ammo'
)
.requires(
    'impact.entity'
)
.defines(function(){

	EntityAmmo = ig.Entity.extend({

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.LITE,
		animSheet: new ig.AnimationSheet( 'media/gfx/weapons/ammo.png', 16, 12 ),
		size: {x: 10, y: 10},
		offset: {x: 2, y: 1	},
        friction: {x:100,y:100},
        bullets: 128,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 0.2, [0,0,0,0,0,0,0,0,0,0,1,2,3,4,5] );
            this.currentAnim.gotoRandomFrame();
		},

		check: function( other ) {
            other.ammo += this.bullets;
            this.kill();
        },
    });

});