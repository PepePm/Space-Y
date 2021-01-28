
class ScenePause extends Phaser.Scene {

    constructor() {

        super("ScenePause");
    }

    preload(){
        
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        }); 
    }

    create() {

        this.fondo = this.add.rectangle(game.config.width/2, game.config.height/2, game.config.width, game.config.height, Phaser.Display.Color.GetColor(0, 0, 0)).setAlpha(0.5);

        //Opciones
        this.BtnBackToGame = this.add.text(-game.config.width/2, 2*game.config.height/7, "RESUME",{fontSize:'60px',fill:'#ffffff',fontFamily:'menuFont',fontSize:'60px'})
        .setDepth(6).setOrigin(0.5);
        this.BtnOptions = this.add.text(-game.config.width/2, 3*game.config.height/7, "OPTIONS",{fontSize:'60px',fill:'#ffffff',fontFamily:'menuFont',fontSize:'60px'})
        .setDepth(6).setOrigin(0.5);
        this.BtnBackToMenu = this.add.text(-game.config.width/2, 4*game.config.height/7, "EXIT",{fontSize:'60px',fill:'#ffffff',fontFamily:'menuFont',fontSize:'60px'})
        .setDepth(6).setOrigin(0.5);

        this.menuBase = this.add.image(-game.config.width/2, game.config.height/2, "radio");
        this.menuBaseTweenIN = this.tweens.add({
            targets: [this.menuBase,this.BtnBackToGame, this.BtnOptions, this.BtnBackToMenu],
            x:game.config.width/2,
            duration: 1500,
            ease: 'Cubic.easeOut',
            repeat: 0,
            yoyo: false,
            delay: 0,

            onComplete: this.ShowMenu.bind(this)
        });


        //Options
        var txt1 = (soundtrack == undefined) ? '0' : soundtrack.volume;
        var txt2 = (sfx == undefined) ? '0' : sfx.volume;
        var print0 = this.add.text(game.config.width/2 + 200, (game.config.height/8)*3 + 32, txt1).setVisible(false); //porcentaje musica
        var print1 = this.add.text(game.config.width/2 + 200, (game.config.height/8)*4 + 32, txt2).setVisible(false);//porcentaje sfx

        sliderMusic = this.rexUI.add.slider({
            x: game.config.width/2,
            y: (game.config.height/7)*2 + 40,
            width: 300,
            height: 20,
            orientation: 'x',
            value: (soundtrack ==undefined) ? '0' : soundtrack.volume,

            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, COLOR_DARK),
            indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),

            valuechangeCallback: function (value) {
                print0.text = Math.ceil(value*100);
                //if(musica!=undefined)
                    soundtrack.volume = value;
                    soundtrack.pistas.forEach(element =>{
                        element.volume = soundtrack.volume;
                    });
                    soundtrack.pistas[0].volume = soundtrack.volume * 0.2;
            },
            space: {
                top: 4,
                bottom: 4
            },
            input: 'click', // 'drag'|'click'
        })
            .layout().setVisible(false);

        //Slider SFX
        //if(sliderSfx == undefined)
        sliderSfx = this.rexUI.add.slider({
            x: game.config.width/2,
            y: (game.config.height/7)*3 + 40,
            width: 300,
            height: 20,
            orientation: 'x',
            value: (sfx ==undefined) ? '0' : sfx.volume,

            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, COLOR_DARK),
            indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),

            valuechangeCallback: function (value) {
                print1.text = Math.ceil(value*100);
                //if(sfx!=undefined)
                //{
                    sfx.volume = value;
                    sfx.sounds.forEach(element => {
                        element.volume = sfx.volume;
                    });
                //}
            },
            space: {
                top: 4,
                bottom: 4
            },
            input: 'click', // 'drag'|'click'
        })
            .layout().setVisible(false);;


        this.volumeButton = this.add.text(game.config.width/2, 2*game.config.height/7, 'Music volume', { fill: '#ffffff',fontFamily:'menuFont',fontSize:'60px' })
        .setInteractive()
        .on('pointerdown', () => this.switchMusic() )
        .on('pointerup', () => this.Highlight(this.volumeButton, true) )
        .on('pointerover', () => this.Over(this.volumeButton, true) )
        .on('pointerout', () => this.Highlight(this.volumeButton, false) );
        this.volumeButton.setOrigin(0.5).setVisible(false);

        this.sfxButton = this.add.text(game.config.width/2, 3*game.config.height/7, 'SFX volume', { fill: '#ffffff',fontFamily:'menuFont',fontSize:'60px' })
        .setInteractive()
        .on('pointerdown', () => this.switchSfx() )
        .on('pointerup', () => this.Highlight(this.sfxButton, true) )
        .on('pointerover', () => this.Over(this.sfxButton, true) )
        .on('pointerout', () => this.Highlight(this.sfxButton, false) );
        this.sfxButton.setOrigin(0.5).setVisible(false);

        this.OptionsOutBtn = this.add.text(game.config.width/2, 2*game.config.height/3, 'Back', { fill: '#ffffff',fontFamily:'menuFont',fontSize:'50px' })
        .setVisible(false).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => this.OutOptions() )
        .on('pointerup', () => this.Highlight(this.OptionsOutBtn, true) )
        .on('pointerover', () => this.Over(this.OptionsOutBtn, true) )
        .on('pointerout', () => this.Highlight(this.OptionsOutBtn, false) );

    }

    update(delta) {

    }

    Highlight(obj, b) {

        b ? obj.tint = Phaser.Display.Color.GetColor(139, 139, 139) : obj.tint = Phaser.Display.Color.GetColor(255, 255, 255);  
    }

    Over(obj, b) {

        b ? obj.tint = Phaser.Display.Color.GetColor(139, 139, 139) : obj.tint = Phaser.Display.Color.GetColor(255, 255, 255);  
        sfx.sounds[0].play();
    }

    ShowMenu(){

        //Opciones
        this.BtnBackToGame.setInteractive()
        .on('pointerdown', () => this.GoBackGame() )
        .on('pointerup', () => this.Highlight(this.BtnBackToGame, true) )
        .on('pointerover', () => this.Over(this.BtnBackToGame, true) )
        .on('pointerout', () => this.Highlight(this.BtnBackToGame, false) );
        this.BtnOptions.setInteractive()
        .on('pointerdown', () => this.GoOptions() )
        .on('pointerup', () => this.Highlight(this.BtnOptions, true) )
        .on('pointerover', () => this.Over(this.BtnOptions, true) )
        .on('pointerout', () => this.Highlight(this.BtnOptions, false) );
        this.BtnBackToMenu.setInteractive()
        .on('pointerdown', () => this.GoBackMenu() )
        .on('pointerup', () => this.Highlight(this.BtnBackToMenu, true) )
        .on('pointerover', () => this.Over(this.BtnBackToMenu, true) )
        .on('pointerout', () => this.Highlight(this.BtnBackToMenu, false) );
    }

    GoBackGame() {

        var that = this;
        this.menuBaseTweenOUT = this.tweens.add({
            targets: [this.menuBase,this.BtnBackToGame, this.BtnOptions, this.BtnBackToMenu],
            x:3*game.config.width/2,
            duration: 1500,
            ease: 'Cubic.easeOut',
            repeat: 0,
            yoyo: false,
            delay: 0,

            onComplete: function() {

                sfx.sounds.forEach(element => {
                    element.resume();
                });
            
                soundtrack.pistas[1].resume();
                soundtrack.pistas[3].resume();

                if (!isTutorial) {
                    that.scene.resume("SceneGame");
                }
                else{
                    that.scene.resume("SceneTutorial");
                }
                
                that.scene.stop("ScenePause");
            },
        });
    }

    GoOptions() {
        //this.print0.setVisible(true);
        //this.print1.setVisible(true);
        sliderMusic.setVisible(true);
        sliderSfx.setVisible(true);
        this.volumeButton.setVisible(true);
        this.sfxButton.setVisible(true);
        this.OptionsOutBtn.setVisible(true);

        this.BtnBackToGame.setVisible(false);
        this.BtnOptions.setVisible(false);
        this.BtnBackToMenu.setVisible(false);
    }

    OutOptions() {
        //this.print0.setVisible(false);
        //this.print1.setVisible(false);
        sliderMusic.setVisible(false);
        sliderSfx.setVisible(false);
        this.volumeButton.setVisible(false);
        this.sfxButton.setVisible(false);
        this.OptionsOutBtn.setVisible(false);

        this.BtnBackToGame.setVisible(true);
        this.BtnOptions.setVisible(true);
        this.BtnBackToMenu.setVisible(true);
    }

    GoBackMenu() {
        if (!isTutorial) {
            this.scene.stop("SceneGame");
        }
        else {
            this.scene.stop("SceneTutorial");
            isTutorial = false;
        }
        
        this.scene.stop("ScenePause");
        this.scene.start("SceneMenu");
        soundtrack.pistas[0].play();
    }

    switchMusic() {
        if(sliderMusic.value==1){
            sliderMusic.value = 0;
            ////console.log("De 100 a 0");
        }
        else if(sliderMusic.value == 0){
            sliderMusic.value = 1;
            ////console.log("De 0 a 100");
        } else(sliderMusic.value != 0 || sliderMusic.value != 1)
            sliderMusic.value = Math.round(sliderMusic.value);

        sfx.sounds[0].play();

    }

    switchSfx() {
        if(sliderSfx.value==1){
            sliderSfx.value = 0;
            ////console.log("De 100 a 0");
        }
        else if(sliderSfx.value == 0){
            sliderSfx.value = 1;
            ////console.log("De 0 a 100");
        } else(sliderSfx.value != 0 || sliderSfx.value != 1)
        sliderSfx.value = Math.round(sliderSfx.value);
            
        sfx.sounds[0].play();

    }
}
function GlowMe(scene,target,fadeOut){
    this.tweens.addCounter({
        targets: target,
        from: 255,
        to: 0,
        duration: 1000,
        duration: fadeOut,
        ease: 'Expo.easeInOut',
        yoyo: true,
        onUpdate: function (tween)
        {
            var value = Math.floor(tween.getValue());

            image.setTint(Phaser.Display.Color.GetColor(value, value, value));
        }
    });
    
}


