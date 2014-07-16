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
		animSheet: new ig.AnimationSheet( 'media/gfx/weapons/ammo.png', 9, 10 ),
		size: {x: 9, y: 10},
		offset: {x: 0, y: 0	},
        friction: {x:100,y:100},
        bullets: 120,
        type: 1,
        notDestructable: true,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 0.2, [0,0,0,0,0,0,0,0,0,0,1,2,3,4,5] );
            this.currentAnim.gotoRandomFrame();
		},

		check: function( other ) {
            if(other.inHand.ammoType === this.type){
                other.inHand.ammo += this.bullets;
                this.kill();
            }
        },
    });

});