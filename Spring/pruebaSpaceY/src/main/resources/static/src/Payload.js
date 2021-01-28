class Payload extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, n) {

        super(scene, x, y, "payloads", n);
        this.scene = scene;
        this.obj = scene.add.image(x, y, "payloads", n).setDepth(2);
        this.obj.setScale(0);

        scene.tweens.add({
            targets: this.obj,
            scale:1,
            duration: 200,
            ease: 'Cubic.easeOut',
            repeat: 0,
            yoyo: false,
        });

    }

    UnloadFromRocket(delay) {

        this.scene.tweens.add({
            targets: this.obj,
            y: 793,
            duration: 500,
            ease: 'Back.easeIn',
            repeat: 0,
            yoyo: false,
            delay:delay,

            onComplete: this.EnterOnMachine.bind(this)
        });
    }

    EnterOnMachine() {

        //this.obj.y = 600;
        controlTierra.tweenTube1On();
        this.obj.setVisible(false);
        this.destroy();
    }

    MoveUp() {

        this.scene.tweens.add({
            targets: this.obj,
            y: this.obj.y -35,
            duration: 200,
            ease: 'Back.easeIn',
            repeat: 0,
            yoyo: false,
            delay:0,

            onComplete: controlTierra.CreateNewPayload.bind(controlTierra)
        });
    }

    Dissapear(delay) {

        this.scene.tweens.add({
            targets: this.obj,
            scale: 0,
            duration: 500,
            ease: 'Back.easeIn',
            repeat: 0,
            yoyo: false,
            delay:delay,

            completeDelay: 1000,
            onComplete: this.DestroyObj.bind(this),
        });
    }

    DestroyObj() {

        if (!controlTierra.goTakeOff) {
            controlTierra.rocket.anims.play("movimientoCohete");
        }
        controlTierra.goTakeOff = true;

        this.destroy();
    }
}

