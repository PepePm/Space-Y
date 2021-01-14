class EarthControl {//extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, maxSize) {

        this.scene = scene;

        //Elementos escenario
        // ui_T_bck
        this.fondoTierra = scene.add.image(1202, 450, "fondoTierra").setDepth(2);
		// ui_T_pantalla
		this.pantalla = scene.add.image(1337, 250, "pantalla").setDepth(2);
		// ui_T_Lanzadera
        this.lanzadera = scene.add.image(963, 365, "lanzadera").setDepth(2);
        // ui_T_control_pannel
		this.controlBase = scene.add.image(1447, 676, "controlBase").setDepth(2);
				
		// ui_T_control_key
		this.controlKey = scene.add.image(1447, 760, "controlKey").setDepth(2);		
		// ui_T_control_pass
        this.controlPass = scene.add.image(1447, 829, "controlPass").setDepth(2);
        // ui_T_Paqueteria_contadores
        this.paqBase = scene.add.image(1219, 594, "paqueteriaBase").setDepth(2);
        // ui_T_Paqueteria_contadores_tubo
        this.paqBaseTubo = scene.add.image(1239, 775, "paqueteriaBaseTubo").setDepth(2);//Tubo 2
        // ui_T_DDR2
        this.ddrBaseTubo = scene.add.image(980, 775, "ddrBaseTubo").setDepth(3);/////tubo 1
        // ui_T_DDR1
        this.ddrBase = scene.add.image(1110, 805, "ddrBase").setDepth(3);
        // ui_T_countdown
		this.lanzCtdn = scene.add.image(956, 210, "lanzaderaCountdown").setDepth(2);////
		// ui_T_Lanzadera_door
        this.lanzPuertaOut = scene.add.image(958, 83, "lanzaderaPuerta").setDepth(4);
        // ui_T_pantalla_plano
        this.pantallaPlano = scene.add.image(1337, 227, "pantallaMapa").setDepth(2);
        // ui_T_Paqueteria_pasarela
        this.paqPasarela = scene.add.image(1056, 561, "paqueteriaPasarela").setDepth(2);////Tubo3
    
        this.cargaPayloads = new Array();// = new Array(maxSize);
        this.payloadsPosX = 957;
        this.payloadsPosY = 570;
        this.maxSize = maxSize;
        this.size = 0;

        this.rocket = scene.add.sprite(957, -400, "movimientoCohete", 7).setScale(1.3).setDepth(2);
        this.rocketY = 400;
        this.goTakeOff = false;
        this.typeOfLoad = 0; //0->Roca, 1->Comida/material

        //Botón para descargar rocas
        this.countLanz = 0;
      
        this.unloadRocketBtn = scene.add.image(860, 665, "lanzaderaPuertaRecursos").setDepth(4)

        .setInteractive()
        .on('pointerdown', () =>  this.tweenLanzPuertaIn())//this.Unload(this.unloadRocketBtn)
        .on('pointerup', () => this.Highlight(this.unloadRocketBtn, true) )
        .on('pointerover', () => this.Highlight(this.unloadRocketBtn, true) )
        .on('pointerout', () => this.Highlight(this.unloadRocketBtn, false) );
        this.unloadRocketBtn.setOrigin(0.1, 0.5);

        //Botones para transformar
        this.nObj = 0;
        this.ddrBtnComida = scene.add.image(1066, 832, "ddrBotonComida")
        .setInteractive()
        .on('pointerdown', () => this.StartTransform(1) )
        .on('pointerup', () => this.Highlight(this.ddrBtnComida, true) )
        .on('pointerover', () => this.Highlight(this.ddrBtnComida, true) )
        .on('pointerout', () => this.Highlight(this.ddrBtnComida, false) );
        this.ddrBtnComida.depth = 4;

        this.ddrBtnMat = scene.add.image(1105, 832, "ddrBotonMat").setDepth(2)
        .setInteractive()
        .on('pointerdown', () => this.StartTransform(0) )
        .on('pointerup', () => this.Highlight(this.ddrBtnMat, true) )
        .on('pointerover', () => this.Highlight(this.ddrBtnMat, true) )
        .on('pointerout', () => this.Highlight(this.ddrBtnMat, false) );
        this.ddrBtnMat.depth = 3;

        
        //Botones para añadir elementos al envío
        this.paqBtnComida = scene.add.image(1270, 575, "paqueteriaBotonComida").setDepth(2)
        .setInteractive()
        .on('pointerdown', () => this.PutOn(1, this.paqBtnComida))
        .on('pointerup', () => this.Highlight(this.paqBtnComida, true) )
        .on('pointerover', () => this.Highlight(this.paqBtnComida, true) )
        .on('pointerout', () => this.Highlight(this.paqBtnComida, false) );

        this.paqBtnMat = scene.add.image(1270, 515, "paqueteriaBotonMat").setDepth(2)
        .setInteractive()
        .on('pointerdown', () => this.PutOn(0, this.paqBtnMat))
        .on('pointerup', () => this.Highlight(this.paqBtnMat, true) )
        .on('pointerover', () => this.Highlight(this.paqBtnMat, true) )
        .on('pointerout', () => this.Highlight(this.paqBtnMat, false) );

        //Botón para enviar
        this.paqBtnEnv = scene.add.image(1220, 640, "paqueteriaBotonEnviar").setDepth(2)
        .setInteractive()
        .on('pointerdown', () => this.Send(this.paqBtnEnv) )
        .on('pointerup', () => this.Highlight(this.paqBtnEnv, true) )
        .on('pointerover', () => this.Highlight(this.paqBtnEnv, true) )
        .on('pointerout', () => this.Highlight(this.paqBtnEnv, false) );

        //Contadores de recursos
        this.counterRoc = 4;
        this.counterCom = 0;
        this.counterMat = 0;
        //DDR
        this.txtCounterRoc = scene.add.text(this.ddrBtnComida.x+85, this.ddrBtnComida.y, this.counterRoc,{
            fontSize:'35px',
            fontFamily:'textFont',
            fill:'#ffffff',
        }).setOrigin(0.5);
        this.txtCounterRoc.depth = 3;

        //PAQUETERIA
        this.txtCounterMat = scene.add.text(1170, 515, this.counterMat,{
            fontSize:'35px',
            fontFamily:'textFont',
            fill:'#ffffff',
        }).setOrigin(0.5);
        this.txtCounterMat.depth = 3;

        this.txtCounterCom = scene.add.text(1170, 575, this.counterCom,{
            fontSize:'35px',
            fontFamily:'textFont',
            fill:'#ffffff',
        }).setOrigin(0.5);
        this.txtCounterCom.depth = 3;

       

        //Flechas pantalla trasnformaciones
        this.ddrFlechas = new Array(3);
        // ui_T_DDR_arrow
        this.ddrFlechas[0] = scene.add.image(1072, 772, "ddrFlecha_0").setVisible(false).setDepth(3);
		// ui_T_DDR_arrow_1
        this.ddrFlechas[1] = scene.add.image(1110, 772, "ddrFlecha_0").setVisible(false).setDepth(3);
		// ui_T_DDR_arrow_2
        this.ddrFlechas[2] = scene.add.image(1149, 772, "ddrFlecha_0").setVisible(false).setDepth(3);

        //Combos
        this.combokeys = new Array(3);
        

        //Combo flechas
        this.actualComboFlechas;
        var that = this;
        this.scene.input.keyboard.on('keycombomatch', function (event) {

            if (event.size < 4) {

                for (var i=0; i<3; i++) {
                    that.combokeys[i] = 0;
                    that.ddrFlechas[i].setVisible(false);
                    that.ddrFlechas[i].setRotation(0);
                }
                that.counterRoc--;
                that.txtCounterRoc.setText(that.counterRoc);
                that.tweenTube2On(this.nObj);

                that.actualComboFlechas = null;

                ////console.log("combo flechas");
            }
            
        });

        //Misc
        this.zPayL;
        this.wait = false;
        this.newPayloadType = 0;

        //Control de desgaste de máquinas//
        //Botones check desgaste

        // ui_T_control_COM
        this.controlCom = scene.add.image(1388, 549, "controlCom").setDepth(2)
        .setInteractive()
        .on('pointerdown', () => this.CheckWear(2))
        .on('pointerup', () => this.HighlightController(this.controlCom, true) )
        .on('pointerover', () => this.HighlightController(this.controlCom, true) )
        .on('pointerout', () => this.HighlightController(this.controlCom, false) );		
		// ui_T_control_MINA
        this.controlMina = scene.add.image(1506, 549, "controlMina").setDepth(2)
        .setInteractive()
        .on('pointerdown', () => this.CheckWear(3))
        .on('pointerup', () => this.HighlightController(this.controlMina, true) )
        .on('pointerover', () => this.HighlightController(this.controlMina, true) )
        .on('pointerout', () => this.HighlightController(this.controlMina, false) );		
		// ui_T_control_ROCKET
        this.controlRocket = scene.add.image(1388, 666, "controlRocket").setDepth(2)
        .setInteractive()
        .on('pointerdown', () => this.CheckWear(0))
        .on('pointerup', () => this.HighlightController(this.controlRocket, true) )
        .on('pointerover', () => this.HighlightController(this.controlRocket, true) )
        .on('pointerout', () => this.HighlightController(this.controlRocket, false) );		
		// ui_T_control_TERR
        this.controlTerr = scene.add.image(1506, 666, "controlTerr").setDepth(2)
        .setInteractive()
        .on('pointerdown', () => this.CheckWear(1))
        .on('pointerup', () => this.HighlightController(this.controlTerr, true) )
        .on('pointerover', () => this.HighlightController(this.controlTerr, true) )
        .on('pointerout', () => this.HighlightController(this.controlTerr, false) );

        //Textos desgaste
        this.wearTxt = new Array(4);
        for (var i=0; i < maquinas.length; i++) {

            this.wearTxt[i] = scene.add.text(800, 200, Math.round((maquinas[i].wear/maquinas[i].maxWear)*100)+"%",{
                fontSize:'35px',
                fill:'#ffffff',
                fontStyle:'bold',
            }).setOrigin(0.5).setDepth(5);
        }
        this.wearTxt[0].setPosition(this.controlRocket.x, this.controlRocket.y).setVisible(false);
        this.wearTxt[1].setPosition(this.controlTerr.x, this.controlTerr.y).setVisible(false);
        this.wearTxt[2].setPosition(this.controlCom.x, this.controlCom.y).setVisible(false);
        this.wearTxt[3].setPosition(this.controlMina.x, this.controlMina.y).setVisible(false);

        this.comboNums = new Array(8);
        this.TxtComboNums = scene.add.text(this.controlKey.x, this.controlKey.y+2, "00000000",{
            fontSize:'35px',
            fontStyle:'bold',
            fill:'#ffffff',
        }).setOrigin(0.5).setDepth(5).setVisible(false);

        this.nWear = 0;

        //Combo números
        this.actualComboNum;
        this.scene.input.keyboard.on('keycombomatch', function (event) {
            if (event.size > 3) {

                that.TxtComboNums.setVisible(false);
                that.tweenShowWearIN();

                that.actualComboNum = null;
                ////console.log("Combo numeritos");
            }
                
        });

        //Texto eventos metereologicos
        this.TxtEvents = scene.add.text(this.pantalla.x, this.pantalla.y+160, "GUNGINGAN",{
            fontSize:'28px',
            fontStyle:'bold',
            fill:'#D52020',
        }).setOrigin(0.5).setDepth(5).setVisible(false);
        
    }

    Update(delta) {

        if (objCohete.goLand)
            controlTierra.Land(delta);
        
        if (this.goTakeOff)
            controlTierra.TakeOff(delta);

        //Desgaste textos
        for (var i=0; i < maquinas.length; i++) {
            this.wearTxt[i].setText(Math.round((maquinas[i].wear/maquinas[i].maxWear)*100)+"%");
        }

        
        
    }

    Highlight(obj, b) {

        b ? obj.tint = Phaser.Display.Color.GetColor(139, 139, 139) : obj.tint = Phaser.Display.Color.GetColor(255, 255, 255);  
    }

    HighlightController(obj, b) {

        if (maquinas[2].isBroken) {

            this.HighlightError(obj, b)
        }
        else {

            this.Highlight(obj, b)
        }
    }
    HighlightError(obj, b) {

        b ? obj.tint = Phaser.Display.Color.GetColor(213, 32, 32) : obj.tint = Phaser.Display.Color.GetColor(255, 255, 255);  
    }

    //Funciones sistema de paquetería//
    Land(delta) {

        this.rocket.y += delta/6;
        if (this.rocket.y >= this.rocketY) {
            
            this.rocket.y = this.rocketY;
            this.PushFromMars();
            objCohete.goLand = false;

            this.rocket.anims.play("movimientoCoheteReverse");
        }
    }

    TakeOff(delta) {

        this.rocket.y -= delta/3;
        if (this.rocket.y <= -600) {
            
            this.rocket.y = -600;
            this.goTakeOff = false;
            estacionTransporte.isComing = true;
            estacionTransporte.loadOfEarth = true;
            //Aterriza en marte
            sfx.sounds[12].play();
        }
    }

    //Descargar el cohete de rocas
    Unload() {

        var timeDelay = 0;
        for (var i=0; i < this.maxSize; i++) {

            this.cargaPayloads[i].UnloadFromRocket(timeDelay);
            timeDelay+= 100;
        }
        this.cargaPayloads.splice(i, this.size);
        this.typeOfLoad = 1;
        this.size = 0;
    }

    PushFromMars() {

        for (var i=0; i < this.maxSize; i++) {

            this.cargaPayloads[i] = new Payload(this.scene, this.payloadsPosX, this.payloadsPosY - (i*35), 2);
        }
        this.typeOfLoad = 0;
        this.size = this.maxSize;
    }

    StartTransform(n) {
        var obj;
        //GIVE ME DA JUIIIIICEEEEE
        switch (n){
            case 0: 
            this.obj = this.ddrBtnMat;
            this.scene.tweens.add({
                targets: this.obj,
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 50,
                ease: 'Expo.easeIn',
                yoyo:true
            });
            break;
            case 1: 
            this.obj = this.ddrBtnComida;
            this.scene.tweens.add({
                targets: this.obj,
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 50,
                ease: 'Expo.easeIn',
                yoyo:true
            });break;
        }
    
        

        if (this.counterRoc > 0) {

            if (this.actualComboFlechas != null)
                this.actualComboFlechas.destroy();

            if(n === 1) {

                this.nObj = 0;
            }
            else {

                this.nObj = 1;
            }

            var nrand;
            for (var i=0; i<3; i++) {

                nrand = Phaser.Math.Between(0,3);
                this.ddrFlechas[i].setVisible(true);

                switch(nrand) {

                    //UP
                    case 0:
                        this.ddrFlechas[i].setRotation(Math.PI);
                        this.combokeys[i] = 38;
                    break;
                    //RIGHT
                    case 1:
                        this.ddrFlechas[i].setRotation(-Math.PI/2);
                        this.combokeys[i] = 39;
                    break;
                    //DOWN
                    case 2:
                        this.ddrFlechas[i].setRotation(0);
                        this.combokeys[i] = 40;
                    break;
                    //LEFT
                    case 3:
                        this.ddrFlechas[i].setRotation(Math.PI/2);
                        this.combokeys[i] = 37;
                    break;
                    
                }
                
            }

            this.actualComboFlechas = this.scene.input.keyboard.createCombo(this.combokeys,{resetOnWrongKey: false, deleteOnMatch: true});
        }
        
    }

    Transform (obj) {

        obj.tint = Phaser.Display.Color.GetColor(255, 255, 255)

        if(obj === this.ddrBtnComida) {

            this.counterCom++;
            this.txtCounterCom.setText(this.counterCom);

            //toDestroy = this.cargaPayloads[0];
            //this.cargaPayloads[0].obj.destroy();
        }
        else if(obj === this.ddrBtnMat){

            this.counterMat++;
            this.txtCounterMat.setText(this.counterMat);
        }
    }

    PutOn(n, obj) {
        //tween boton
        this.scene.tweens.add({
            targets: obj,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 50,
            ease: 'Expo.easeIn',
            yoyo:true
        });
        if (n === 1) {

            var counter = this.counterCom;
        }
        else {

            var counter = this.counterMat;
        }

        if (!this.wait && this.size < this.maxSize && this.typeOfLoad === 1 && counter > 0) {

            obj.tint = Phaser.Display.Color.GetColor(255, 255, 255)
            this.newPayloadType = n;
            if (this.newPayloadType === 1) {

                objCohete.comLoad += MAX_COMIDA*0.05;
            }
            else{

                objCohete.matLoad += MAX_MATERIAL*0.05;
            }

            this.wait = true;
            this.tweenTube3On();
        }
        
    }

    //Añade un payload de comida o material al cohete
    AddToRocket() {

        this.zPayL = 0;
        if (this.size > 0) {

            for (var i = 0; i < this.size; i++) {
                
                this.cargaPayloads[i].MoveUp();
            }
        }
        else {

            this.CreateNewPayload();
        }
        
        
    }

    //
    CreateNewPayload() {
        if (this.zPayL === 0){
            var newPayload = new Payload(this.scene, this.payloadsPosX, this.payloadsPosY, this.newPayloadType);
            this.cargaPayloads.unshift(newPayload);
            this.size++;

            this.zPayL++;
            this.wait = false;
        }
        
    }

    Send(obj) {
        this.scene.tweens.add({
            targets: obj,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 50,
            ease: 'Expo.easeIn',
            yoyo:true
        });
        if (this.size === this.maxSize && this.typeOfLoad === 1 && !this.goTakeOff) {
            sfx.sounds[11].play();
            obj.tint = Phaser.Display.Color.GetColor(255, 255, 255)

            var delay = 0;
            for (var i = 0; i < this.size; i++) {

                this.cargaPayloads[i].Dissapear(delay, i, this.maxSize);
                delay += 100;
            }
            this.cargaPayloads.splice(i, this.size);
            this.size = 0;
            this.typeOfLoad = -1;

            this.tweenLanzPuertaExtIn()

            //Pulsar botón para cuenta atrás
            sfx.sounds[0].play();
        }
        
    }

    //Funciones sistema de check de desgaste//

    CheckWear(n) {
        var obj;
        //JUICEEE
        switch (n){
            case 0: 
            this.obj = this.controlRocket;
            this.scene.tweens.add({
                targets: this.obj,
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 50,
                ease: 'Expo.easeIn',
                yoyo:true
            });
            break;
            case 1: 
            this.obj = this.controlTerr;
            this.scene.tweens.add({
                targets: this.obj,
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 50,
                ease: 'Expo.easeIn',
                yoyo:true
            });break;
            case 2: 
            this.obj = this.controlCom;
            this.scene.tweens.add({
                targets: this.obj,
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 50,
                ease: 'Expo.easeIn',
                yoyo:true
            });
            break;
            case 3: 
            this.obj = this.controlMina;
            this.scene.tweens.add({
                targets: this.obj,
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 50,
                ease: 'Expo.easeIn',
                yoyo:true
            });break;
        }

        if (!maquinas[2].isBroken) {

            if (this.actualComboNum != null)
                this.actualComboNum.destroy();

            this.nWear = n;

            var nrand;
            var nums = new Array(8);
            for (var i=0; i<this.comboNums.length; i++) {

                nrand = Phaser.Math.Between(0,9);
                switch(nrand) {
                    case 0: this.comboNums[i] = 96; break;
                    case 1: this.comboNums[i] = 97; break;
                    case 2: this.comboNums[i] = 98; break;
                    case 3: this.comboNums[i] = 99; break;
                    case 4: this.comboNums[i] = 100; break;
                    case 5: this.comboNums[i] = 101; break;
                    case 6: this.comboNums[i] = 102; break;
                    case 7: this.comboNums[i] = 103; break;
                    case 8: this.comboNums[i] = 104; break;
                    case 9: this.comboNums[i] = 105; break;
                }

                nums[i] = nrand;
            }

            this.TxtComboNums.setVisible(true);
            this.TxtComboNums.setText(nums[0] + "" + nums[1] + "" + nums[2] + "" + nums[3]
                + "" + nums[4] + "" + nums[5] + "" + nums[6] + "" + nums[7]);

            this.actualComboNum = this.scene.input.keyboard.createCombo(this.comboNums,{resetOnWrongKey: false, deleteOnMatch: true});
        }
        
    }

    //Funciones eventos metereológicos
    WarnEvent(n) {

        this.TxtEvents.setVisible(true);
        sfx.sounds[14].play();
        ////console.log("warninnnn"+this.TxtEvents.alpha);
        //Meteoritos
        if (n === 0) {

            this.TxtEvents.setText("METEORITES APPROACHING")
            this.tweenTxtEventsIN(n);
        }
        else {

            this.TxtEvents.setText("A STORM IS CLOSING IN")
            this.tweenTxtEventsIN(n);
        }


    }

    //Tweenings
    //Texto eventos
    tweenTxtEventsIN(n) {

        var that = this;

        if (n === 0) {

            this.scene.tweens.add({
                targets: this.TxtEvents,
                scale: 1.3,
                duration: 500,
                ease: 'Cubic.easeOut',
                repeat: 22,
                yoyo: true,
    
                //onStart: function () {that.wearTxt[that.nWear].setVisible(true); that.wearTxt[that.nWear].alpha = 1;},
                onComplete: function() {that.tweenTxtEventsOUT();},
            });
        }
        else {

            this.scene.tweens.add({
                targets: this.TxtEvents,
                scale: 1.3,
                duration: 500,
                ease: 'Cubic.easeOut',
                repeat: 35,
                yoyo: true,
    
                //onStart: function () {that.wearTxt[that.nWear].setVisible(true); that.wearTxt[that.nWear].alpha = 1;},
                //onComplete: function() {that.tweenTxtEventsOUT()},
            });
        }
    
    }
    tweenTxtEventsOUT() {

        var that = this;
        this.scene.tweens.add({
            targets: this.TxtEvents,
            alpha: 0,
            duration: 2000,
            ease: 'Cubic.easeOut',
            repeat: 0,
            yoyo: false,

            //onStart: function () {that.wearTxt[that.nWear].setVisible(true); that.wearTxt[that.nWear].alpha = 1;},
            onComplete: function() {that.TxtEvents.setVisible(false); that.TxtEvents.alpha = 1; sfx.sounds[14].stop();},
        });

        var rand = Phaser.Math.Between((1000*60),(1000*60)*2.5);
        maquinas[2].event = this.scene.time.addEvent({ delay: rand, callback: maquinas[2].StartEvent, callbackScope: maquinas[2]});
    }

    //Mostrar estado máquina
    tweenShowWearIN() {

        this.wearTxt[this.nWear].setVisible(true);
        var that = this;
        this.scene.tweens.add({
            targets: this.wearTxt[this.nWear],
            alpha: 0,
            duration: 12000,
            ease: 'Cubic.easeOut',
            repeat: 0,
            yoyo: false,

            onStart: function () {that.wearTxt[that.nWear].setVisible(true); that.wearTxt[that.nWear].alpha = 1;},
            onComplete: function() {that.wearTxt[that.nWear].setVisible(false);},
        });
        
    }


    //Compuerta lanzadera salida exterior
    tweenLanzPuertaExtIn() {

        this.countLanz = 0;
        this.scene.tweens.add({
            targets: this.lanzPuertaOut,
            x: this.lanzPuertaOut.x+220,
            duration: 700,
            ease: 'Cubic.easeOut',
            repeat: 0,
            yoyo: false,

            onComplete: this.tweenLanzPuertaExtOut.bind(this)
        });
        
    }

    tweenLanzPuertaExtOut() {
        
        this.scene.tweens.add({
            targets: this.lanzPuertaOut,
            x: this.lanzPuertaOut.x-220,
            duration: 500,
            ease: 'Cubic.easeOut',
            repeat: 0,
            delay: 3500,
            yoyo: false,
        });  
    }

    //Compuerta lanzadera entrada rocas
    tweenLanzPuertaIn() {

        if (this.size === this.maxSize && this.typeOfLoad === 0) {

            this.countLanz = 0;
            this.scene.tweens.add({
                targets: this.unloadRocketBtn,
                rotation: -1.7,
                duration: 500,
                ease: 'Cubic.easeOut',
                repeat: 0,
                yoyo: false,

                onCompleteDelay: 150,
                onComplete: this.Unload.bind(this)
            });
        }else{
            this.scene.tweens.add({
                targets: this.unloadRocketBtn,
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 50,
                ease: 'Expo.easeIn',
                yoyo:true
            });
        }
    }

    tweenLanzPuertaOut() {
        
        if (this.countLanz === 0) {

            this.scene.tweens.add({
                targets: this.unloadRocketBtn,
                //x: this.unloadRocketBtn.x+220,
                rotation: 0,
                //scaleX: 1,
                duration: 500,
                ease: 'Cubic.easeOut',
                repeat: 0,
                yoyo: false,
            });

            this.countLanz ++;
        }
            
    }

    //Tubería de rocas
    tweenTube1On() {
        sfx.sounds[10].play();
        this.counterRoc++;
        this.txtCounterRoc.setText(this.counterRoc);

        this.tweenT3 = this.scene.tweens.add({
            targets: this.ddrBaseTubo,
            scale: 1.3,
            duration: 100,
            ease: 'Elastic.easeOut',
            repeat: 0,
            yoyo: false,

            onComplete: this.tweenTube1Off.bind(this)
        });

        
    }

    tweenTube1Off() {
        this.scene.tweens.add({
            targets: this.ddrBaseTubo,
            scale: 1,
            duration: 1000,
            ease: 'Elastic.easeOut',
            repeat: 0,
            yoyo: false,

            onComplete: this.tweenLanzPuertaOut.bind(this)
        });
    }

    //Tuberia transformar rocas en mat/com
    tweenTube2On() {
        sfx.sounds[10].play();
        this.scene.tweens.add({
            targets: this.paqBaseTubo,
            scale: 1.3,
            duration: 300,
            ease: 'Expo.easeIn',
            repeat: 0,
            yoyo: false,

            onComplete: this.tweenTube2Off.bind(this),
        });

        
    }

    tweenTube2Off(n) {

        if (this.nObj === 0) {
            this.counterCom++;
            this.txtCounterCom.setText(this.counterCom);
        }
        else {
            this.counterMat++;
            this.txtCounterMat.setText(this.counterMat);
        }

        this.scene.tweens.add({
            targets: this.paqBaseTubo,
            scale: 1,
            duration: 1000,
            ease: 'Expo.easeOut',
            repeat: 0,
            yoyo: false,

            //onComplete: this.tweenLanzPuertaOut.bind(this)
        });
    }

    //Tubo pasarela
    tweenTube3On() {
        sfx.sounds[10].play();
        if (this.newPayloadType === 1) {

            this.counterCom--;
            this.txtCounterCom.setText(this.counterCom);
        }
        else {

            this.counterMat--;
            this.txtCounterMat.setText(this.counterMat);
        }
        

        this.scene.tweens.add({
            targets: this.paqPasarela,
            scale: 1.4,
            duration: 100,
            ease: 'Expo.easeIn',
            repeat: 0,
            yoyo: true,

            onComplete: this.tweenTube3Off.bind(this),
        });

        
    }

    tweenTube3Off() {
        this.AddToRocket();

        this.scene.tweens.add({
            targets: this.paqPasarela,
            scale: 1,
            duration: 600,
            ease: 'Expo.easeOut',
            repeat: 0,
            yoyo: false,

            //onComplete: this.tweenLanzPuertaOut.bind(this)
        });
    }
}

