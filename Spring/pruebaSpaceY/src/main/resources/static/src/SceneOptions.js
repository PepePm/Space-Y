var slider;
const COLOR_PRIMARY = 0x6dbf67;
const COLOR_LIGHT = 0x00ff04;
const COLOR_DARK = 0x006302;

var sliderMusic = undefined;
var sliderSfx = undefined;

class SceneOptions extends Phaser.Scene {

    constructor() {

        super("SceneOptions");
    }

    preload()
    {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        }); 
    }

    create() {
        var txt1 = (soundtrack == undefined) ? '0' : soundtrack.volume;
        var txt2 = (sfx == undefined) ? '0' : sfx.volume;
        var print0 = this.add.text(game.config.width/2 + 200, (game.config.height/8)*3 + 32, txt1); //porcentaje musica
        var print1 = this.add.text(game.config.width/2 + 200, (game.config.height/8)*4 + 32, txt2);//porcentaje sfx
        
        //FONDO ANIMADO YEAH
        this.bckRadio = this.add.image(game.config.width/2, -2000,"radio");
        this.easeMe(this.bckRadio,this,1);

        //Altaoces animados
        this.bckAltavoces = this.add.image(game.config.width/2, -2000,"altavoces");
        this.easeMe(this.bckAltavoces,this,1);
        this.tweens.add({
            targets: this.bckAltavoces,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 800,
            ease: 'Elastic.easeOut',
            repeat: -1,
        });
        


        //Slider musica
        //if(sliderMusic == undefined)
        sliderMusic = this.rexUI.add.slider({
            x: game.config.width/2,
            y: (game.config.height/8)*3 + 40,
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
            .layout();

        //Slider SFX
        //if(sliderSfx == undefined)
        sliderSfx = this.rexUI.add.slider({
            x: game.config.width/2,
            y: (game.config.height/8)*4 + 40,
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
            .layout();


        this.volumeButton = this.add.text(-300, (game.config.height/8)*3, 'Music volume', { fill: '#ffffff',fontFamily:'menuFont',fontSize:'60px' })
        .setInteractive()
        .on('pointerdown', () => this.switchMusic() )
        .on('pointerover', () => this.enterButtonHoverState(this.volumeButton) )
        .on('pointerout', () => this.enterButtonRestState(this.volumeButton) );
        this.volumeButton.setOrigin(0.5);
        this.easeMe(this.volumeButton,this,2);

        this.sfxButton = this.add.text(game.config.width + 300, (game.config.height/8)*4, 'SFX volume', { fill: '#ffffff',fontFamily:'menuFont',fontSize:'60px' })
        .setInteractive()
        .on('pointerdown', () => this.switchSfx() )
        .on('pointerover', () => this.enterButtonHoverState(this.sfxButton) )
        .on('pointerout', () => this.enterButtonRestState(this.sfxButton) );
        this.sfxButton.setOrigin(0.5);
        this.easeMe(this.sfxButton,this,3);
        

        this.backButton = this.add.text(game.config.width/2, game.config.height + 300, 'Back', { fill: '#ffffff',fontFamily:'menuFont',fontSize:'60px' })
        .setInteractive()
        .on('pointerdown', () => this.enterBack() )
        .on('pointerover', () => this.enterButtonHoverState(this.backButton) )
        .on('pointerout', () => this.enterButtonRestState(this.backButton) );
        this.backButton.setOrigin(0.5);
        this.easeMe(this.backButton,this,4);
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

    enterContact() {
        //this.scene.start(SceneContact);
    }

    enterBack() {
        sfx.sounds[0].play();
        this.scene.start('SceneMenu');
    }

    enterButtonHoverState(boton) {
        sfx.sounds[1].play();
        boton.setStyle({ fill: '#ff0'});
        boton.x = boton.x+movTxt;
        boton.y = boton.y+movTxt;
    }
    
    enterButtonRestState(boton) {
        boton.setStyle({ fill: '#ffffff' });
        boton.x = boton.x-movTxt;
        boton.y = boton.y-movTxt;
    }

    //EASINGS
easeMe(boton,scene,nOp) {
    var endX;
    var endY;
    switch (nOp)
    {
        case 1: endX = game.config.width / 2; endY = (game.config.height/2); break;
        case 2: endX = game.config.width / 2; endY = (game.config.height/8)*3; break;
        case 3: endX = game.config.width / 2; endY = (game.config.height/8)*4; break;
        case 4: endX = game.config.width / 2; endY = (game.config.height/8)*5; break;
        default: break;
    }
    scene.tweens.add({
        targets: boton,
        x: endX,
        y: endY,
        delay: nOp * 150,
        //aplha: {start: game.config.width / 2, to: game.config.width / 8},
        duration: 500,
        ease: 'Circ.easeOut',
        repeat: 0,
        yoyo: false,
        //delay:delay,

        //onComplete: this.EnterOnMachine.bind(this)
    });
}
}