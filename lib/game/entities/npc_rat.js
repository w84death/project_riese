ig.module(
    'game.entities.npc_rat'
)
.requires(
    'game.entities.npc'
)
.defines(function(){

    EntityNpc_rat = EntityNpc.extend({


        // GFX
        animSheet: new ig.AnimationSheet( 'media/gfx/npc/jump_rat.png', 32, 32 ),
        size: {x: 16, y:13},
        offset: {x: 6, y: 19},
        flip: false,

        // SETTINGS
        speed: 50,
        attack: 1,
        deadEntity: 'EntityParticle_dead_rat',

        init: function( x, y, settings ) {
            this.parent( x, y, settings );

            this.addAnim( 'idle', 0.1, [0] );
            this.addAnim( 'move', 0.1, [0,1,2,3,4,5,6,7] );
            this.addAnim( 'attack', 0.1, [16,17,18,19,20,21] );

            this.speed += -15 + ((Math.random()*25)<<0);

        },

    });

});