class Machine {//extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, nMachine) {

        //this.obj = scene.add.image(x, y, "componentes", nMachine);
        //this.obj.setOrigin(0.5, 13.5);

        //Colocar elementos alrededor de marte
        switch(nMachine) {

            case 0:
                //Estación de transporte
                //this.obj = scene.add.sprite(x, y, "rocket");
                this.obj = scene.add.sprite(x, y, "movimientoCohete", 0);
                this.obj.setRotation(0);
                this.textureNormal = "movimientoCohete";
                this.textureBreak = "rocketRoto";
                this.textureDirty = "rocketPolvo";
            break;
            case 1:
                //Terraformador
                this.obj = scene.add.sprite(x, y, "movimientoTerraformador", 0);
                this.obj.setRotation(-1.57);
                this.textureNormal = "movimientoTerraformador";
                this.textureBreak = "terraformadorRoto";
                this.textureDirty = "terraformadorPolvo";
            break;
            case 2:
                //Comunicaciones
                this.obj = scene.add.sprite(x, y, "movimientoAntena", 0);
                this.obj.setRotation(1.57);
                this.textureNormal = "movimientoAntena";
                this.textureBreak = "antenaRoto";
                this.textureDirty = "antenaPolvo";
            break;
            case 3:
                //Mina
                this.obj = scene.add.sprite(x, y, "movimientoMina", 0);
                this.obj.setRotation(3.14);
                this.textureNormal = "movimientoMina";
                this.textureBreak = "minaRoto";
                this.textureDirty = "minaPolvo";
            break;
            
        }
        this.typeMachine = nMachine; //0->cohete , 1->terraformador , 2->comunicaciones , 3->mina
        this.area = 0.15;

        this.maxWear = 100;
        this.wear = this.maxWear;
        this.wearPerc = 1;
        var rand = Phaser.Math.Linear(5000, 15000, Phaser.Math.Between(0,100)/100.0);
        this.eventWear = scene.time.addEvent({ delay: rand, callback: this.updateWear, callbackScope: this, loop: true });
        this.isBroken = false;

        this.repairCost = MAX_MATERIAL*0.2;
        this.repairBar = new Bar(scene, marte.x-40, marte.y-690, nCarga, MAX_CARGA, 0.5, 0.4, repairBar_color, false);

        this.delta;
    }

    setRotation(n){

        this.obj.rotation = n;
    }

    canInteract() {

        if (this.obj.rotation > -0.15 && this.obj.rotation < 0.15) {
            
            return true;
        }
        return false;
    }

    updateWear() {
        
        var delta = this.delta;
        //Desgaste
        var rand = Phaser.Math.Linear(delta, delta/1000, Phaser.Math.Between(0,100)/100.0)*this.wearPerc;
        this.wear = Phaser.Math.Clamp(this.wear - rand, 0, 100);

        if (this.wear <= 0) {

            this.isBroken = true;
            this.obj.anims.stop();
            this.obj.setTexture(this.textureBreak);
            if(this.typeMachine === 0)
                objCohete.obj.setTexture(this.textureBreak);  
            this.eventWear.paused = true;
        }
        else {

            this.eventWear.delay = Phaser.Math.Linear(5000, 15000, Phaser.Math.Between(0,100)/100.0);
        }
    }

    Repair() {

        var n;
        if (this.isBroken) {

            n = 1;
        }
        else {

            n = 0.5;
        }

        indMat.size = Math.max(0, indMat.size - this.repairCost*n);
        indMat.Update();

        this.isBroken = false;
        this.wear = 100;
        this.obj.setTexture(this.textureNormal);
        if(this.typeMachine === 0)
            objCohete.obj.setTexture(this.textureNormal);  
        this.eventWear.paused = false;
    }
}

