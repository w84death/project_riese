ig.module(
    'game.entities.destructableElement'
)
.requires(
   // 'impact.entity-pool',
    'impact.entity'
)
.defines(function(){

    EntityDestructableElement = ig.Entity.extend({

        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        friction: {x:100,y:100},
        maxVel: {x: 1000, y: 1000},
        zIndex: 0,
        timer: new ig.Timer(),
        life: 60,

        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.life = ig.game.settings.particlesLife;
            this.addAnim( 'idle', 1, [0] );
            this.currentAnim = this.anims.idle;
            this.timer.set(this.life);
            this.setTrajectory();
        },

        reset: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.life = ig.game.settings.particlesLife;
            this.timer.set(this.life);
            this.setTrajectory();
        },

        setTrajectory: function(){
            this.vel.x = -20 + (Math.random()*40)<<0;
            this.vel.y = -100-(Math.random()*150)<<0;
        },

        update: function() {
            if(ig.game.flow.STATE !== 'game'){
                return false;
            }

            if(this.timer.delta() > 0){
                this.kill();
            }
            this.parent();
        }
    });

    //ig.EntityPool.enableFor( EntityDestructableElement );
});