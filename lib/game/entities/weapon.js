ig.module(
	'game.entities.weapon'
)
.requires(
    'impact.entity'
)
.defines(function(){

	EntityWeapon = ig.Entity.extend({

        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.LITE,

        friction: {x:100,y:100},
        ammo: 120,
        owner: false,
        shootTimer: new ig.Timer(),
        shootTimerDelay: 0.05,
        feedbackPower: 1,
        flashes: true,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
		},

		take: function( other ){
			other.inHand = this;
            this.owner = other;
            this.collides = ig.Entity.COLLIDES.NONE;
            this.zIndex = other.zIndex + 1;
            ig.game.sortEntitiesDeferred();
		},

		drop: function( other ){
            var center = other.pos.x + other.offset.x + (other.size.x*0.5);
			if(other.flip){
				this.pos.x = center + 24;
			}else{
				this.pos.x = center - 24;
			}
            this.accel.y -= 56;
			other.inHand = false;
            this.owner = false;
            this.collides = ig.Entity.COLLIDES.LITE;

		},

		use: function(){
			if(this.ammo > 0){
				if(this.shootTimer.delta() > this.shootTimerDelay){
					this.shootTimer.reset();
					if(!this.owner.flip){
						ig.game.spawnEntity(
							EntityBullet,
							this.pos.x+this.offset.x - 4,
							this.pos.y,
							{flip:this.owner.flip}
						);
                        this.owner.pos.x += this.feedbackPower;
					}else{
						ig.game.spawnEntity(
							EntityBullet,
							this.pos.x+this.offset.x + 4,
							this.pos.y,
							{flip:this.owner.flip}
						);
                        this.owner.pos.x -= this.feedbackPower;
					}

					this.ammo -= 1;
				}
			}else{
                // say 'no ammo'
            }
		},

		check: function( other ) {
            if( other.canPickUp && !other.inHand){
                this.take( other );
            }
        },

		update: function() {
			this.parent();
			if(this.owner){
				if( this.owner.vel.x == 0 && this.owner.vel.y == 0 ) {
					if(this.shootTimer.delta() < this.shootTimerDelay){
					    this.currentAnim = this.anims.fire;
					}else{
					    this.currentAnim = this.anims.idle;
					}
				}else{
					this.currentAnim = this.anims.run;
				}

				this.pos.y = this.owner.pos.y + this.owner.offset.y+this.owner.weaponPosition.y;

				if(!this.owner.flip){
					this.currentAnim.flip.x = false;
					this.pos.x = this.owner.pos.x + this.owner.offset.x - this.owner.weaponPosition.x;
				}else{
					this.currentAnim.flip.x = true;
					this.pos.x = this.owner.pos.x + this.owner.offset.x - this.owner.weaponPosition.x+2;
				}
			}else{
				this.currentAnim = this.anims.idle;
			}
		}
    });

});