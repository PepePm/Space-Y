
class SceneGameEnd extends Phaser.Scene {

    constructor() {

        super("SceneGameEnd");
    }

    preload(){
        
    }

    create() {

        this.fondo = this.add.rectangle(game.config.width/2, game.config.height/2, game.config.width, game.config.height, Phaser.Display.Color.GetColor(0, 0, 0)).setAlpha(0.5);

        //Fondo
        if (isVictory) {

            this.menuBase = this.add.image(game.config.width/2, -game.config.height/2, "victoria");
            this.menuBaseTween = this.tweens.add({
                targets: this.menuBase,
                x:game.config.width/2,
                y:game.config.height/2,
                duration: 1500,
                ease: 'Cubic.easeOut',
                repeat: 0,
                yoyo: false,
                delay: 0,

                onComplete: this.ShowMenu.bind(this)
            });
        }
        else {

            this.menuBase = this.add.image(game.config.width/2, 3*game.config.height/2, "derrota");
            this.menuBaseTween = this.tweens.add({
                targets: this.menuBase,
                x:game.config.width/2,
                y:game.config.height/2,
                duration: 1500,
                ease: 'Cubic.easeOut',
                repeat: 0,
                yoyo: false,
                delay: 0,

                onComplete: this.ShowMenu.bind(this)
            });
        }


        //Botón para volver al menú
        this.BtnBackToMenu = this.add.text(game.config.width/2, (5*game.config.height/7)+40, "BACK TO MENU",{ fill: '#ffffff',fontFamily:'menuFont',fontSize:'60px' })
        .setDepth(6).setOrigin(0.5).setVisible(false)
        .setInteractive()
        .on('pointerdown', () => this.GoBack() )
        .on('pointerup', () => this.Highlight(this.BtnBackToMenu, true) )
        .on('pointerover', () => this.Over(this.BtnBackToMenu, true) )
        .on('pointerout', () => this.Highlight(this.BtnBackToMenu, false) );
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
        
        this.BtnBackToMenu.setVisible(true);
    }

    GoBack() {
        
        if (!isTutorial) {

            this.scene.stop("SceneGame");
        }
        else{

            this.scene.stop("SceneTutorial");
            isTutorial = false;
        }
        this.scene.start("SceneMenu");
        soundtrack.pistas[0].play();
        
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

/*
key_cleanV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
key_cleanB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);

//PARA EL UPDATE 
if (Phaser.Input.Keyboard.JustDown (key_cleanV) && maquinasucia)
    {
        if (Phaser.Input.Keyboard.JustDown (key_cleanB))
        {
            //contador sucio -1
        }

    }
    if (Phaser.Input.Keyboard.JustDown (key_cleanB) && maquinasucia)
    {
        if (Phaser.Input.Keyboard.JustDown (key_cleanV))
        {
            //contador sucio -1
        }
    }
*/

