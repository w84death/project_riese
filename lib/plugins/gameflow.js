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
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
		ig.input.bind( ig.KEY.Z, 'c' );
		ig.input.bind( ig.KEY.X, 'd' );
		ig.input.bind( ig.KEY.SPACE, 'a' );
		ig.input.bind( ig.KEY.ENTER, 'b' );

		// GAMEPAD

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
		ig.game.loadLevel( LevelMenu );
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
				ig.game.loadLevel( LevelMenu );
			}
		}

		this.STATE = newState;
	},

	startNewGame: function (params) {
		this.clearLevel();

		if(params.level == 'sandbox'){
			ig.game.loadLevel( LevelSandbox );
		}
		if(params.hero == 0){
			ig.game.spawnEntity( EntityStrongman, 100, 20);
		}
		if(params.hero == 1){
        	ig.game.spawnEntity( EntityCthulhu, 100, 20);
        }
	},

	clearLevel: function(){
		// reset all settings
		// clear entities/particles
		return true;
	},
});
});