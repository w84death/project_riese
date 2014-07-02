/*
----------------------------------------------------------------------------

    P1X Team
    Project Riese (codename)

    abstract: Game for TheJam.pl
    created: 01-07-2014
    license: do what you want and dont bother me

    webpage: http://p1x.in
    twitter: @w84death

----------------------------------------------------------------------------
*/
ig.module(
	'game.main'
)
.requires(
	//'impact.debug.debug',
	'impact.game',
	'impact.font',

	// PLUGINS
	'plugins.gamepad',
	'plugins.gameflow',
	'plugins.gui',

	// LEVELS
	'game.levels.sandbox',

	// ENTITIES
	'game.entities.player',
	'game.entities.strongman'
)
.defines(function(){

MyGame = ig.Game.extend({

	// VERSION
	// ------------------------------------------------------------------------


			version: 		'Version 0.00 pre-alpha',


	// ------------------------------------------------------------------------

	// SETTINGS
	sound: true,
	gravity: 800,
	timer: new ig.Timer(),

	// PLAYERS
	players: [],

	// GFX
	font: new ig.Font( 'media/04b03.font.png' ),

	// ...

	init: function() {

		// PLUGINS
		this.flow = new ig.GameFlow();
		this.gui = new ig.GUI();
	},

	update: function() {
		this.parent();
		if(this.flow.STATE == 'intro'){
			if(ig.input.pressed('a') || ig.input.pressed('b')){
				this.flow.goToState('sandbox');
			}
		}
	},

	draw: function() {
		this.parent();

		if(this.flow.STATE == 'intro'){
			this.font.draw(
				'PROJECT RIESE\n'+
				this.version,
				this.gui.center.x, this.gui.center.y,
				ig.Font.ALIGN.CENTER
			);

			if((this.timer.delta()<<0) % 2 == 0){
				this.font.draw(
					'PRESS A BUTTON OR ENTER',
					this.gui.bottom.x, this.gui.bottom.y,
					ig.Font.ALIGN.CENTER
				);
			}
		}
	}
});

// OUYA resolution (720p)

var w = 320,
	h = 180,
	z = 2,
	fps = 60;

	if( ig.ua.mobile ) {
		ig.Sound.enabled = false;
	}
	ig.Sound.channels = 16;

	var c = document.createElement('canvas');
  	c.id = 'canvas';
  	document.body.appendChild(c);

	ig.main( '#canvas', MyGame, fps, w, h, z);

});
