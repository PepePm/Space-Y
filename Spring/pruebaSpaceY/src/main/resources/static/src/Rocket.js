class Rocket {
    constructor(scene, x, y) {

        this.obj = scene.add.sprite(x, y, "movimientoCohete");
        this.obj.setOrigin(0.5, 2.5);
        this.obj.setScale(1);
        this.goLand = false;
        this.scene = scene;
        this.val = 0;

        this.comLoad = 0;
        this.matLoad = 0;
    }

    TakeOff(delta) {

        this.val += delta/2300;
        this.obj.setOrigin(0.5, 2.5+this.val);

        if (this.val > 2.5) {

            controlTierra.tweenLanzPuertaExtIn();
            estacionTransporte.isSending = false;
            estacionTransporte.location = 1;
            this.goLand = true;

            //Aterriza en tierra
            sfx.sounds[12].play();
        }
    }

    Land(delta) {

        this.val -= delta/2300;
        this.obj.setOrigin(0.5, 2.5+this.val);
        if (this.val <= 0) {

            this.val = 0;
            this.obj.setOrigin(0.5, 2.5+this.val);
            estacionTransporte.isComing = false;
            estacionTransporte.location = 0;
            estacionTransporte.loadOfEarth = true;

            this.obj.anims.play("movimientoCoheteReverse");
        }
    }

    //USALO COMO ES DEBIDO PEPE :D
 Rocketeing (object,scene, xPos, yPos, shake)
 {   
     var dir = 1;
     var loopTime = 10;
     var motion;    //landing - launching
     shake = 2;   //distancia de meneo, numeros bajos plis < 5
    
     if(yPos<0){    //si está lanzandose
         motion = 'Expo.easeOut';
        }
    else{   //si aterriza
            motion = 'Expo.easeIn'
        }
     scene.tweens.add({
         targets: object,
         props: {
             x: { value: 
                     function () { 
                     return xPos + (dir*=-1 )*shake;
                     },
                 ease:'Linear',
                 duration : loopTime, //cuanto mas bajo más potente
                 yoyo: true,    //ida y vuelta
                 repeat:-1,  // que se repita en bucle este ease en x
                 },
 
             y: { 
                 value: function () { 
                     return object.y -= yPos; 
                 },
                 ease: motion,
                 duration: yPos  //que el ease en y dure 3s
                 },
         },
         duration:100,  //que todo el tween dure 
         
         
     });
     
 }

}