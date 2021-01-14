var sfx = undefined;
var soundtrack = undefined;
 //"http://193.161.193.99:24953";//"http://localhost:8080"; //"http://193.161.193.99:63511";

var urlServer = "http://193.161.193.99:63511";

class SceneBoot extends Phaser.Scene {
    
    constructor() {

        super("SceneBoot");
    }

    preload(){
        //Scene Contact
        this.load.image("tablon", directory+"tablon.png");
        this.load.image("jacks", directory+"jacks.png");
        this.load.image("sofi", directory+"sofi.png");
        this.load.image("pepe", directory+"pepe.png");
        this.load.image("manu", directory+"manu.png");

        this.load.spritesheet('userImages', directory+'User_images.png', { frameWidth: 1134, frameHeight: 964 });
        //Scene Menu
        //this.load.image("bckMenu", directory+"spaceYmenu_bck.png");
        this.load.image("spaceYlogo", directory+"spaceYmenu.png");
        this.load.image("earthLogo", directory+"spaceYmenuEarth.png");
        //Scene Options
         this.load.image("radio", directory+"radio.png");
         this.load.image("altavoces", directory+"altavoces.png");
        //SceneGame//
        this.load.image("player", directory+"vulp_i1.png");
        this.load.image("marte", directory+"marte test.png");
        this.load.image("barra", directory+"barra.png");
        
        this.load.spritesheet('componentes', directory+'componente test.png', { frameWidth: 93, frameHeight: 46 });
        this.load.spritesheet('stelonauta_idle', directory+'spritesheet_idle_repintado.png', { frameWidth: 361, frameHeight: 361 });
        this.load.spritesheet('stelonauta_run', directory+'spritesheet_run_repintado.png', { frameWidth: 361, frameHeight: 413 });
        
        //UI MARTE
        this.load.image("fondoMarte", directory+"ui_M_bck.png" );
        this.load.image("nube", directory+"ui_M_nubes.png" );
        this.load.image("teclaAccion", directory+"ui_M_actionbox.png" );
        this.load.image("alertaMeteorito", directory+"ui_M_meteorito.png" );
        this.load.image("Meteorito", directory+"meteorito.png" );
        this.load.image("terraformLevel", directory+"ui_M_terrafomlevel.png" );
        this.load.image("alertaPeligro", directory+"ui_M_dangerArrow.png" );
        this.load.image("timerSegundos", directory+"ui_M_segundos.png" );
        this.load.image("timerMinutos", directory+"ui_M_minutos.png" );
        this.load.image("timeHoras", directory+"ui_M_horas.png" );
        //this.load.image("indicadorRocas", directory+"ui_M_rocas.png" );
        //this.load.image("indicadorO2", directory+"ui_M_o2.png" );
        //this.load.image("indicadorMateriales", directory+"ui_M_materiales.png" );
        //this.load.image("indicadorHambre", directory+"ui_M_hambre.png" );
        this.load.spritesheet("indicadores", directory+"M_indicators.png", { frameWidth: 145, frameHeight: 145 });
        this.load.image("flechasAmarillas", directory+"FlechasAmarillas.png" );
        
        //UI TIERRA
        this.load.image("fondoTierra", directory+"ui_T_bck.png" );
        this.load.image("lanzadera", directory+"ui_T_Lanzadera.png" );
        this.load.image("lanzaderaPuerta", directory+"ui_T_Lanzadera_door.png" );
        this.load.image("lanzaderaPuertaRecursos", directory+"ui_T_Lanzadera_door_2.png" );
        this.load.image("lanzaderaCountdown", directory+"ui_T_countdown.png" );
        /*this.load.image("cargaMateriales", directory+"ui_T_payload_materiales.png" );
        this.load.image("cargaRocas", directory+"ui_T_payload_rocas.png" );
        this.load.image("cargaO2", directory+"ui_T_payload_o2.png" );
        this.load.image("cargaComida", directory+"ui_T_payload_comida.png" );*/
        this.load.spritesheet("payloads", directory+"ui_T_payloads.png", { frameWidth: 44, frameHeight: 29 });
        this.load.image("paqueteriaBase", directory+"ui_T_Paqueteria_contadores.png" );
        this.load.image("paqueteriaBaseTubo", directory+"ui_T_Paqueteria_contadores_tubo.png" );
        this.load.image("paqueteriaBotonComida", directory+"ui_T_Paqueteria_comida.png" );
        this.load.image("paqueteriaBotonO2", directory+"ui_T_Paqueteria_o2.png" );
        this.load.image("paqueteriaBotonMat", directory+"ui_T_Paqueteria_materiales.png" );
        this.load.image("paqueteriaBotonEnviar", directory+"ui_T_Paqueteria_enviar.png" );
        this.load.image("paqueteriaPasarela", directory+"ui_T_Paqueteria_pasarela.png" );
        this.load.image("ddrBaseTubo", directory+"ui_T_DDR1.png" );
        this.load.image("ddrBase", directory+"ui_T_DDR2.png" );
        this.load.image("ddrFlecha_0", directory+"ui_T_DDR_arrow.png" );
        this.load.image("ddrFlecha_1", directory+"ui_T_DDR_arrow.png" );
        this.load.image("ddrFlecha_2", directory+"ui_T_DDR_arrow.png" );
        this.load.image("ddrBotonMat", directory+"ui_T_DDR_materiales.png" );
        this.load.image("ddrBotonO2", directory+"ui_T_DDR_o2.png" );
        this.load.image("ddrBotonComida", directory+"ui_T_DDR_comida.png" );
        this.load.image("controlBase", directory+"ui_T_control_pannel.png" );
        this.load.image("controlKey", directory+"ui_T_control_key.png" );
        this.load.image("controlPass", directory+"ui_T_control_pass.png" );
        this.load.image("controlTerr", directory+"ui_T_control_TERR.png" );
        this.load.image("controlMina", directory+"ui_T_control_MINA.png" );
        this.load.image("controlRocket", directory+"ui_T_control_ROCKET.png" );
        this.load.image("controlCom", directory+"ui_T_control_COM.png" );
        this.load.image("pantalla", directory+"ui_T_pantalla.png" );
        this.load.image("pantallaMapa", directory+"ui_T_pantalla_plano.png" );
        this.load.image("rocket", directory+"ui_T_rocket.png" );
        this.load.image("antena", directory+"antena.png" );
        this.load.image("mina", directory+"mina.png" );
        this.load.image("terraformador", directory+"terraformador.png" );

        this.load.image("rocketRoto", directory+"cohete_roto.png" );
        this.load.image("rocketPolvo", directory+"cohete_polvo.png" );
        this.load.image("antenaRoto", directory+"antena_rota.png" );
        this.load.image("antenaPolvo", directory+"antena_polvo.png" );
        this.load.image("minaRoto", directory+"mina_rota.png" );
        this.load.image("minaPolvo", directory+"mina_polvo.png" );
        this.load.image("terraformadorRoto", directory+"terraformador_roto.png" );
        this.load.image("terraformadorPolvo", directory+"terraformador_polvo.png" );
        this.load.spritesheet("movimientoCohete", directory+"movimiento_cohete.png", { frameWidth: 225, frameHeight: 369 });
        this.load.spritesheet("movimientoAntena", directory+"movimiento_antena.png", { frameWidth: 575, frameHeight: 668 });
        this.load.spritesheet("movimientoTerraformador", directory+"movimiento_terraformador.png", { frameWidth: 943, frameHeight: 669 });
        this.load.spritesheet("movimientoMina", directory+"movimiento_mina.png", { frameWidth: 732, frameHeight: 583 });

        this.load.image("pantallaFinal", directory+"ui_T_pantalla_aux.png" );
        
        //TUTORIAL
        this.load.image('tutoBck', directory +'tutorial__bck.jpg');

        //CONDICIION VICTORIA DERROTA
        this.load.image('victoria', directory +'victoria .png');   //post it expandido
        this.load.image('derrota', directory +'derrota.png');   //post it expandido
        //POST IT
        this.load.image('postItExp', directory +'postitexpandido.png');   //post it expandido
        this.load.image('postIt', directory +'post_it.png'); //post it 


        //CHATBOX
        this.load.image('ChatBox_SendBtn',  directory +'Chatbox_SendButton.png');
        this.load.image('ChatBox_NewMsgIcon',  directory +'Chatbox_newmsg-04.png');
        this.load.image('ChatBox_ChatIcon',  directory +'Chatbox_writemsg-04.png');
        this.load.image('ChatBox_Base',  directory +'Chatbox_base.png');
        this.load.image('ChatBox_MsgBox',  directory +'Chatbox_msg-05.png');
        this.load.image('ChatBox_Frame',  directory +'Chatbox_Frame.png');
        this.load.image('ChatBox_GlobalIcon',  directory +'online.png');
        

        //REGISTER
        this.load.image('Register_Btn',  directory +'REGISTER_BUTTON-08.png');
        this.load.image('Register_Form',  directory +'Register_InputBox.png');
        this.load.image('Register_Arrow',  directory +'Register_NextImg.png');
        this.load.image('Register_Close',  directory +'close_button.png');
        
        //LOGIN
        this.load.image('Login_Btn',  directory +'LOGIN_BUTTON-08.png');
        this.load.image('Confirm_Btn',  directory +'CONFIRM_BUTTON-08.png');
        this.load.image('Logout_Btn',  directory +'logout_button-08.png');
        this.load.image('Login_Option',  directory +'Login_Button.png');    //icono que abre el login
        this.load.image('Login_Default',  directory +'login_picture.png');
        this.load.image('Login_Box',  directory +'Login_input.png');
        this.load.image('Login_Profile',  directory +'profile_holder-07.png');
        this.load.image('Login_Field',  directory +'field_input.png');

        //Placeholder partícula
        this.load.image('smoke', './Resources/Game/smoke_particle.png');
        this.load.image('polvo', './Resources/Game/dust_particle.png');



        //MUSICA
        this.load.audio('MusicMenu', ['./Resources/Audio/Music/space walk.ogg']);
        this.load.audio('MusicIngame', ['./Resources/Audio/Music/Pioneers meets Space.ogg']);
        this.load.audio('MusicTutorial', ['./Resources/Audio/Music/Roboxel - Space Music.ogg']);

        //Ambient noise
        this.load.audio('SfxTerraformer', ['./Resources/Audio/SFX/Mars/Machines/Terraformer.ogg']);
        this.load.audio('apolo11Ambient', ['./Resources/Audio/SFX/Common/apolo11Ambient.ogg']);

        //SFX
        this.load.audio('SfxWalk', ['./Resources/Audio/SFX/Mars/sfx_step_grass.ogg']);
        this.load.audio('SfxArrive', ['./Resources/Audio/SFX/Fanfare/arrive.ogg']);
        this.load.audio('SfxClick', ['./Resources/Audio/SFX/Common/click.ogg']);
        this.load.audio('SfxHover', ['./Resources/Audio/SFX/Common/hover.ogg']);
        this.load.audio('SfxLeave', ['./Resources/Audio/SFX/Fanfare/leave.ogg']);
        this.load.audio('SfxReceive', ['./Resources/Audio/SFX/Fanfare/receive.ogg']);
        this.load.audio('SfxSend', ['./Resources/Audio/SFX/Fanfare/send.ogg']);
        this.load.audio('SfxPipe', ['./Resources/Audio/SFX/Earth/pipe.ogg']);
        this.load.audio('SfxTakeOff', ['./Resources/Audio/SFX/Earth/space_ship.ogg']);
        this.load.audio('SfxLanding', ['./Resources/Audio/SFX/Mars/landing.ogg']);
        this.load.audio('SfxMeteorHit', ['./Resources/Audio/SFX/Mars/DeathFlash.ogg']);
        this.load.audio('SfxAlarm', ['./Resources/Audio/SFX/Mars/Alarm_Loop_01.ogg']);
        this.load.audio('SfxStorm', ['./Resources/Audio/SFX/Mars/windStorm.ogg']);
        //Fanfare
        this.load.audio('SfxWin', ['./Resources/Audio/SFX/Fanfare/win.ogg']);
        this.load.audio('SfxLose', ['./Resources/Audio/SFX/Fanfare/lose.ogg']);

        //Placeholder partícula
        this.load.image('smoke', './Resources/Game/smoke_particle.png');
        this.load.image('polvo', './Resources/Game/dust_particle.png');

        //APIs
        this.load.html('nameform', './src/Assets/nameform.html');
        this.load.html('formReg', './src/Assets/formRegistro.html');
        this.load.html('formChat', './src/Assets/formChat.html');

        var progressBox = this.add.graphics();
        var progressBar = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        var xx = game.config.width/2;
        var yy = game.config.height/2+300;
        progressBox.fillRect(xx-160, yy-25, 320, 50);

        this.load.on('progress', function (value) {
            //console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xED7C12, 1);
            progressBar.fillRect(xx-150, yy-15, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });
                    
        this.load.on('fileprogress', function (file) {
            //console.log(file.src);
            assetText.setText('Loading asset: ' + file.key);
            //assetText.setText('Loading asset: ' + file.src);
        });
        
        this.load.on('complete', function () {
            //console.log('complete');
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 + 270,
            text: '',//'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 +300,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 350,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);


        //this.load.on('complete',function(){ this.scene.start('SceneMenu');});
    }

    create() {
        sfx = {
            loop: true,
            volume: 0.5,
            sounds: [
                        this.sound.add('SfxClick'),     //[0]
                        this.sound.add('SfxHover'),
                        this.sound.add('SfxTerraformer'),
                        this.sound.add('SfxWalk'),
                        this.sound.add('SfxWin'),
                        this.sound.add('SfxLose'),      //[5]
                        this.sound.add('SfxArrive'),
                        this.sound.add('SfxLeave'),
                        this.sound.add('SfxReceive'),
                        this.sound.add('SfxSend'),
                        this.sound.add('SfxPipe'),      //[10]
                        this.sound.add('SfxTakeOff'),
                        this.sound.add('SfxLanding'),
                        this.sound.add('SfxMeteorHit'),
                        this.sound.add('SfxAlarm'),
                        this.sound.add('SfxStorm')      //[15]
                    ]
        };

        sfx.sounds.forEach(element => {
            element.volume = sfx.volume;
        });

        sfx.sounds[2].loop = sfx.loop;
        sfx.sounds[3].loop = sfx.loop;
        sfx.sounds[8].loop = true;
        sfx.sounds[14].loop = true;
        sfx.sounds[15].loop = true;
        sfx.sounds[12].volume = 0.3;
        sfx.sounds[2].volume = 0;
        sfx.sounds[8].volume = 0;

        soundtrack = {
            volume: 0.5,
            pistas: [
                        this.sound.add('MusicMenu'),
                        this.sound.add('MusicIngame'),
                        this.sound.add('MusicTutorial'),
                        this.sound.add('apolo11Ambient')
            ]
        };

        soundtrack.pistas.forEach(element =>{
            element.loop = true;
            element.volume = soundtrack.volume;
        });

        soundtrack.pistas[0].play();

        //Animaciones
        this.anims.create({
            key: 'stelonauta_idle',
            frames: this.anims.generateFrameNumbers('stelonauta_idle', { start: 0, end: 59 }),
            frameRate: 18,
            //repeat: 1,
        });

        this.anims.create({
            key: 'stelonauta_run',
            frames: this.anims.generateFrameNumbers('stelonauta_run', { start: 0, end: 20 }),
            frameRate: 30,
        });

        this.anims.create({
            key: 'movimientoTerraformador',
            frames: this.anims.generateFrameNumbers('movimientoTerraformador', { start: 0, end: 10 }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: 'movimientoAntena',
            frames: this.anims.generateFrameNumbers('movimientoAntena', { start: 0, end: 10 }),
            frameRate: 4,
            repeat: -1,
        });
        this.anims.create({
            key: 'movimientoMina',
            frames: this.anims.generateFrameNumbers('movimientoMina', { start: 0, end: 10 }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: 'movimientoCohete',
            frames: this.anims.generateFrameNumbers('movimientoCohete', { start: 0, end: 8 }),
            frameRate: 15,
            repeat: 0,
        });
        this.anims.create({
            key: 'movimientoCoheteReverse',
            frames: this.anims.generateFrameNumbers('movimientoCohete', { start: 8, end: 0 }),
            frameRate: 15,
            repeat: 0,
        });

        ////console.log("Acabé");
        this.scene.start('SceneMenu');
        this.scene.stop('SceneLogos');
    }
}
