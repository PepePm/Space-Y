class Cloud {
    constructor(scene) {

        this.obj = scene.add.image(marte.x, marte.y, "nube");
        var orig = Phaser.Math.Linear(6, 8, Phaser.Math.Between(0,100)/100.0);
        this.obj.setOrigin(0.5, orig);
        this.obj.rotation = Phaser.Math.Linear(0, 2*Math.PI, Phaser.Math.Between(0,100)/100.0);

        this.speed = Phaser.Math.Linear(0.00005, 0.00015, Phaser.Math.Between(0,100)/100.0);
    }

    Update(){
        
        this.obj.rotation += this.speed;
    }


}