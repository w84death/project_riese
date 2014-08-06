ig.module(
    'game.entities.destructable'
)
.requires(
    'impact.entity'
)
.defines(function(){

    EntityDestructable = ig.Entity.extend({

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.FIXED,
        friction: {x:100,y:100},

        afterDestruct: {
            spawn: 4,
            entity: 'EntityDestructableElement'
        },

        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
            this.currentAnim.gotoRandomFrame();
            this.afterDestruct.spawn = ig.game.settings? ig.game.settings.boxParticles : 4;
        },

        kill: function(){
            // spawn big bum! particle
            if((ig.game.getEntitiesByType( EntityParticle ).length + ig.game.getEntitiesByType( this.afterDestruct.entity ).length) < ig.game.settings.particlesOnScreen){
                for (var i = 0; i < this.afterDestruct.spawn; i++) {
                    ig.game.spawnEntity( this.afterDestruct.entity, this.pos.x+(this.size.x*0.5), this.pos.y-(this.size.y*0.5) );
                }
                ig.game.sortEntitiesDeferred();
            }
            this.parent();
        },

        update: function() {
            if(ig.game.flow.STATE !== 'game'){
                return false;
            }
            this.parent();
        }
    });

});