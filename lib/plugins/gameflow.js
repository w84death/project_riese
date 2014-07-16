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

	GAME FLOW
	Everything for managing the game state machine

----------------------------------------------------------------------------
*/
ig.module(
	'plugins.gameflow'
)
.requires(
	'impact.game'
)
.defines(function(){

ig.GameFlow = ig.Class.extend({

	STATE: 'intro',

	init: function(){
		console.log('\n\nWelcom to the Project Riese ['+ig.game.version+']\n\nSource code: https://github.com/w84death/project_riese/\n\n--- \n(c)2014 P1X\n');

		// KEYS

		ig.input.bind( ig.KEY.J, 'start' );
		ig.input.bind( ig.KEY.F, 'select' );
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
		ig.input.bind( ig.KEY.Z, 'x' );
		ig.input.bind( ig.KEY.X, 'y' );
		ig.input.bind( ig.KEY.SPACE, 'a' );
		ig.input.bind( ig.KEY.ENTER, 'b' );

		// GAMEPAD

		ig.input.bind( ig.GAMEPAD.START, 'start');
		ig.input.bind( ig.GAMEPAD.SELECT, 'select');
		ig.input.bind( ig.GAMEPAD.PAD_LEFT, 'left');
		ig.input.bind( ig.GAMEPAD.PAD_RIGHT, 'right');
		ig.input.bind( ig.GAMEPAD.PAD_TOP, 'up');
		ig.input.bind( ig.GAMEPAD.PAD_BOTTOM, 'down');
		ig.input.bind( ig.GAMEPAD.FACE_1, 'a');
		ig.input.bind( ig.GAMEPAD.FACE_2, 'b');
		ig.input.bind( ig.GAMEPAD.FACE_3, 'c');
		ig.input.bind( ig.GAMEPAD.FACE_4, 'd');

		/*
		// MUSIC LIST
		ig.music.add( 'media/music/menu.*', 'menu' );
		//ig.music.add( 'media/music/game.*', 'game' );
		ig.music.volume = 0.7;
		ig.music.loop = true;
		*/

        // LOAD MENU && SOUND
		if(ig.game.sound) ig.music.play('menu');
		//ig.game.loadLevel( LevelMenu );

        ig.game.director.firstLevel();
	},

	goToState: function(newState){
		var menus = ig.game.menu.menus[this.STATE];

		if(this.STATE == 'intro'){
			if(newState == 'menu'){
				// just change state
			}
		}

		if(this.STATE == 'menu'){
			if(newState == 'choose_hero'){
				// just change state
			}
			if(newState == 'credits'){
				// just change state
			}
			menus.position = 0;
		}

		if(this.STATE == 'choose_hero'){
			if(newState == 'game'){
				this.startNewGame({
					level: 'sandbox',
					hero: menus.position
				});
			}
			menus.position = 0;
		}

		if(this.STATE == 'game'){
			if(newState == 'game_menu'){
				// just change state
			}
		}

		if(this.STATE == 'game_menu'){
			menus.position = 0;
			if(newState == 'menu'){
				ig.game.director.firstLevel();
			}
		}

		this.STATE = newState;
	},

	startNewGame: function (params) {
		// for player 1 (kbrd+gamepad)
		if(params.level == 'sandbox'){
			ig.game.director.jumpTo(LevelSandbox);
		}

		this.spawnPlayer({
        	hero: params.hero,
        	x: (ig.system.width*0.5) + ig.game.screen.x,
        	y: 0
        });
	},

	nextLevel: function(params){
		// jump to next level (or specific params.level)
		// if player have smth in hand
		// spawn and give the same to player in next level
 		//
 		// !!! this need refactoring and merge with startGame
 		// just proof-of-concept aka mockap for alpha !!!
 		var inHand,item = null, ammo = 0,hero = 0,
 			players = ig.game.getEntitiesByType( EntityPlayer );

 		hero = players[0].hero;
		inHand = players[0].inHand;
		if(inHand) ammo = inHand.ammo;

		this.clearLevel();

		if(params.level){
            ig.game.director.jumpTo(ig.game.director.levels[params.level]);
        }else{
            ig.game.director.nextLevel();
        }

        ig.game.timer.set(0);
        // spawn player and item

        if(inHand){
 			ig.game.spawnEntity( EntityRifle,100,20,{ammo:ammo});
 		}

 		this.spawnPlayer({
        	hero: params.hero,
        	x: (ig.system.width*0.5) + ig.game.screen.x,
        	y: 0
        });
	},

	restartLevel: function(params){
		// jump to next level (or specific params.level)
		// if player have smth in hand
		// spawn and give the same to player in next level
 		//
 		// !!! this need refactoring and merge with startGame
 		// just proof-of-concept aka mockap for alpha !!!

		this.clearLevel();
	    ig.game.director.reloadLevel();
        ig.game.timer.set(0);

        this.spawnPlayer({
        	hero: params.hero,
        	x: (ig.system.width*0.5) + ig.game.screen.x,
        	y: 0
        });


	},

	clearLevel: function(){
		// reset all settings
		// clear entities/particles
		ig.game.camera.center();
		return true;
	},

	spawnPlayer: function (params) {
		// spawn player and item
 		var buttons = {
				start: 'start',
				select: 'select',
				left: 'left',
				right: 'right',
				up: 'up',
				down: 'down',
				a: 'a',
				b: 'b',
				x: 'x',
				y: 'y'
			}

		if(params.hero === 0){
			ig.game.spawnEntity( EntityStrongman, params.x, params.y, { buttons: buttons, hero:params.hero });
		}
		if(params.hero === 1){
        	ig.game.spawnEntity( EntityCthulhu, params.x, params.y, { buttons: buttons, hero:params.hero });
        }
	}
});
});