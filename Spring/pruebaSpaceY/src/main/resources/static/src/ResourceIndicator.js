class ResourceIndicator {
    constructor(scene, x, y, nInd, size, max) {

        this.obj = scene.add.image(x, y, "indicadores", nInd);

        this.size = size;
        this.maxSize = max;
        
        if (nInd != 3) {

            this.txt = scene.add.text(this.obj.x, this.obj.y-12, Math.round((this.size/this.maxSize)*100)+'%',{
                fontFamily:'textFont',
                fontSize:'25px',
                fill:'#ffffff',
                
            });
        } 
        else {

            this.txt = scene.add.text(this.obj.x, this.obj.y, Math.round((this.size/this.maxSize)*100)+'%',{
                fontFamily:'textFont',
                fontSize:'45px',
                fill:'#ffffff',
            }).setOrigin(0.5);
        }
        
    }

    //Actualiza texto de los indicadores
    Update() {
        this.txt.setText(Math.round((this.size/this.maxSize)*100)+'%');
    }

}

