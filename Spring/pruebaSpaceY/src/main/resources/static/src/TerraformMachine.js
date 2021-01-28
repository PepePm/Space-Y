class TerraformMachine extends Machine {
    constructor(scene, x, y, nMachine) {

        super(scene, x, y, nMachine)
        
        this.obj.setOrigin(0.5, 2.6);
        this.obj.setScale(0.5);

        this.keyIndicator = new KeyIndicator(scene, marte.x, 400, "W");

        this.scene = scene;
    }

    update(delta){
        //update tecla
        this.keyIndicator.update();
        //Interacción
        if (this.canInteract()) {

            //Si no está rota
            if (!this.isBroken){

                //Visibilidad on
                this.keyIndicator.setVisible(true);
                this.keyIndicator.changeKey("W");

                //Aumentar carga del cohete
                if (key_up.isDown) {

                    if (indRocas.size >= spdCargarCohete && indTerra.size < indTerra.maxSize) {

                        indTerra.size+=spdCargarCohete;
                        indRocas.size-=spdCargarCohete;

                        indTerra.Update();
                        indRocas.Update();

                        if (!this.obj.anims.isPlaying)
                            this.obj.anims.play("movimientoTerraformador");

                        //Comprobar que se cumple la condición de victoria
                        if (indTerra.size >= indTerra.maxSize)
                            VictoryCondition(this.scene);
                    }
                }
                else if (key_up.isUp) {

                    this.StopAnim();
                }

                //Reparar sin estar rota
                this.GoRepair(delta, 0.5);
            }
            else {
                //Si está rota
                this.keyIndicator.setVisible(true);
                this.keyIndicator.changeKey("R");

                this.GoRepair(delta, 1);
        
            }
            
        }
        else {

            //Visibilidad off
            this.keyIndicator.setVisible(false);
        }

        //Desgaste
        //this.updateWear(delta);
        this.delta = delta;
    }

    GoRepair(delta, n) {

        if (key_repair.isDown && this.wear < this.maxWear) {
            var spd;
            if (n === 0.5) {

                spd = delta/6;
            }
            else {

                spd = delta/10;
            }
            //Reparación rota
            //Si no tienes materiales, reparación lenta
            if (indMat.size < this.repairCost*0.5) {

                this.repairBar.SetColor(repairBar_color2);
                spd /= 6;
            }

            if (this.repairBar.n < this.repairBar.max) {

                this.repairBar.n += spd;
                this.repairBar.Update();
            }
            else if (this.repairBar.n >= 1) {

                this.Repair();

                this.repairBar.n = 0;
                this.repairBar.Update();
            }
        }
        else{
            //Si se deja de reparar
            this.repairBar.n = 0;
            this.repairBar.Update();
        }
        

    }

    StopAnim() {

        this.obj.anims.stop();
        this.obj.setFrame(0);
    }


}