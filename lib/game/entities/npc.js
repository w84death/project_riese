ig.module(
    'game.entities.npc'
)
.requires(
    'impact.entity',
    'impact.entity-pool'
)
.defines(function(){

    EntityNpc = ig.Entity.extend({


        // PHYSICS
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,
        collides: ig.Entity.COLLIDES.LITE,
        maxVel: {x: 100, y: 200},
        friction: {x: 500, y: 0},


       // SETTINGS
        npc: true,
        fly: false,
        speed: 25,
        isDoing: 'explore',
        zIndex: 12,
        direction: 1,
        attack:10,
        feedbackPower: 2,
        deadEntity: false,

        init: function( x, y, settings ) {
            this.parent( x, y, settings );

            this.addAnim( 'idle', 1, [0] );
            this.addAnim( 'move', 1, [0] );
            this.addAnim( 'attack', 1, [0] );
            this.addAnim( 'fly', 1, [0] );
        },


        receiveDamage: function(damage){
            this.parent(damage);
            // SPAWN BLOOD
            // make plugin for generatign particle
            ig.game.particles.blood({
                blood:ig.game.settings.npcBlood,
                x:this.pos.x+(this.size.x*0.5),
                y:this.pos.y+(this.size.y*0.5)
            });
        },

        kill: function(){
            if(this.deadEntity){
                ig.game.spawnEntity( this.deadEntity,this.pos.x,this.pos.y);
            }
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

            }else{
                this.direction *= -1;
            }
        },

        update: function() {
            if(ig.game.flow.STATE !== 'game'){
                return false;
            }

            // KILL??
            if(this.pos.x < -50 || this.pos.x > ig.game.mapMax().width+50){
                this.kill();
                return false;
            }

            // DECIDE WHAT TO DO
            this.isDoing = 'explore';
            var players = ig.game.getEntitiesByType( EntityPlayer );
            for (var i = 0; i < players.length; i++) {
                if(this.distanceTo(players[i]) < this.size.x){
                    this.isDoing = 'attack';
                    players[i].receiveDamage(this.attack);
                    if(players[i].pos.x > this.pos.x){
                        players[i].push(this.feedbackPower);
                    }else{
                        players[i].push(-this.feedbackPower);
                    }
                }
            };

            // MOVEMENT
            if(this.isDoing == 'explore'){
                this.vel.x = ( this.speed * this.direction );
            }else
            if(this.isDoing == 'attack'){
                this.vel.x = 0;
            }


            if(!this.fly){
                // CHECK IF NEAR CLIF (GAP)
                if( !ig.game.collisionMap.getTile(
                        this.pos.x + (this.direction>0 ? this.size.x+4 : -4),
                        this.pos.y + this.size.y+1)) {
                        this.direction *= -1;
                }
            }else{

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

    ig.EntityPool.enableFor( EntityNpc );
});