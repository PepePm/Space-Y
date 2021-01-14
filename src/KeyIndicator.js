class KeyIndicator {
    constructor(scene, x, y, k) {

        this.obj = scene.add.image(x, y, "teclaAccion").setVisible(false).setDepth(3);
        this.key = k;

        this.txt = scene.add.text(this.obj.x, this.obj.y-45, this.key,{
            fontFamily:'textFont',
            fontSize:'35px',
            fill:'#ffffff',
            fontStyle:'bold',
        }).setOrigin(0.5).setDepth(4);

        this.teclaTween = scene.tweens.add({
            targets: [this.obj],
            y: this.obj.y + 50,
            duration: 700,
            ease: 'Expo.easeIn',
            yoyo:true,
            repeat:-1,
            /*onYoyo: function(){
                scene.tweens.add({
                targets: [this.obj],
                scaleX: 1.2,
                scaleY: 1.2,
                delay:700,
                duration: 300,
                ease: 'Expo.easeOut',
                yoyo:true,
                repeat:2})}*/
        });

    }
    update ()
    {
        this.txt.y = this.obj.y-45;
    }
    setVisible(b) {

        this.obj.setVisible(b);
        this.txt.setVisible(b);
    }

    changeKey(k) {

        this.key = k;
        this.txt.setText(this.key);
    }
}

