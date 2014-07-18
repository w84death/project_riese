ig.module(
    'game.entities.npc_rat'
)
.requires(
    'game.entities.npc'
)
.defines(function(){

    EntityNpc_rat = EntityNPC.extend({


        // GFX
        animSheet: new ig.AnimationSheet( 'media/gfx/npc/jump_rat.png', 32, 32 ),
        size: {x: 16, y:13},
        offset: {x: 6, y: 19},
        flip: false,

        // SETTINGS
        speed: 80,

        init: function( x, y, settings ) {
            this.parent( x, y, settings );

            this.addAnim( 'idle', 0.1, [0] );
            this.addAnim( 'move', 0.1, [0,1,2,3,4,5,6,7] );
            this.addAnim( 'attack', 0.1, [8,9,10,11] );

        },

    });

});