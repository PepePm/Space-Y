class MineMachine extends Machine {
    constructor(scene, x, y, nMachine) {

        super(scene, x, y, nMachine)
        this.obj.setOrigin(0.5, 2.2);
        this.obj.setScale(0.75);
        
        this.keyIndicator = new KeyIndicator(scene, marte.x, 255, "H");
    }

    update(delta){
        //update tecla
        this.keyIndicator.update();
        if (this.canInteract()) {
            
            //
            if (!this.isBroken) {

                //Visibilidad on
                this.keyIndicator.setVisible(true);

                //Picar en la mina
                //
                if (key_interact.isDown) {

                    if (barraCarga.n < barraCarga.max && indRocas.size < indRocas.maxSize) {

                        barraCarga.n += delta/7;
                        barraCarga.Update();

                        if (!this.obj.anims.isPlaying)
                            this.obj.anims.play("movimientoMina");
                    }
                    else if (barraCarga.n >= 1) {

                        indRocas.size = Phaser.Math.Clamp(indRocas.size + 20, 0, MAX_ROCAS);
                        indRocas.Update();

                        barraCarga.n = 0;
                        barraCarga.Update();
                    }
                    else if (indRocas.size >= indRocas.maxSize) {

                        this.StopAnim();
                    }
                }
                else{
                    //Si deja de picar
                    barraCarga.n = 0;
                    barraCarga.Update();

                    this.StopAnim();
                }

                //Reparar sin estar rota
                this.GoRepair(delta, 0.5);
            }
            else {

                this.keyIndicator.setVisible(true);
                this.keyIndicator.changeKey("R");

                //Reparar roto
                this.GoRepair(delta, 1);
            }
            

        }
        else{

            //La barra de carga se desactiva
            barraCarga.n = 0;
            barraCarga.Update();

            //Visibilidad off
            this.keyIndicator.setVisible(false);
        }

        //Desgaste
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

                this.keyIndicator.changeKey("H");
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