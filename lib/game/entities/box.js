ig.module(
    'game.entities.box'
)
.requires(
    'game.entities.destructable'
)
.defines(function(){

    EntityBox = EntityDestructable.extend({

        // GFX
        animSheet: new ig.AnimationSheet( 'media/gfx/items/box.png', 16, 16 ),
        size: {x: 16, y:16},
        offset: {x: 0, y: 0},

        // SETTINGS
        gravityFactor: 1,
        afterDestruct: {
            spawn: 8,
            entity: 'EntityBoxElement'
        }

    });

});