ig.module(
    'game.entities.npc'
)
.requires(
    'impact.entity'
)
.defines(function(){

    EntityNPC = ig.Entity.extend({


        // PHYSICS
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NONE,
        maxVel: {x: 100, y: 200},
        friction: {x: 500, y: 0},


        // VARS
        npc: true,
        fly: false,
        speed: 25,

        // SETTINGS
        direction: 1,

        init: function( x, y, settings ) {
            this.parent( x, y, settings );

            this.addAnim( 'idle', 1, [0] );
            this.addAnim( 'move', 1, [0] );
            this.addAnim( 'fly', 1, [0] );
        },


        kill: function(){
            this.parent();
        },

        update: function() {
            this.parent();

            if(this.vel.x<0) this.flip = false;
            if(this.vel.x>0) this.flip = true;

            if(this.fly){
                // move this to main.js
                var maxX = ig.game.collisionMap.width * ig.game.collisionMap.tilesize - ig.system.width;
                this.vel.x = ( this.speed * this.direction );
                if(this.pos.x < -50 || this.pos.x > maxX+50){
                    this.kill();
                    //ig.game.spawnEntity( EntityNpc_bird, 0, 0, { start:((Math.random()*10)<5?'left':'right') });
                }
            }

            // ANIMATIONS

            if(this.vel.x !== 0 || this.vel.y !== 0){
                if(this.fly){
                    this.currentAnim = this.anims['fly'];
                }else{
                    this.currentAnim = this.anims['move'];
                }
            }else{
                this.currentAnim = this.anims['idle'];
            }

            // FLIP SPRITE
            this.currentAnim.flip.x = this.flip;
        },

    });
});