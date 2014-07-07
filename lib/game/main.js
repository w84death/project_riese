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
	'plugins.menu',

	// LEVELS
	'game.levels.menu',
	'game.levels.sandbox',

	// ENTITIES
	'game.entities.player',
	'game.entities.strongman',
	'game.entities.cthulhu'
)
.defines(function(){

MyGame = ig.Game.extend({

	// VERSION
	// ------------------------------------------------------------------------


			version: 		'Version 0.02 pre-alpha',


	// ------------------------------------------------------------------------

	// SETTINGS
	sound: 		false,
	gravity: 	800,
	timer: 		new ig.Timer(),

	// PLAYERS
	player: [
		{
			start: 	false,
			hero: 	0,
			score: 	0
		},
		{
			start: 	false,
			hero: 	1,
			score:  0
		}
	],

	// ...

	init: function() {
		// PLUGINS
		this.flow = new ig.GameFlow();
		this.gui = new ig.GUI();
		this.menu = new ig.Menu();
	},

	update: function() {
		this.parent();
		this.menu.update();
	},

	draw: function() {
		this.parent();
		this.gui.draw();
	}
});

// OUYA resolution (720p)
var w = 320,
	h = 180,
	z = 2, // pixels zoom
	fps = 30;

	if( ig.ua.mobile ) {
		// mobiles do not like sound
		ig.Sound.enabled = false;
	}
	ig.Sound.channels = 16;

	var c = document.createElement('canvas');
  	c.id = 'canvas';
  	document.body.appendChild(c);

	ig.main( '#canvas', MyGame, fps, w, h, z);

});
