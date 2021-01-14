var logo1, logo2;
var timer; 
var value;
//var musica = undefined;
var sfx = undefined;

class SceneLogos extends Phaser.Scene {

    constructor() {

        super("SceneLogos");
    }

    preload(){
        //SceneLogos//
        this.load.image("logo1", directory+"Concept_space_y_3.png");
        this.load.image("logo2", directory+"logo.png");
        this.load.image("bckMenu", directory+"spaceYmenu_bck.png");

        //MUSICA
        //this.load.audio('MusicMenu', ['./Resources/Audio/Music/space walk.ogg']);
    }

    create() {

        //logo1 = this.add.image(game.config.width/2, game.config.height/2, "logo1");
        this.bckMenu = this.add.image(game.config.width/2,game.config.height/2,'bckMenu').setScale(0.3);
        logo2 = this.add.image(game.config.width/2, 7*game.config.height/16, "logo2");
        

        timer = this.time.delayedCall(5000, startScene, [this]);

        //
        this.scene.launch('SceneBoot');
        
    }

    
    update(delta) {

        value = Phaser.Math.Clamp(Phaser.Math.Easing.Cubic.Out(timer.getOverallProgress()*2), 0, 1);
        logo2.setScale(value);
    }
}

function startScene(that){
    
    //that.scene.start('SceneMenu');
}