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
		offset: {x: 11,y: 1},
		offsetSettings: {
			normal: 11,
			flipped: 9
		},
		flip: false,
		zIndex: 10,

		// PHYSICS
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
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


		// FONT
		label: new ig.Font( 'media/gfx/fonts/white.png' ),

		// VARS
		player:true,
		hero:0,
		weaponPosition: {
            x: 1,
            y: 12
        },

		// SETTINGS
		no: 0,
		lives: 4,
		health: 100,
        inHand: false,
		canPickUp: true,
		showLabel: false,


		init: function( x, y, settings ) {
			this.parent( x, y, settings );

			this.addAnim( 'idle', 0.4, [0,1,2,3] );
			this.addAnim( 'move', 0.1, [4,5,6,7] );
			this.addAnim( 'jump', 0.1, [8] );
			this.addAnim( 'flash', 0.1, [9,0] );
			this.hero = settings.hero;

			// SET GAMEPAD
			buttons = {
				start: settings.buttons.start,
				select: settings.buttons.select,
				left: settings.buttons.left,
				right: settings.buttons.right,
				left: settings.buttons.up,
				left: settings.buttons.down,
				a: settings.buttons.a,
				b: settings.buttons.b,
				x: settings.buttons.x,
				y: settings.buttons.y
			}

			// start with flipping this bastard
			this.flip = (Math.random()*2)<<0 ? true : false;
		},

		receiveDamage: function(damage){
			this.parent(damage);
			ig.game.particles.blood({
                blood:ig.game.settings.playerBlood,
                x:this.pos.x+(this.size.x*0.5),
                y:this.pos.y+(this.size.y*0.5)
            });

		},

		push: function(power){
			 if( !ig.game.collisionMap.getTile(
                        this.pos.x + (this.direction ? this.size.x+power : -power),
                        this.pos.y+this.size.y*0.5)) {
                       	this.pos.x += power;
                }

		},

		kill: function(){
			// decrese player lives by 1 here
			if(this.inHand){
        		this.inHand.drop(this);
        	}
        	// respawn player
			this.parent();
			ig.game.flow.spawnPlayer({
				hero: this.hero,
				x: (ig.system.width*0.5) + ig.game.screen.x,
				y: -50
			});
		},

		update: function() {

			if(ig.game.flow.STATE !== 'game'){
				return false;
			}

			// check if outside the map (kill jump)
			// move to main.js
        	var maxY = ig.game.collisionMap.height * ig.game.collisionMap.tilesize;
			if(this.pos.y > maxY){
				ig.game.flow.restartLevel({hero:this.hero});
				return true;
			}


			var accel = this.standing ? this.accelGround : this.accelAir;

			if(this.vel.x<0) this.flip = false;
			if(this.vel.x>0) this.flip = true;

			if( ig.input.state(this.buttons.left) ) {
				this.accel.x = -accel;
				this.flip = false;
			}
			else if( ig.input.state(this.buttons.right) ) {
				this.accel.x = accel;
				this.flip = true;
			}
			else {
				this.accel.x = 0;
			}

			// DO NOT SLIDE
			if(this.vel.y == 0 && (this.vel.x < 3 && this.vel.x > -3)){
				this.vel.x = 0;
			}


			// JUMP
			if( this.standing && ( ig.input.pressed(this.buttons.a) || ig.input.pressed(this.buttons.up)) ) {
            	this.vel.y = -this.jump;
                this.jumpX = 1;
                //this.sJump.play();
        	}

			if (ig.input.state(this.buttons.a) || ig.input.state(this.buttons.up)){
				this.vel.y -= this.jump*0.1*this.jumpX;
				if (this.jumpX > 0.5)
				  this.jumpX *= 0.95;
				else
				  this.jumpX = 0;
			}


			// ANIMATIONS

			if(this.vel.x !== 0 || this.vel.y !== 0){
				if(this.vel.x !== 0 && this.standing) {
					this.currentAnim = this.anims['move'];
				}else{
					this.currentAnim = this.anims['jump'];
				}
			}else{
				this.currentAnim = this.anims['idle'];
			}


			// ITEM CONTROL
			if(this.inHand){

				// USE ITEM
				if( ig.input.state(this.buttons.x) ) {
					this.inHand.use();
					if(this.inHand.flashes && this.inHand.ammo > 0){
						if(this.grounded){
							this.currentAnim = this.anims['flash'];
						}else{
							// change anim to jumping while flash
						}
					}
				}

				// DROP ITEM
				if( ig.input.released(this.buttons.y) ) {
					this.inHand.drop( this );
				}
			}


			// FLIP SPRITE
			this.currentAnim.flip.x = this.flip;
			if(!this.flip){
				this.offset.x = this.offsetSettings.normal;
			}else{
				this.offset.x = this.offsetSettings.flipped;
			}

			// LABEL
			if( ig.input.released(this.buttons.select) ) {
				this.showLabel = !this.showLabel;
			}

			// CAMERA SHAKE
			if( ig.input.released(this.buttons.start) ) {
				ig.game.particles.blood({
	                blood:ig.game.settings.particlesOnScreen,
	                x:this.pos.x+(this.size.x*0.5),
	                y:this.pos.y+(this.size.y*0.5)
	            });
			}
			this.parent();
		},

		draw: function(){
			this.parent();
			if(this.showLabel){
				var newX = this.pos.x+(this.size.x*0.5)-ig.game.screen.x,
					newY = this.pos.y-28-ig.game.screen.y;
				this.label.draw(
					'P'+(this.no+1)+ ( this.inHand?'\nammo:'+this.inHand.ammo:'' )+'\nhealth:'+this.health,
					newX, newY,
					ig.Font.ALIGN.CENTER
				);
			}
		}

    });
});