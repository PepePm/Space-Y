//import meteorito from './meteorito.js';

//const { default: Machine } = require("./Machine");

//Variables
//Directorio imágenes
var directory = "./Resources/Game/";

var toDestroy;

//Interfaz
var movTxt = 2;    //Píxeles que se mueve el texto al hacer hovering
var counter;

//Inputs
var key_skipTutorial;

var startSfxRun = false;
/////////////////////
/* =========================== */
/*      TUTORIAL               */
var posicionesTutorial;
var rotOrden;
var textMarte = [
    'Welcome to Space Y\n\nPress Y to continue',
    '#',
    'ROCKET',
    'Here, the ROCKET takes off and lands',
    'It can only take off when its full of ROCKS',
    'To take off press H',
    '#',
    'QUARRY',
    'This mining device supplies your mission',//'Desplazate usando A y D a tu izquierda',
    'Press H to obtain ROCKS from the QUARRY',
    'The orange bar indicates how many ROCKS you are carrying',
    '#',
    'TERRAFORMER',
    'This machine allows habitability in Mars',
    'It transforms your ROCKS in TERRAFORMER energy',
    'Achieve 100% to accomplish your mission',
    '#',
    'COMMUNICATIONS',
    'Allows communication with Earth',
    'If its damaged Earth wont know when STORMS or METEORITES draw near',
    'To repair any machine press R',
    '#',
    'MISSION PROGRESS',
    'You can see the state of your terraforming mission here',
    'The green bar indicates PARTS. They make it easier to repair',
    'The red bar indicates FOOD. If you run out of it, its game over',
    '#',
    'If you have any doubt, CLICK the Post-it note',
    '$' //fin tutorial
];
//TEXTO EN TIERRA
var textTierra = [
    'Welcome to Space Y\n\nPress Y to continue',
    '#',
    'SHUTTLE',
    'Here, the ROCKET takes off and lands',
    'It can only take off when its full of RESOURCES (FOOD and PARTS)',
    'To empty it press on the green door below the rocket',
    '#',
    'DDR CONVERSOR',
    'Transforms resources by pressing the arrows',
    '1 ROCK = 1 FOOD or 1 PART',
    'If you get it wrong, that resource is lost',
    '#',
    'PARCEL SYSTEM',
    'Here the FOOD and PARTS are stored',
    'Press on FOOD/PART to insert 1 unit of that resource in the ROCKET',
    'When the ROCKET is full, you can send it take off by pressing here',
    '#',
    'CONTROL PANEL',
    'When one of these buttons is pressed, a combination will appear',
    'Type it in correcty to get a status report on that machine',
    'Communicate with the Stelonaut to support the mission',
    '#',
    'MISSION PROGRESS',
    'You can see the state of MARS here',
    'Only you can see when a STORM or METEORITES approach the planet',
    'Keep the Stelonaut informed for it to be warned about the hazards',
    '#',
    'If you have any doubt, CLICK the Post-it note',
    '$' //fin tutorial
];

var currentLine;
var tutoPosIndex;
var tutofondo;
var tutotextMarte;
var tutotextTierra;
var maskMarte;
var tutorialEnded;
var rotIndex;
/////////////////////

var music;


//Particulas
var emitterStorm;
var emitterMachines = []; // 0 - Cohete || 1 - Radio || 2 - Mina || 3 - Terraformador

//POST ITS
var postIt;
var postItExp;
var isbig = false;
class SceneTutorial extends Phaser.Scene {
    
    constructor() {

        super("SceneTutorial");
    }

    preload() {
        
        posicionesTutorial = {
            tierra : [
                new Phaser.Math.Vector2 (game.config.width/4,game.config.height/2), //welcome
                new Phaser.Math.Vector2 (963,365), //lanzadera
                new Phaser.Math.Vector2 (1108,793), // ddr
                new Phaser.Math.Vector2 (1219,574), //paqueteria
                new Phaser.Math.Vector2 (1447,676), //panel control
                new Phaser.Math.Vector2 (1337,250), //pantalla mision
                new Phaser.Math.Vector2 (game.config.width-90,100), //POST-IT
                new Phaser.Math.Vector2 (game.config.width/2,game.config.height/2) //fin tutorial
            ],
            marte: [
                new Phaser.Math.Vector2 (game.config.width/4*3,game.config.height/2), //welcome
                new Phaser.Math.Vector2 (game.config.width/4,game.config.height/2), //cohete
                new Phaser.Math.Vector2 (game.config.width/4,game.config.height/2), //mina
                new Phaser.Math.Vector2 (game.config.width/4,game.config.height/2), //terraformador
                new Phaser.Math.Vector2 (game.config.width/4,game.config.height/2), //comunicacion
                new Phaser.Math.Vector2 (game.config.width/4,game.config.height/2), //pantalla de mision
                new Phaser.Math.Vector2 (game.config.width-90,100), //POST-IT
                new Phaser.Math.Vector2 (game.config.width/2,game.config.height/2) //fin tutorial
            ],
            rotOrden:
            [
                0,  //welcome
                0,  //cohete
                0,
                0,
                Math.PI,   //mina
                0,
                0,
                0,
                -Math.PI/2,  //terraformador
                0,
                0,
                0,
                Math.PI,     //comunicacion
                0,
                0,
                0,
                0,  //pantalla de mision
                0,  //post it
                0,  //fin tutorial
                0,
                0,
                0,
            ]
        };
    }

    create() {

        nCoheteMat = MAX_COHETEMAT;
        nComida_M = MAX_COMIDA;
        nRocas_M = MAX_ROCAS*100;
        nMaterial_M = MAX_MATERIAL*100;

	    tutorialEnded = false;  //tutorial acabado

        currentLine = 0;
        rotIndex = 0;

        sfx.sounds[2].loop = sfx.loop;
        sfx.sounds[3].loop = sfx.loop;
        sfx.sounds[8].loop = true;
        sfx.sounds[14].loop = true;
        sfx.sounds[12].volume = 0.3;
        sfx.sounds[2].volume = 0;
        sfx.sounds[8].volume = 0;
        
        soundtrack.pistas[0].stop();
        soundtrack.pistas[1].play();
        soundtrack.pistas[3].play();

        //PLAY a los sonidos de las máquinas
        sfx.sounds[2].play();
        sfx.sounds[8].play();

        //MARTE
		// ui_M_bck
        fondoMarte = this.add.image(407, 450, "fondoMarte").setDepth(-2);

        //Inicialización planeta
        marte = this.add.image(game.config.width/4, 1250, "marte").setScale(3).setDepth(-2);

        //Cohete en Marte
        objCohete = new Rocket(this, marte.x, marte.y);

        //Inicialización máquinas
        maquinas = new Array(4);
        estacionTransporte = new StationMachine(this, marte.x, marte.y);
        terraformador = new TerraformMachine(this, marte.x, marte.y, 1);
        comunicaciones = new CommsMachine(this, marte.x, marte.y, 2);
        mina = new MineMachine(this, marte.x, marte.y, 3);
        maquinas[0] = estacionTransporte;
        maquinas[1] = terraformador;
        maquinas[2] = comunicaciones;
        maquinas[3] = mina;

        //Nubes
        nubes = new Array(N_NUBES);
        
        for(var i=0; i<N_NUBES; i++) {

            nubes[i] = new Cloud(this);
            
        }

        //
        meteoritos = new Array();

        //TIERRA
        controlTierra = new EarthControl(this, 0, 0, 8);
        //controlTierra.PushFromMars();
		
		
		
		
		// ui_M_actionbox: Tecla de acción
        //
		
		// ui_M_dangerArrow
		alertaPeligroIz = this.add.image(665, 365, "alertaPeligro").setVisible(false);
		
		// ui_M_dangerArrow_1
		alertaPeligroDc = this.add.image(144, 365, "alertaPeligro").setScale(-1,1).setVisible(false); // *************************************************FLIP EJE VERTICAL!
    
        //Contador tiempo restante
        counter = new Counter(this, 10*60);
        
        

        //jugador
        player = this.physics.add.sprite(marte.x,marte.y-620, 'stelonauta_idle').setScale(0.6);
        
 
        //Indicadores recursos
        indTerra = new ResourceIndicator(this, 401, 787, 3, nTerraformacion, MAX_TERRAFORMACION);
        indHam = new ResourceIndicator(this, 109, 74, 0, nComida_M, MAX_COMIDA);
        indRocas = new ResourceIndicator(this, 109, 166, 1, nRocas_M, MAX_ROCAS);
        indMat = new ResourceIndicator(this, 109, 256, 2, nMaterial_M, MAX_MATERIAL);

        
        

        //Cargamento cohete
        objCoheteMat = new Bar(this, game.config.width/4 - 120, player.y - 100, nCoheteMat, MAX_COHETEMAT, 0.5, 0.5, coheteMat_color, true);
        objCoheteMat.obj.setRotation(-1.57);

        //Barra de carga
        barraCarga = new Bar(this, player.x-40, player.y-50, nCarga, MAX_CARGA, 0.3, 0.5, -1, false);

        //Animaciones
        this.anims.create({
            key: 'stelonauta_idle',
            frames: this.anims.generateFrameNumbers('stelonauta_idle', { start: 0, end: 59 }),
            frameRate: 18,
            //repeat: 1,
        });

        this.anims.create({
            key: 'stelonauta_run',
            frames: this.anims.generateFrameNumbers('stelonauta_run', { start: 0, end: 21 }),
            frameRate: 18,
        });


        //Input events
        this.cursors = this.input.keyboard.createCursorKeys();
        key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A, false);
        key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, false);
        key_up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W, false);
        key_down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S, false);
        key_interact = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H, false);
        key_repair = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R, false);
        key_skipTutorial = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y, false);
        key_pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC, false);

        keyDev_victory = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M, false);
        keyDev_defeat = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N, false);


        
        //Genera meteoritos cada x ms (TESTING)
        //var timedEvent = this.time.addEvent({ delay: 3000, callback: genMeteors, callbackScope: this, loop: true });


        //PARTÍCULAS TORMENTA
        emitterStorm = this.add.particles('spark').createEmitter({
            x: {min: 0, max: 1500},
            y: 0,
            blendMode: 'COLOR',
            scale: { start: 0.2, end: 0 },
            tint: 0x50ff6a00,
            speedX: { min: -500, max: -900 },
            speedY: { min: 500, max: 1500 },
            quantity: 100,
            on: false
        });

        

        //Cohete        [0]
        emitterMachines[0] = this.add.particles('smoke');
        emitterMachines[0].createEmitter({
            x: 300,
            y: 300,
            blendMode: 'SCREEN',
            scale: { start: 0.2, end: 0 },
            speedX: { min: -200, max: 200 },
            speedY: { min: -100, max: -300 },
            quantity: 5,
            lifespan: 2000,
            on: false
        });
        
        emitterMachines[0].posX = emitterMachines[0].x;
        emitterMachines[0].posY = emitterMachines[0].y;

        //emitterMachines[0].startFollow(player);
///*
        //Radio         [1]
        emitterMachines[1] = this.add.particles('smoke');
        emitterMachines[1].createEmitter({
            x: 300,
            y: 300,
            blendMode: 'SCREEN',
            scale: { start: 0.2, end: 0 },
            speedX: { min: -200, max: 200 },
            speedY: { min: -100, max: -300 },
            quantity: 5,
            lifespan: 2000,
            on: false
        });
        
        emitterMachines[1].posX = emitterMachines[1].x;
        emitterMachines[1].posY = emitterMachines[1].y;
    

        //Mina          [2]
        emitterMachines[2] = this.add.particles('smoke');
        emitterMachines[2].createEmitter({
            x: 300,
            y: 300,
            blendMode: 'SCREEN',
            scale: { start: 0.2, end: 0 },
            speedX: { min: -200, max: 200 },
            speedY: { min: -100, max: -300 },
            quantity: 5,
            lifespan: 2000,
            on: false
        });
        
        emitterMachines[2].posX = emitterMachines[2].x;
        emitterMachines[2].posY = emitterMachines[2].y;
    

        //Terraformador [3]
        emitterMachines[3] = this.add.particles('smoke');
        emitterMachines[3].createEmitter({
            x: 300,
            y: 300,
            blendMode: 'SCREEN',
            scale: { start: 0.2, end: 0 },
            speedX: { min: -200, max: 200 },
            speedY: { min: -100, max: -300 },
            quantity: 5,
            lifespan: 2000,
            on: false
        });
        
        emitterMachines[3].posX = emitterMachines[3].x;
        emitterMachines[3].posY = emitterMachines[3].y;

        emitterMachines.forEach(element => {
            element.setDepth(-1);
        });

        //POST IT
        postIt = this.add.image(game.config.width-90,100, "postIt").setDepth(7)
        .setInteractive()
        .on('pointerdown', () => OpenPostIt(postIt,this))
        .on('pointerup', () => HighlightPostIt(postIt, true))
        .on('pointerover', () => HighlightPostIt(postIt, true))
        .on('pointerout', () => HighlightPostIt(postIt, false));	
        
        postItExp = this.add.image(game.config.width-100,100, "postItExp")
        .setDepth(7)
        .setScale(0.2)
        .setInteractive()
        .setVisible(false)
        .on('pointerdown', () => OpenPostIt(postItExp,this))
        .on('pointerup', () => HighlightPostIt(postItExp, true))
        .on('pointerover', () => HighlightPostIt(postItExp, true))
        .on('pointerout', () => HighlightPostIt(postItExp, false));
        
        
    //*/
        /*
        this.input.on('pointerDown', function (pointer) {
            //emitter.setPosition(Phaser.Math.Between(0, game.config.width), 0)
            emitterStorm.emitZoneIndex = 1;
            emitterStorm.active = false;
            //console.log("APAGA");
        });
        //*/
    
        /*
        this.input.on('pointerdown', function (pointer) {
            emitZoneIndex = (emitZoneIndex + 1) % emitZones.length;
            emitter.setEmitZone(emitZones[emitZoneIndex]);
            emitter.explode();
        });
        //*/
    
        //emitter.setEmitZone(emitZones[emitZoneIndex]); 
        initTutorial(this);
    
    }
    update(time, delta) {

        //*************************************** */
        //          UPDATE TUTORIAL
        //*********************************** */
        if (Phaser.Input.Keyboard.JustDown (key_skipTutorial)) {
            if(!tutorialEnded)
            {
                //Pasa una linea en ambas partes del tutorial y actualiza la posicion de las mascaras
                currentLine ++;
                if(textMarte[currentLine] == '#' || textTierra[currentLine] == '#')
                {
                    tutoPosIndex++;//avanzamos en la siguiente posicion de marte
                    currentLine ++; //avanzamos en lineas de tutorial
                }
                

                tutotextMarte.destroy();
                tutotextTierra.destroy();
                tutotextMarte = this.add.text (50,game.config.height-200,textMarte[currentLine],{ fill: '#ffffff',fontFamily:'textFont',fontSize: '16px'}).setDepth(10);
                tutotextTierra = this.add.text (game.config.width/2,game.config.height-200,textTierra[currentLine],{ fill: '#ffffff',fontFamily:'textFont',fontSize: '16px'}).setDepth(10)
                
                //Actualizamos rotaciones del personaje con la Y
                setRotations(posicionesTutorial.rotOrden, rotIndex)
                rotIndex++;
                //Aqui indicamos que tipo de máscara se va a usar y en que punto
                CrearMascara(this,
                    posicionesTutorial.marte[tutoPosIndex].x,
                    posicionesTutorial.marte[tutoPosIndex].y,
                    'c',

                    posicionesTutorial.tierra[tutoPosIndex].x,
                    posicionesTutorial.tierra[tutoPosIndex].y,
                    'c');
                // TWEENING de la máscara
                moverMascara(tutofondo.mask,this);
                if(textMarte[currentLine] == '$' || textTierra[currentLine] == '$')
                {
                    endTutorial(this,tutotextMarte,tutotextTierra,2000); //escena, texto 1, texto 2, t fade
                    tutorialEnded = true;
                }
            }
            
            
        }
        controlTierra.pantallaPlano.rotation+=delta/16000;
        //DEBUG PARTICULAS
        /*if (key_left.isDown) {
            //Apaga
            emitterStorm.on = false;
        }
        else if (key_right.isDown) {
            //Enciende
            emitterStorm.on = true;
        }*/

        //emitter.setPosition(Phaser.Math.Between(0, game.config.width), 0)
        //MARTE
        //Inputs
        //Movimiento de Marte

        /*if (key_left.isDown) {

            //Rotación de los elementos de Marte
            updateRotations(1, delta);
            //marte.rotation += 1*delta/1500*playerSpeed;
            //Cohete
            emitterMachines[0].posX = marte.x + 700 * Math.cos(-1.57 + marte.rotation);
            emitterMachines[0].posY = marte.y + 700 * Math.sin(-1.57 + marte.rotation);
            //Terraformador
            emitterMachines[1].posX = marte.x + 700 * Math.cos(3.14 + marte.rotation);
            emitterMachines[1].posY = marte.y + 700 * Math.sin(3.14 + marte.rotation);
            //Comunicaciones
            emitterMachines[2].posX = marte.x + 570 * Math.cos(marte.rotation);
            emitterMachines[2].posY = marte.y + 570 * Math.sin(marte.rotation);
            //Mina
            emitterMachines[3].posX = marte.x + 870 * Math.cos(1.57 + marte.rotation);
            emitterMachines[3].posY = marte.y + 870 * Math.sin(1.57 + marte.rotation);
            //emitterMachines[0].emitParticleAt(emitterMachines[0].posX, emitterMachines[0].posY);
        }
        else if (key_right.isDown) {
            
            //Rotación de los elementos de Marte
            updateRotations(-1, delta);
            //marte.rotation += -1*delta/1500*playerSpeed;
            //Cohete
            emitterMachines[0].posX = marte.x + 700 * Math.cos(-1.57 + marte.rotation);
            emitterMachines[0].posY = marte.y + 700 * Math.sin(-1.57 + marte.rotation);
            //Terraformador
            emitterMachines[1].posX = marte.x + 700 * Math.cos(3.14 + marte.rotation);
            emitterMachines[1].posY = marte.y + 700 * Math.sin(3.14 + marte.rotation);
            //Comunicaciones
            emitterMachines[2].posX = marte.x + 570 * Math.cos(marte.rotation);
            emitterMachines[2].posY = marte.y + 570 * Math.sin(marte.rotation);
            //Mina
            emitterMachines[3].posX = marte.x + 870 * Math.cos(1.57 + marte.rotation);
            emitterMachines[3].posY = marte.y + 870 * Math.sin(1.57 + marte.rotation);
            //emitterMachines[0].emitParticleAt(emitterMachines[0].posX, emitterMachines[0].posY);
        }
        else {

            player.anims.play('stelonauta_idle', true);
            
        }*/
        //if(maquina[i].isRota == true)
        /*  emitterMachines[0].emitParticleAt(emitterMachines[0].posX, emitterMachines[0].posY);
          emitterMachines[1].emitParticleAt(emitterMachines[1].posX, emitterMachines[1].posY);
          emitterMachines[2].emitParticleAt(emitterMachines[2].posX, emitterMachines[2].posY);
          emitterMachines[3].emitParticleAt(emitterMachines[3].posX, emitterMachines[3].posY);
        */
        ////console.log("Pos X: " + emitterMachines[0].posX + "\nPos Y: " + emitterMachines[0].posY);
        

        /*if ((key_left.isDown || key_right.isDown) && !startSfxRun) {
            startSfxRun = true;
            sfx.sounds[3].play();
        }
        if (key_left.isUp && key_right.isUp) {
            startSfxRun = false;
            sfx.sounds[3].stop();
        }*/

        //Meteoritos
        for(var i=0; i < meteoritos.length; i++) {
 
            meteoritos[i].Update();
        }
        
        //////////////////////////////
        //Interaccionar con máquinas//
        //////////////////////////////
        //Mostrar tecla interacción
        /*if (!(maquinas[0].canInteract() || maquinas[1].canInteract() || maquinas[2].canInteract() || maquinas[3].canInteract()) && maquinas[0].isSending) {

            teclaAccion.setVisible(false);
        }*/

        //Acciones de cada máquina
        for(i = 0; i < 4; i++) {

            maquinas[i].update(delta);
            if(maquinas[i].isBroken == true)
                emitterMachines[i].emitParticleAt(emitterMachines[i].posX, emitterMachines[i].posY);
        }

        ///////////
        //Pasivas//
        ///////////

        //Nubes
        for(var i=0; i<N_NUBES; i++) {
            nubes[i].Update();
        }

        //Desgaste máquinas//(mejor en sus clases)
        

        //Desgaste hambre//
        indHam.Update();


        //Pausa
        if (key_pause.isDown && !paused) {

            PauseMenuTuto(this);
            paused = true;
        }
        if (key_pause.isUp){

            paused = false;
        }

        //TIERRA
        controlTierra.Update(delta);

        if (keyDev_victory.isDown) {

            DefeatCondition(this);
        }
        if (keyDev_defeat.isDown) {

            VictoryCondition(this);
        }
    }

    
}

/*=============================== */
/*          TUTORIAL         */
/*=============================== */
function initTutorial(scene){
    //añadimos la pantalla negra
    tutoPosIndex = 0;
    tutofondo = scene.add.image(0,0,'tutoBck'); //añadimos capa grisalla
    tutofondo.setAlpha(0.8).setScale(2,2).setDepth(8);  //configuramos su visibilidad
    
    //Mostramos textos iniciales del tutorial
    tutotextMarte = scene.add.text (posicionesTutorial.marte[currentLine].x,posicionesTutorial.marte[currentLine].y,textMarte[currentLine],{ fill: '#ffffff',fontFamily:'textFont',fontSize: '16px'}).setDepth(10);
    tutotextTierra = scene.add.text (posicionesTutorial.tierra[currentLine].x,posicionesTutorial.tierra[currentLine].y,textTierra[currentLine],{ fill: '#ffffff',fontFamily:'textFont',fontSize: '16px'}).setDepth(10);

}
function endTutorial(scene,textM, textT,fadeOut)
{
    sfx.sounds.forEach(element => {
        element.stop();
    });
    

    textM.destroy();
    textT.destroy();
    tutofondo.clearMask();

    scene.tweens.add({
        targets: tutofondo,
        delay: 100,
        alpha:1,
        duration: fadeOut,
        ease: 'Expo.easeInOut',
        onComplete: scene.time.addEvent({ delay: fadeOut, callback: function(){
                                                                        key_left.destroy();
                                                                        scene.scene.stop('SceneTutorial');
                                                                        scene.scene.start('SceneMenu');
                                                                        soundtrack.pistas[2].stop();
                                                                        soundtrack.pistas[0].play();
                                                                    }, callbackScope: this})
    });
}

function PauseMenuTuto(that){

    sfx.sounds.forEach(element => {
        element.pause();
    });

    soundtrack.pistas[1].pause();
    soundtrack.pistas[3].pause();

    that.scene.launch('ScenePause');
    that.scene.pause('SceneTutorial');
}

function CrearMascara(scene,posXM,posYM,tipoM, posXT,posYT,tipoT){

    maskMarte = scene.make.graphics();  //dibujamos un grafico compuesto de dos formas

    switch (tipoM){ //FORMA DE MARTE
        case 's':
            //Mascara cuadrada marte
            maskMarte.fillStyle(000000,1);  //color y alpha
            maskMarte.fillRect(posXM,posYM,100,100);  //x, y,width height
            break;
        case 'c':
            //Mascara circular marte
            maskMarte.fillStyle(000000,1);  //color y alpha
            maskMarte.fillCircle(posXM,posYM,100);  //x, y, radio
            break;
    }
    maskMarte.moveTo(posXT,posYT);  //NOS DESPLAZAMOS PARA DIBUJAR

    switch (tipoT)  //FORMA EN TIERRA
    {   
        case 's':
            //mascara cuadrada tierra
            maskMarte.fillStyle(000000,1);  //color y alpha
            maskMarte.fillRect(posXT,posYT,100,100);  //x, y,width height
            ////console.log('letsgo');
            break;
        case 'c':
            //mascara circular  tierra
            maskMarte.fillStyle(000000,1);  //color y alpha
            maskMarte.fillCircle(posXT,posYT,100);  //x, y, radio
            break;
    }
    
    //Aplicamos sobre el fondo tutorfondo la mascara creada
    tutofondo.mask = new Phaser.Display.Masks.GeometryMask(scene, maskMarte);   //enmascaramos
    tutofondo.mask.setInvertAlpha (true);   //invertimos alpha para mostrar todo menos area indicada

}

function moverMascara(mask,scene) //x fposX, y = fposYcmask o smask
{
    scene.tweens.add({
        targets: mask,
        scaleX: 1.2,
        scaleY: 1.2,
        delay: 100,
        duration: 1000,
        ease: 'Expo.easeInOut',
        repeat: -1,
        yoyo: true,
        //delay:delay,
        //onComplete: this.EnterOnMachine.bind(this)
    });
}
function setRotations(rot,index)
{
    for(var i=0; i<N_NUBES; i++) {
        nubes[i].obj.rotation += rot[index];
    }
    for(var i=0; i < meteoritos.length; i++) {
        meteoritos[i].obj.rotation += rot[index];
    }
    
    marte.rotation+=rot[index];
    objCohete.obj.rotation +=rot[index];

    for (i=0; i<4; i++) {

        maquinas[i].obj.rotation+=rot[index];
        //Update sonidos
        var beta = maquinas[i].obj.rotation < 0 ? maquinas[i].obj.rotation * -1: maquinas[i].obj.rotation ;
        if(beta < 0.8)
        {
            var volumen = (0.8 - beta)/0.8;
            if(volumen<0.02)
                volumen = 0;
            switch(i)
            {
                case 0: //Cohete

                    break;
                case 1: //Terraformador
                case 3: //Mina
                    sfx.sounds[2].volume = volumen;
                    break;
                case 2: //Comunicaciones
                    sfx.sounds[8].volume = volumen;
                    break;
            }
            
        }
    }



}


 
        
