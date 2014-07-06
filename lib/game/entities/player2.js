ig.module(
	'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function(){

	EntityPlayer = ig.Entity.extend({

		// GFX
		animSheet: new ig.AnimationSheet( 'media/gfx/players/reference_player.png', 32, 32 ),
		size: {x: 9, y:30},
		offset: {x: 11, y: 1},
		flip: false,

		// PHYSICS
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.LITE,
        maxVel: {x: 100, y: 200},
        friction: {x: 500, y: 0},
		accelGround: 400,
        accelAir: 200,
        jump: 150,
        jumpX: 0,
        doubleJump: 24,
        grounded: false,
        onWall: false,

		// AUDIO
		//sJump: new ig.Sound( 'media/sounds/jump.*' ),

		// VARS
		player:true,
		button_left: '',
		button_right: '',
		button_a: '',
		button_b: '',

		// SETTINGS
		no: 0,
		lives: 4,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );

			this.addAnim( 'idle', 0.4, [0,1,2,3] );
			this.addAnim( 'move', 0.1, [4,5,6,7] );
			this.addAnim( 'jump', 0.1, [8] );
		},

		handleMovementTrace: function( res ) {
			this.parent(res);
		    if(!this.inWater){
			    // IS GROUNDED?
			    if( res.collision.y || res.collision.x || ( this.vel.y < this.doubleJump && this.vel.y > -this.doubleJump )) {
			        this.grounded = true;
			    }else{
					this.grounded = false;
			    }

			    // JUMP ON WALLS
			    if(!res.collision.y && res.collision.x && !(ig.input.state(this.button_left) && ig.input.state(this.button_right))){
		    		this.onWall = true;
		    	}else{
		    		this.onWall = false;
		    	}
		    }else{
		    	this.onWall = false;
		    	this.grounded = false;
		    	this.standing = false;
		    }


		},

		check: function(other) {
			if(other.player){
				//if(this.pox.y < other.pos.y){
					this.vel.y = -this.jump;
				//}
			}
		},

		kill: function(){
			this.parent();
		},

		update: function() {

			// LEFT / RIGHT
			var accel = (this.grounded || this.standing) ? this.accelGround : this.accelAir;

			if(this.vel.x<0) this.flip = false; else this.flip = true;

			if( ig.input.state(this.button_left) ) {
				if(!this.onWall){
					this.accel.x = -accel;
				}else{
					this.accel.x = accel*2;
					this.vel.y = -this.jump;
					this.sJump2.play();
				}
				this.flip = false;
			}
			else if( ig.input.state(this.button_right) ) {
				if(!this.onWall){
					this.accel.x = accel;
				}else{
					this.accel.x = -accel*2;
					this.vel.y = -this.jump;
					this.sJump2.play();
				}
				this.flip = true;
			}
			else {
				this.accel.x = 0;
			}

			// DO NOT SLIDE
			if(this.vel.y == 0 && (this.vel.x < 3 && this.vel.x > -3)){
				this.vel.x = 0;
			}

			if(!this.inWater){
				// JUMP
				if( (this.grounded || this.standing) && ig.input.pressed(this.button_a) ) {
	            	this.vel.y = -this.jump;
	                this.jumpX = 1;
	                //this.sJump.play();
	        	}

				if (ig.input.state(this.button_a)){
					this.vel.y -= this.jump*0.1*this.jumpX;
					if (this.jumpX > 0.5)
					  this.jumpX *= 0.95;
					else
					  this.jumpX = 0;
				}
			}else{
				// SWIM
				this.vel.y += 10;
				if (ig.input.state(this.button_a)){
					this.vel.y -= accel;
				}
			}

			// ANIMATIONS

			if(this.vel.x !== 0 || this.vel.y !== 0){
				if(this.vel.x !== 0) this.currentAnim = this.anims['move']; else this.currentAnim = this.anims['jump'];

			}else{
				this.currentAnim = this.anims['idle'];
			}

			this.currentAnim.flip.x = this.flip;
			if(!this.flip){
				this.offset.x = 0;
			}else{
				this.offset.x = 3;
			}

			// CHECK HEARTHS
			if(this.lives < 0){
				this.kill();
			}

			this.parent();
		},


    });
});