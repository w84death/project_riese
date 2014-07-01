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
	'impact.game',
	'impact.font'
)
.defines(function(){

MyGame = ig.Game.extend({

	// VERSION
	// ------------------------------------------------------------------------


			version: 		'Version 0.00 pre-alpha',


	// ------------------------------------------------------------------------

	// GFX
	font: new ig.Font( 'media/04b03.font.png' ),

	// ...

	init: function() {
		// Initialize your game here; bind keys etc.
	},

	update: function() {
		// Update all entities and backgroundMaps
		this.parent();

		// Add your own, additional update code here
	},

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();


		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;

		this.font.draw(
			'PROJECT RIESE\n'+
			this.version,
			x, y, ig.Font.ALIGN.CENTER
		);
	}
});

// OUYA resolution (720p)

var w = 320,
	h = 180,
	z = 4,
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
