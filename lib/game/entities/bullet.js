ig.module(
	'game.entities.bullet'
)
.requires(
    'impact.entity',
    'impact.entity-pool'
)
.defines(function(){

	EntityBullet = ig.Entity.extend({

        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
		animSheet: new ig.AnimationSheet( 'media/gfx/weapons/bullet_circle_red.png', 4, 4 ),
		size: {x: 4, y:4},
		offset: {x: 0, y: 0	},
        friction: {x:0,y:0},
        gravityFactor: 0,
        maxVel: {x: 1000, y: 1000},
        speed: 400,
        recoil: 24, // only numbers divided by 2

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 1, [0] );
			this.currentAnim = this.anims.idle;

			if(!settings.flip){
				this.vel.x = -this.speed;
				this.currentAnim.flip.x = true;
			}else{
				this.vel.x = this.speed;
			}
            this.vel.y = (this.recoil*0.5) - (Math.random()*this.recoil)<<0
		},

		reset: function( x, y, settings ) {
			this.parent( x, y, settings );

			if(!settings.flip){
				this.vel.x = -this.speed;
				this.currentAnim.flip.x = true;
			}else{
				this.vel.x = this.speed;
			}
            this.vel.y = (this.recoil*0.5) - (Math.random()*this.recoil)<<0
            console.log(this.vel.x, this.vel.y)
		},

		check: function( other ) {
			if(!other.player){
                other.receiveDamage(33);
            }
            this.kill();
        },

        update: function() {
			this.parent();
			if(this.vel.x == 0){
				this.kill();
			}
		}
    });

	ig.EntityPool.enableFor( EntityBullet );
});