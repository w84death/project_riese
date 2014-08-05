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
	'plugins.director',
	'plugins.gamepad',
	'plugins.touch-button',
	'plugins.gameflow',
	'plugins.gui',
	'plugins.menu',
	'plugins.camera',
	'plugins.scripter',
	'plugins.particles',

	// LEVELS
	'game.levels.menu',
	'game.levels.sandbox',
	'game.levels.sandbox2',
	'game.levels.e1m1',

	// ITEMS
	'game.entities.weapon',
	'game.entities.bullet',
	'game.entities.ammo',
	'game.entities.rifle',
	'game.entities.destructable',
	'game.entities.destructableElement',
	'game.entities.box',
	'game.entities.boxElement',
	'game.entities.particle',
	'game.entities.particle_blood',
	'game.entities.particle_dead_rat',

	// ENTITIES
	'game.entities.player',
	'game.entities.strongman',
	'game.entities.cthulhu',
	'game.entities.npc',
	'game.entities.npc_bird',
	'game.entities.npc_rat'
)
.defines(function(){

MyGame = ig.Game.extend({

	// VERSION
	// ------------------------------------------------------------------------


			version: 		'0.08a',


	// ------------------------------------------------------------------------

	// SETTINGS
	ouya: 		true,
	sound: 		false,
	gravity: 	800,
	enableShake: true,
	timer: 		new ig.Timer(),

	// PLAYERS
	players: [
		{
			entitie: null,
			start: 	false,
			hero: 	0,
			score: 	0
		},
		{
			entitie: null,
			start: 	false,
			hero: 	1,
			score:  0
		}
	],

	// SETTINGS
	settings: {
		shake: true,
		particlesLife: 60,
		deadBodyLife: 60,
		particlesOnScreen: 512,
		boxParticles: 4,
		playerBlood: 5,
		npcBlood: 10,
	},

	// SETUP FOR GAMEPLAY
	setup: {
		players: 1,
		map: 'menu'
	},

	init: function() {
		// MOBILE
		if( ig.ua.mobile && !this.settings.ouya) {
			this.settings.particlesLife = 5;
			this.settings.deadBodyLife = 3;
			this.settings.particlesOnScreen = 20;
			this.settings.boxParticles = 2;
			this.settings.playerBlood = 3;
			this.settings.npcBlood = 4;
		}

		// PLUGINS
		this.director = new ig.Director(this,
			[LevelMenu, LevelE1m1, LevelSandbox, LevelSandbox2 ]
		);
		this.gui = new ig.GUI();
		this.flow = new ig.GameFlow();
		this.menu = new ig.Menu();
		this.camera = new ig.Camera();
		this.scripter = new ig.Scripter();
		this.particles = new ig.Particles();


	},

	pause: function(){
		if(this.flow.STATE == 'game'){
			this.flow.STATE = 'pause';
			return true;
		}
		if(this.flow.STATE == 'pause'){
			this.flow.STATE = 'game';
			return false;
		}
	},

	mapMax: function(){
		var maxX = ig.game.collisionMap.width * ig.game.collisionMap.tilesize;
			maxY = ig.game.collisionMap.height * ig.game.collisionMap.tilesize;
		return {
			width: maxX,
			height: maxY
		}
	},

	update: function() {
		this.parent();
		this.menu.update();
		if(this.flow.STATE == 'game'){
			this.camera.update();
			this.scripter.update();
		}
		if(this.flow.STATE == 'intro' || this.flow.STATE == 'credits' || this.flow.STATE == 'menu' || this.flow.STATE == 'choose_hero' || this.flow.STATE == 'choose_map'){
			this.camera.panning();
		}

		if( ig.input.released('pause') ) {
			this.pause();
		}
	},

	draw: function() {
		this.parent();
		this.gui.draw();
	}
});

// OUYA resolution (720p)
var w = 320,
	h = 180,
	z = 3, // pixels zoom
	fps = 60;

	if( ig.ua.mobile ) {
		// mobiles do not like sound
		ig.Sound.enabled = false;
		//z = 2;
		fps = 24;
	}
	ig.Sound.channels = 16;

	var c = document.createElement('canvas');
  	c.id = 'canvas';
  	document.body.appendChild(c);

	ig.main( '#canvas', MyGame, fps, w, h, z);

});
