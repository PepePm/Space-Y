class SceneContact extends Phaser.Scene {

    constructor() {

        super("SceneContact");
    }

    create() {
        
        this.bckContact =  this.add.image(game.config.width/2, game.config.height+1000,"tablon");
        this.easeMe(this.bckContact, this, 1);

        this.JacquesButton = this.add.text(game.config.width/2, game.config.height+300, 'Jacques David Meyns Villaldea', { fill: '#000000',fontFamily:'textFont',fontSize:'20px',align:'left'})
        .setInteractive()
        .on('pointerdown', () => this.enterJacques() )
        .on('pointerover', () => this.enterButtonHoverState(this.JacquesButton) )
        .on('pointerout', () => this.enterButtonRestState(this.JacquesButton) );
        this.JacquesButton.setOrigin(0.5);
        this.easeMe(this.JacquesButton, this, 2);
        this.jacks =  this.add.image(game.config.width/2, game.config.height+300,"jacks").setScale(0.1);  //carita jaks
        this.easeCaritas(this.jacks, this, 1);

        this.ManuButton = this.add.text(game.config.width/2 , game.config.height+300, 'Manuel Mantecon Polo',  { fill: '#000000',fontFamily:'textFont',fontSize:'20px',align:'left'})
        .setInteractive()
        .on('pointerdown', () => this.enterManu() )
        .on('pointerover', () => this.enterButtonHoverState(this.ManuButton) )
        .on('pointerout', () => this.enterButtonRestState(this.ManuButton) );
        this.ManuButton.setOrigin(0.5);
        this.easeMe(this.ManuButton, this, 3);
        this.manu =  this.add.image(game.config.width/2, game.config.height+300,"manu").setScale(0.1);  //carita manu
        this.easeCaritas(this.manu, this, 2);

        this.SofiButton = this.add.text(game.config.width/2, game.config.height+300, 'Sofia de Vega Gimenez',  { fill: '#000000',fontFamily:'textFont',fontSize:'20px',align:'left'})
        .setInteractive()
        .on('pointerdown', () => this.enterSofi() )
        .on('pointerover', () => this.enterButtonHoverState(this.SofiButton) )
        .on('pointerout', () => this.enterButtonRestState(this.SofiButton) );
        this.SofiButton.setOrigin(0.5);
        this.easeMe(this.SofiButton, this, 4);
        this.sofi =  this.add.image(game.config.width/2, game.config.height+300,"sofi").setScale(0.1);  //carita sofi
        this.easeCaritas(this.sofi, this, 3);

        this.PepeButton = this.add.text(game.config.width/2, game.config.height+300, 'Jose Ignacio Pintado Murillo',  { fill: '#000000',fontFamily:'textFont',fontSize:'20px',align:'left'})
        .setInteractive()
        .on('pointerdown', () => this.enterPepe() )
        .on('pointerover', () => this.enterButtonHoverState(this.PepeButton) )
        .on('pointerout', () => this.enterButtonRestState(this.PepeButton) );
        this.PepeButton.setOrigin(0.5);
        this.easeMe(this.PepeButton, this, 5);
        this.pepe =  this.add.image(game.config.width/2, game.config.height+300,"pepe").setScale(0.1);  //carita pepe
        this.easeCaritas(this.pepe, this, 4);

        

        this.backButton = this.add.text(game.config.width/2, game.config.height+300, 'Atras',  { fill: '#000000',fontFamily:'textFont',fontSize:'20px',align:'left'})
        .setInteractive()
        .on('pointerdown', () => this.enterBack() )
        .on('pointerover', () => this.enterButtonHoverState(this.backButton) )
        .on('pointerout', () => this.enterButtonRestState(this.backButton) );
        this.backButton.setOrigin(0.5);
        this.easeMe(this.backButton, this, 6);

    }

    //LINK
openExternalLink (name)
{
    var url = 'https://'+ encodeURIComponent(name) +'.itch.io/' ;
    var s = window.open(url, '_blank');
    if (s && s.focus)
    {
        s.focus();

    }
    else if (!s)
    {
        window.location.href = url;
    }
}

//INTERACCION
    enterJacques() {
        sfx.sounds[0].play();
        this.openExternalLink('surissian');
    }
    enterSofi() {
        sfx.sounds[0].play();
        this.openExternalLink('sufeichan');
    }
    enterPepe() {
        sfx.sounds[0].play();
        this.openExternalLink('pepepmcc');
    }
    enterManu() {
        sfx.sounds[0].play();
        this.openExternalLink('manutoarts');
    }

    enterBack() {
        sfx.sounds[0].play();
        this.scene.start('SceneMenu');
    }

    enterButtonHoverState(boton) {
        sfx.sounds[1].play();
        boton.setStyle({ fill: '#4a95ff'});
        boton.x = boton.x+movTxt;
        boton.y = boton.y+movTxt;
    }
    
    enterButtonRestState(boton) {
        boton.setStyle({ fill: '000000' });
        boton.x = boton.x-movTxt;
        boton.y = boton.y-movTxt;
    }
    
    easeCaritas (carita,scene, idx)
    {
        var fX=0;
        var fY=0;
        switch (carita)
        {
            case this.jacks: fX = game.config.width/2 + 190; fY = (game.config.height/8)*2;break;
            case this.manu: fX = game.config.width / 2 + 190; fY = (game.config.height/8)*3; break;
            case this.sofi: fX = game.config.width / 2 + 190; fY = (game.config.height/8)*4; break;
            case this.pepe: fX = game.config.width / 2 + 190; fY = (game.config.height/8)*5; break;
        }
        scene.tweens.add({
            targets: carita,
            x: fX,
            y: fY,
            delay: idx * 100,
            duration: 1200,
            ease: 'Expo.easeOut',
            repeat: 0,
            yoyo: false,
        });
    }
    easeMe(boton,scene,nOp) {
        var endX;
        var endY;
        switch (nOp)
        {
            case 1: endX = game.config.width/2; endY = game.config.height/2;
            scene.tweens.add({
                targets: boton,
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 200,
                ease: 'Expo.easeIn',
                yoyo: true,
            }); break;
            case 2: endX = game.config.width / 2-60; endY = (game.config.height/8)*2; break;
            case 3: endX = game.config.width / 2-60; endY = (game.config.height/8)*3; break;
            case 4: endX = game.config.width / 2-60; endY = (game.config.height/8)*4; break;
            case 5: endX = game.config.width / 2-60; endY = (game.config.height/8)*5; break;
            case 6: endX = game.config.width / 2; endY = (game.config.height/8)*6; break;
            default: break;
        }
        scene.tweens.add({
            targets: boton,
            x: endX,
            y: endY,
            delay: nOp * 100,
            //aplha: {start: game.config.width / 2, to: game.config.width / 8},
            duration: 500,
            ease: 'Expo.easeOut',
            repeat: 0,
            yoyo: false,
            //delay:delay,
    
            //onComplete: this.EnterOnMachine.bind(this)
        });
    }

}