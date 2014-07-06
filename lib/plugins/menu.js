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
    'plugins.menu'
)
.requires(
    'impact.game'
)
.defines(function(){

ig.Menu = ig.Class.extend({

    menus: {
		'menu': {
			position: 		0,
			positions: 		2
		},
		'choose_hero':{
			position: 		0,
			positions: 		3
		},		
		'game_menu': {
			position: 		0,
			positions: 		3
		},
		'game_over': {
			position: 		0,
			positions: 		2
		}		
	},

    init: function(){
    	// nothing to do here :P
    },

	moveCursor: function(params){
		// just move cursor up or down
		var STATE = ig.game.flow.STATE;

		//if(this.sound) this.sMenu.play();
		if(params.up){
			this.menus[STATE].position -= 1;
			if(this.menus[STATE].position < 0){
				this.menus[STATE].position = this.menus[STATE].positions-1;
			}
		}
		if(params.down){
			this.menus[STATE].position += 1;
			if(this.menus[STATE].position > this.menus[STATE].positions-1){
				this.menus[STATE].position = 0;
			}
		}
	},

	update: function(){
		var STATE = ig.game.flow.STATE,
			flow = ig.game.flow;
		
		// all menus
		if(STATE !== 'game'){			
			// up/down buttons move "cursor"
			if(ig.input.released('up')){
				this.moveCursor({up:true});
			}
			if(ig.input.released('down')){
				this.moveCursor({down:true});
			}
		
			// enter selected menu
			if(ig.input.released('a') || ig.input.released('b')){
				
				// CHOOSE HERO
				if(STATE == 'choose_hero') {
					if(this.menus['choose_hero'].position === 0){
						flow.goToState('game');
					}
					if(this.menus['choose_hero'].position === 1){
						flow.goToState('game');
					}
					if(this.menus['choose_hero'].position === 2){
						flow.goToState('menu');
					}
					return true;
				}

				if(STATE == 'credits') {										
					flow.goToState('menu');					
					return true;
				}

				// MENU
				if(STATE == 'menu') {					
					if(this.menus['menu'].position === 0){
						flow.goToState('choose_hero');
					}
					if(this.menus['menu'].position === 1){
						flow.goToState('credits');
					}
					return true;
				}

				// IN-GAME MENU
				if(STATE == 'game_menu') {
					if(this.menus['game_menu'].position === 0){
						flow.goToState('game');
					}
					if(this.menus['game_menu'].position === 1){
						// do nothing right now
					}
					if(this.menus['game_menu'].position === 2){
						flow.goToState('menu');
					}
				}				
				
				// intro.. just wait for start
				if(STATE == 'intro'){				
					flow.goToState('menu');				
				}
			}
						
		}

		// IN GAME
		if(STATE == 'game'){				
			if(ig.input.released('b')){
				flow.goToState('game_menu');
			}		
		}
	},

});
});