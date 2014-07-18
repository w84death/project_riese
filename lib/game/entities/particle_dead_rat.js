
ig.module(
    'game.entities.particle_dead_rat'
)
.requires(
    'game.entities.particle'
)
.defines(function(){

    EntityParticle_dead_rat = EntityParticle.extend({

        animSheet: new ig.AnimationSheet( 'media/gfx/npc/jump_rat.png', 32, 32 ),
        size: {x: 16, y:13},
        offset: {x: 6, y: 19},
        lifetime:60,
        zIndex: 1,

        //sSplash:  new ig.Sound( 'media/sounds/splash.*' ),

        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', this.lifetime, [24,25,26] );
            this.currentAnim = this.anims['idle'];
            this.currentAnim.gotoRandomFrame();
        },

        reset: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.currentAnim.gotoRandomFrame();
        },

        update: function(){
            this.parent();
        },

    });

});