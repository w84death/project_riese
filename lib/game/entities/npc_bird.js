ig.module(
    'game.entities.npc_bird'
)
.requires(
    'game.entities.npc'
)
.defines(function(){

    EntityNpc_bird = EntityNPC.extend({


        // GFX
        animSheet: new ig.AnimationSheet( 'media/gfx/npc/bird.png', 16, 12 ),
        size: {x: 16, y:12},
        offset: {x: 0, y: 0},
        flip: false,
        fly: true,
        speed: 50,

        // SETTINGS
        gravityFactor: 0,

        init: function( x, y, settings ) {
            this.parent( x, y, settings );

            this.addAnim( 'fly', 0.1, [0,1,2,3,2,1] );

            if(Math.random()*4 < 3){
                this.pos.x = -this.size.x;
                this.direction = 1;
            }else{
                // move to main.js
                var maxX = ig.game.collisionMap.width * ig.game.collisionMap.tilesize - ig.system.width;
                this.pos.x = maxX + this.size.x;
                this.direction = -1;
            }

            this.pos.y = 4 + (Math.random()*48)<<0;
        },

        check: function(){
            this.kill();
        }
    });

});