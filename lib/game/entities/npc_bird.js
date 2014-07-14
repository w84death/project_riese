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
        size: {x: 9, y:30},
        offset: {x: 11, y: 1},
        flip: false,
        fly: true,

        // SETTINGS
        gravityFactor: 0,

        init: function( x, y, settings ) {
            this.parent( x, y, settings );

            this.addAnim( 'fly', 0.3, [0,1,2,3,2,1] );

            if(settings.start == 'left'){
                this.pos.x = -this.size.x;
                this.direction = 1;
            }else{
                // move to main.js
                var maxX = ig.game.collisionMap.width * ig.game.collisionMap.tilesize - ig.system.width;
                this.pos.x = maxX + this.size.x;
                this.direction = -1;
            }

            this.pos.y = (Math.random()*64)<<0;
        },
    });

});