ig.module(
    'game.entities.strongman'
)
.requires(
    'game.entities.player'
)
.defines(function(){

    EntityStrongman = EntityPlayer.extend({

        //animSheet: new ig.AnimationSheet( 'media/player/strongman.png', 32, 32 ),

        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.weaponPosition = {
                x: 1,
                y: 12
            };
        },
    });

});