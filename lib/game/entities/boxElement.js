ig.module(
    'game.entities.boxElement'
)
.requires(
    'game.entities.destructableElement'
)
.defines(function(){

    EntityBoxElement = EntityDestructableElement.extend({
        // GFX
        animSheet: new ig.AnimationSheet( 'media/gfx/items/box_element.png', 4, 4 ),
        size: {x: 4, y:4},
        offset: {x: 0, y: 0},

        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0,1,2,3] );
            this.currentAnim.gotoRandomFrame();
        },

        reset: function( x, y, settings ) {
            this.parent( x, y, settings );
        },

        setTrajectory: function(){
            this.vel.x = -80 + (Math.random()*160)<<0;
            this.vel.y = -200-(Math.random()*200)<<0;
        },
    });

});