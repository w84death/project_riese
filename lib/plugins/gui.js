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
    'plugins.gui'
)
.requires(
    'impact.game'
)
.defines(function(){

ig.GUI = ig.Class.extend({

    fontWhite:      new ig.Font( 'media/gfx/fonts/white.png' ),
    fontColor:      new ig.Font( 'media/gfx/fonts/color.png' ),
    logoImage:      new ig.Image( 'media/gfx/logo.png' ),
    timer:          new ig.Timer(),

    init: function(){
        this.top = {
            x: ig.system.width * 0.5,
            y: 32
        };

        this.center = {
            x: ig.system.width * 0.5,
            y: ig.system.height * 0.5
        };

        this.bottom = {
            x: ig.system.width * 0.5,
            y: ig.system.height - 32
        };

        this.menu = {
            x: ig.system.width * 0.5,
            y: ( ig.system.height * 0.5 ) - 16
        };

        this.fontWhite.letterSpacing = -1;
        this.fontWhite.lineSpacing = -2;
        this.fontColor.letterSpacing = -1;
        this.fontColor.lineSpacing = -2;
    },

    draw: function(){
        var STATE = ig.game.flow.STATE,
            menus = ig.game.menu.menus;

        if(STATE == 'intro'){

            this.logoImage.draw(0,this.top.y);

            if((this.timer.delta()<<0) % 2 == 0){
                this.fontColor.draw(
                    'PRESS START (A/ENTER)',
                    this.menu.x, this.menu.y,
                    ig.Font.ALIGN.CENTER
                );
            }

            this.fontWhite.draw(
                ig.game.version,
                this.bottom.x, this.bottom.y,
                ig.Font.ALIGN.CENTER
            );
        }

        if(STATE == 'credits'){
            this.fontWhite.draw(
                'PROJECT RIESE\n'+
                'A GAME BY P1X\n'+
                '\nTEAM:\n'+
                'Krzysztof Jankowski - code, gfx, sfx\n'+
                'Krzysztof T - code, gfx\n'+
                'Wojtek - code\n'+
                'Pawel - code, gfx, sfx\n'+
                '\nLINKS:\n'+
                'https://github.com/w84death/project_riese/\n'+
                'http://p1x.in',
                this.top.x, this.top.y,
                ig.Font.ALIGN.CENTER
            );

            this.fontColor.draw(
                'BACK TO MENU',
                this.bottom.x, this.bottom.y,
                ig.Font.ALIGN.CENTER
            );

        }

        if(STATE == 'menu'){
            this.fontWhite.draw('- MAIN MENU -', this.top.x, this.top.y, ig.Font.ALIGN.CENTER );

            if(menus[STATE].position == 0){
                this.fontColor.draw('ENTER SANDBOX', this.menu.x, this.menu.y+12, ig.Font.ALIGN.CENTER );
            }else{
                this.fontWhite.draw('ENTER SANDBOX', this.menu.x, this.menu.y+12, ig.Font.ALIGN.CENTER );
            }

            if(menus[STATE].position == 1){
                this.fontColor.draw('CREDITS', this.menu.x, this.menu.y+24, ig.Font.ALIGN.CENTER );
            }else{
                this.fontWhite.draw('CREDITS', this.menu.x, this.menu.y+24, ig.Font.ALIGN.CENTER );
            }
        }

        if(STATE == 'choose_hero'){
           this.fontWhite.draw('- CHOOSE HERO -', this.top.x, this.top.y, ig.Font.ALIGN.CENTER );

           if(menus[STATE].position == 0){
                this.fontColor.draw('STRONG MAN', this.menu.x, this.menu.y+12, ig.Font.ALIGN.CENTER );
            }else{
                this.fontWhite.draw('STRONG MAN', this.menu.x, this.menu.y+12, ig.Font.ALIGN.CENTER );
            }

            if(menus[STATE].position == 1){
                this.fontColor.draw('MC CTHULHU', this.menu.x, this.menu.y+24, ig.Font.ALIGN.CENTER );
            }else{
                this.fontWhite.draw('MC CTHULHU', this.menu.x, this.menu.y+24, ig.Font.ALIGN.CENTER );
            }

            if(menus[STATE].position == 2){
                this.fontColor.draw('BACK TO MENU', this.menu.x, this.bottom.y, ig.Font.ALIGN.CENTER );
            }else{
                this.fontWhite.draw('BACK TO MENU', this.menu.x, this.bottom.y, ig.Font.ALIGN.CENTER );
            }
        }

        if(STATE == 'game_menu'){
            this.fontWhite.draw('- GAME MENU -', this.top.x, this.top.y, ig.Font.ALIGN.CENTER );

            if(menus[STATE].position == 0){
                this.fontColor.draw('RETURN TO GAME', this.menu.x, this.menu.y+12, ig.Font.ALIGN.CENTER );
            }else{
                this.fontWhite.draw('RETURN TO GAME', this.menu.x, this.menu.y+12, ig.Font.ALIGN.CENTER );
            }

            if(menus[STATE].position == 1){
                this.fontColor.draw('LOAD LEVEL', this.menu.x, this.menu.y+24, ig.Font.ALIGN.CENTER );
            }else{
                this.fontWhite.draw('LOAD LEVEL', this.menu.x, this.menu.y+24, ig.Font.ALIGN.CENTER );
            }

            if(menus[STATE].position == 2){
                this.fontColor.draw('QUIT TO MENU', this.menu.x, this.bottom.y, ig.Font.ALIGN.CENTER );
            }else{
                this.fontWhite.draw('QUIT TO MENU', this.menu.x, this.bottom.y, ig.Font.ALIGN.CENTER );
            }
        }

        this.fontWhite.draw(
            ig.game.version,
            4, 4,
            ig.Font.ALIGN.LEFT
        );
    }

});
});