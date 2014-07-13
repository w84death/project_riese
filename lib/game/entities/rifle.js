ig.module(
    'game.entities.rifle'
)
.requires(
    'game.entities.weapon'
)
.defines(function(){

    EntityRifle = EntityWeapon.extend({

        animSheet: new ig.AnimationSheet( 'media/gfx/weapons/rifle.png', 32, 16 ),
        size: {x: 18, y:5},
        offset: {x: 7, y: 6 },
        power: 50,
        ammoType: 1,

        init: function( x, y, settings ) {
            this.parent( x, y, settings );

            this.addAnim( 'idle', 1, [0] );
            this.addAnim( 'run', 1, [0] );
            this.addAnim( 'fire', 0.05, [1,2,3] )

            if(settings.ammo) this.ammo = settings.ammo;
        },
    });

});