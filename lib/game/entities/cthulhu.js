ig.module(
    'game.entities.cthulhu'
)
.requires(
    'game.entities.player'
)
.defines(function(){

    EntityCthulhu = EntityPlayer.extend({

        animSheet: new ig.AnimationSheet( 'media/gfx/players/cthulhu.png', 32, 32 ),
        button_left: 'left',
        button_right: 'right',
        button_a: 'a',
        button_b: 'b',

        init: function( x, y, settings ) {
            this.parent( x, y, settings );

            this.addAnim( 'move', 0.1, [0,1,2,3,4,5,6,7] );
            this.addAnim( 'idle', 0.4, [8,9,10,11,12,13,14,15] );
            this.addAnim( 'jump', 0.1, [16] );
        }
    });

});