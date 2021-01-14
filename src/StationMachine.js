class StationMachine extends Machine {
    constructor(scene, x, y) {

        super(scene, x, y, 0)

        this.scene = scene;
        this.animation = false;
        this.isSending = false;
        this.isComing = false;
        this.location = 0; //0 -> MARTE, 1 -> TIERRA
        this.loadOfEarth = false;

        this.keyIndicator = new KeyIndicator(scene, marte.x, 350, "W");
    }

    update(delta){

        this.keyIndicator.update();

        if (this.location === 0 && !this.isSending && !this.isBroken) {

            if (this.canInteract()) {

                //Cargar y enviar
                if (!this.loadOfEarth) {

                    //Visibilidad on
                    objCoheteMat.setVisible(true);
                    this.keyIndicator.setVisible(true);
                    this.keyIndicator.changeKey("W");
        
                    //Aumentar carga del cohete
                    if (key_up.isDown) {
                        if (indRocas.size >= spdCargarCohete && objCoheteMat.n < objCoheteMat.max) {
        
                            objCoheteMat.n+=spdCargarCohete;
                            indRocas.size-=spdCargarCohete;
        
                            objCoheteMat.Update();
                            indRocas.Update();
                        }
                    }
        
                    //Enviar recursos del cohete
                    if (objCoheteMat.n === objCoheteMat.max && !this.isSending) {

                        this.keyIndicator.changeKey("H");

                        if (key_interact.isDown) {

                            objCohete.obj.anims.play("movimientoCohete");

                            //Despege de marte
                            sfx.sounds[11].play();
                            objCoheteMat.n = 0;
                            objCoheteMat.Update();
                            this.isSending = true;

                            objCoheteMat.setVisible(false);
                            this.keyIndicator.setVisible(false);
                        }
                    }
        
                }
                else {

                    //Visibilidad on
                    this.keyIndicator.setVisible(true);

                    //Recoger elementos de la tierra
                    if (key_interact.isDown) {
                        
                        indHam.size = Math.min(indHam.size + objCohete.comLoad, MAX_COMIDA);
                        indMat.size = Math.min(indMat.size + objCohete.matLoad, MAX_MATERIAL);
                        indHam.Update();
                        indMat.Update();

                        objCohete.comLoad = 0;
                        objCohete.matLoad = 0;
                        this.loadOfEarth = false;

                        this.keyIndicator.changeKey("W");
                    }
                    
                }

                //Reparar sin estar rota
                this.GoRepair(delta, 0.5);
                
            
            }
            else {
                //Visibilidad off
                objCoheteMat.setVisible(false);
                this.keyIndicator.setVisible(false);
            }
            
                
        }
        else if (this.isBroken) {

            if (this.canInteract()) {

                objCoheteMat.setVisible(false);
                this.keyIndicator.setVisible(true);
                this.keyIndicator.changeKey("R");

                this.GoRepair(delta, 1);
            }
            else{

                this.keyIndicator.setVisible(false);
            }


        }
        
        //Update despegar/aterrizar
        if (this.isSending)
            objCohete.TakeOff(delta);

        if (this.isComing)
            objCohete.Land(delta);

        
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
}