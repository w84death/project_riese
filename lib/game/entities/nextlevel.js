ig.module(
    'game.entities.nextlevel'
)
.requires(
    'impact.entity'
)
.defines(function(){

    EntityNextlevel = ig.Entity.extend({

        animSheet: new ig.AnimationSheet( 'media/gfx/triggers/bunker_enter.png', 48, 48 ),
        size: {x: 38, y: 40},
        offset: {x: 3, y: 6},

    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
    	collides: ig.Entity.COLLIDES.NONE,
        maxVel: {x: 0, y: 0},
        gravityFactor: 0,

        level: false,
        open: false,
        opening: false,
        notDestructable: true,
        timer: new ig.Timer(),

    	init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'closed', 1, [0] );
            this.addAnim('opening',0.5, [0,1,2,3,4,5]);
            this.addAnim('open',0.3, [5,6,7])
            this.open = settings.open;
            this.level = settings.level;

            if(this.open){
                this.currentAnim = this.anims['open'];
            }else{
                this.currentAnim = this.anims['closed'];
            }
    	},

        check: function( other ) {
            if(this.open && this.timer.delta() > 0){
                ig.game.flow.nextLevel({level:this.level});
            }

            if(!this.open && !this.opening){
                this.opening = true;
                this.currentAnim = this.anims['opening'];
                this.currentAnim.rewind();
                this.timer.set(2);
            }
        },

        update: function () {
            this.parent();
            if(!this.open && this.opening){
                if(this.currentAnim.loopCount > 0){
                    this.opening = false;
                    this.open = true;
                    this.currentAnim = this.anims['open'];
                }
            }
        }

    });


});