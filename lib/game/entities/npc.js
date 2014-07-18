ig.module(
    'game.entities.npc'
)
.requires(
    'impact.entity',
    'impact.entity-pool'
)
.defines(function(){

    EntityNPC = ig.Entity.extend({


        // PHYSICS
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,
        collides: ig.Entity.COLLIDES.PASSIVE,
        maxVel: {x: 100, y: 200},
        friction: {x: 500, y: 0},


        // VARS
        npc: true,
        fly: false,
        speed: 25,
        isDoing: 'explore',

        // SETTINGS
        direction: 1,

        init: function( x, y, settings ) {
            this.parent( x, y, settings );

            this.addAnim( 'idle', 1, [0] );
            this.addAnim( 'move', 1, [0] );
            this.addAnim( 'attack', 1, [0] );
            this.addAnim( 'fly', 1, [0] );
        },


        kill: function(){
            this.parent();
        },

        handleMovementTrace: function( res ) {
            this.parent( res );
            // collision with a wall? return!
            if( res.collision.x ) {
                  this.direction *= -1;
            }
        },

        check: function(other){
            if(other.player){
                // gryzaj go!
                this.isDoing = 'attack';
                other.receiveDamage(10);
            }else{
                this.direction *= -1;
            }
        },

        update: function() {
            if(ig.game.flow.STATE !== 'game'){
                return false;
            }

            // KILL??
            // move this to main.js
            var maxX = ig.game.collisionMap.width * ig.game.collisionMap.tilesize - ig.system.width;
            if(this.pos.x < -50 || this.pos.x > maxX+50){
                this.kill();
                return false;
            }

            // DECIDE WHAT TO DO
            this.isDoing = 'explore';
            var players = ig.game.getEntitiesByType( EntityPlayer );
            for (var i = 0; i < players.length; i++) {
                if(this.distanceTo(players[i]) < this.size.x){
                    this.isDoing = 'attack';
                }
            };

            // MOVEMENT
            if(this.isDoing == 'explore'){
                this.vel.x = ( this.speed * this.direction );
            }else
            if(this.isDoing == 'attack'){
                this.vel.x = 0;
            }


            if(this.fly){

            }else{
                // CHECK IF NEAR CLIF (GAP)
                if( !ig.game.collisionMap.getTile(
                        this.pos.x + this.offset.x + (this.direction ? this.size.x+4 : -4),
                        this.pos.y + this.offset.y+1)) {
                        this.direction *= -1;
                }
            }

            // ANIMATIONS
            if(this.isDoing == 'attack'){
                this.currentAnim = this.anims['attack'];
            }else
            if(this.isDoing == 'explore'){
                if(this.vel.x !== 0 || this.vel.y !== 0){
                    if(this.fly){
                        this.currentAnim = this.anims['fly'];
                    }else{
                        this.currentAnim = this.anims['move'];
                    }
                }else{
                    this.currentAnim = this.anims['idle'];
                }
            }

            // FLIP SPRITE
            this.currentAnim.flip.x = this.direction > 0? true:false;
            this.parent();
        },

    });

    ig.EntityPool.enableFor( EntityNPC );
});