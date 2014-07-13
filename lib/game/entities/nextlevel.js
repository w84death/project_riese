ig.module(
    'game.entities.nextlevel'
)
.requires(
    'impact.entity'
)
.defines(function(){

    EntityNextlevel = ig.Entity.extend({

        animSheet: new ig.AnimationSheet( 'media/gfx/triggers/next_level.png', 32, 32 ),
        size: {x: 23, y: 5},
        offset: {x: 4, y: 23},

    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
    	collides: ig.Entity.COLLIDES.NONE,
        maxVel: {x: 0, y: 0},
        gravityFactor: 0,

        level: false,
        active: false,

    	init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 0.2, [12,13,14] );
            this.addAnim('active',0.1, [0,1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1])
            this.active = settings.active;
            this.level = settings.level;

            if(this.active) this.currentAnim = this.anims['active'];
    	},

        check: function( other ) {
            if(this.active){
                ig.game.flow.nextLevel({level:this.level});
            }else{
                // draw message that teleporter is inactive
            }
        },

        update: function () {
            this.parent();
            if(this.active){
                this.currentAnim = this.anims['active'];
            }else{
                this.currentAnim = this.anims['idle'];
            }
        }

    });


});