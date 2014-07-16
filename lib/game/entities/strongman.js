ig.module(
    'game.entities.strongman'
)
.requires(
    'game.entities.player'
)
.defines(function(){

    EntityStrongman = EntityPlayer.extend({

        //animSheet: new ig.AnimationSheet( 'media/player/strongman.png', 32, 32 ),
        size: {x: 9, y:32},
        offset: {x: 11,y:0},
        offsetSettings: {
            normal: 13,
            flipped: 11
        },
        weaponPosition: {
            x: -8,
            y: 14
        },

        init: function( x, y, settings ) {
            this.parent( x, y, settings );
        },
    });

});