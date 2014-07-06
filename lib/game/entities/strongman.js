ig.module(
    'game.entities.strongman'
)
.requires(
    'game.entities.player'
)
.defines(function(){

    EntityStrongman = EntityPlayer.extend({

        //animSheet: new ig.AnimationSheet( 'media/player/strongman.png', 32, 32 ),
        button_left: 'left',
        button_right: 'right',
        button_a: 'a',
        button_b: 'b',

        init: function( x, y, settings ) {
            this.parent( x, y, settings );
        },
    });

});