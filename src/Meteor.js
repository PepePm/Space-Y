class Meteor {
    constructor(scene, delay){
        //super(scene, 0, 0, "payloads", 0);
        this.rotation = Phaser.Math.Linear(0, Math.PI*2, Phaser.Math.Between(0,100)/100.0);

        this.obj = scene.add.image(marte.x, marte.y, "Meteorito")
        this.obj.depth = 1;
        this.obj.z = 0;
        this.obj.rotation = this.rotation;
        this.obj.setOrigin(0.5, 6);
        this.incr = 0;
        this.areaCol = 0.1;


        this.scene = scene;

        this.startTween = scene.tweens.add({
            targets: this.obj,
            z:9,
            duration: 3000,
            ease: 'Quint.easeIn',
            repeat: 0,
            yoyo: false,
            delay: delay,

            onComplete: this.Explode.bind(this)
        });
    }

    Update() {
        this.incr = this.obj.z;
        this.obj.setOrigin(0.5, 15 - this.incr);
    }

    Explode() {

        //Play animation
        this.checkCollision();
        //this.obj.setVisible(false);
        this.obj.destroy();
        //this.destroy();

        //Sonido explosión meteorito
        sfx.sounds[13].play();
    }

    checkCollision() {

        //Colisión con el jugador
        if (this.obj.rotation < this.areaCol/2 && this.obj.rotation > -this.areaCol/2) {

            DefeatCondition(this.scene);
        }

        //Colisión con máquinas
        for (var i=0; i < 4; i++) {

            var machPos = maquinas[i].obj.rotation;
            var machArea = maquinas[i].area;
            if (this.obj.rotation < machPos + machArea && this.obj.rotation > machPos - machArea) {

                //Particularidad cohete
                if (i === 0){

                    if (maquinas[0].location === 0 && !maquinas[0].isSending && !maquinas[0].isComing) {

                        maquinas[0].wear = 0;
                        maquinas[0].isBroken = true;
                        objCohete.obj.setTexture(maquinas[0].textureBreak);    
                        ////console.log("TUPUTAMADREEEEEEEEEE,"+maquinas[0].location +","+ !maquinas[0].isSending+"," +!maquinas[0].isComing);
                        ////console.log("JAJAJAJAJAJJAAJJAJAJAJJA");
                    }
                }
                else {

                    //Aplicar rotura a la máquina
                    maquinas[i].wear = 0;//Math.max(0, maquinas[i].wear - maquinas[i].maxWear*0.3);
                    maquinas[i].isBroken = true;
                    maquinas[i].obj.anims.stop();
                    maquinas[i].obj.setTexture(maquinas[i].textureBreak);
                    maquinas[i].eventWear.paused = true;
                }
                
            }
        }

        
    }
}
