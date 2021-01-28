class Bar {
    constructor(scene, x, y, n, max, scaleX, scaleY, color, withText) {

        this.obj = scene.add.sprite(x, y, "barra").setDepth(5);

        this.n = n; //no me acuerdo
        this.max = max; //valor maximo 
        
        this.obj.setOrigin(0, 0.5);
        this.obj.setScale((n/max)*scaleX, scaleY);

        this.ancho = scaleX;
        this.withText = withText;

        if (color != -1)    this.obj.tint = color;

        if (this.withText) {

            this.txt = scene.add.text(x-24, y-10, Math.round((n/max)*100)+'%',{
                fontSize:'40px',
                fontFamily:'textFont',
                fill: '#ffffff',
            }).setVisible(false).setDepth(6);
        }
        
    }

    setVisible(b) {

        this.obj.setVisible(b);
        if (this.withText)   this.txt.setVisible(b);
    }

    Update() {

        /*if (withText) {

            this.txt = scene.add.text(x-24, y-10, Math.round((n/max)*100)+'%',{
                fontSize:'40px',
                fill: '#ffffff',
            }).setVisible(false);
        }*/
        this.obj.scaleX = (this.n/this.max)*this.ancho;
        if (this.withText)  this.txt.setText(Math.round((this.n/this.max)*100)+'%');
    }

    SetColor(color) {

        if (color != -1)    this.obj.tint = color;
    }

}
