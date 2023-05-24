class Forest extends Phaser.Scene{
    constructor(){
        super('forestScene');
    }

    create() {
        //scene test without tilemap:
        this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, "This is the forest!", menuConfig).setOrigin(0.5);
        //variables
        this.bgSize = 3000;

        //add tile map
        
        //add characters


        //set camera viewports 
        const viewportW = game.config.width/2;
        const viewportH = game.config.height/2;
        const centerX = game.config.width/2;
        const centerY = game.config.height/2;
        //add( [x] [, y] [, width] [, height] [, makeMain] [, name])
        this.cam1 = this.cameras.main.setViewport(0, 0, viewportW, viewportH).setZoom(0.5);
        this.cam2 = this.cameras.add(centerX, 0, viewportW, viewportH).setZoom(0.5);
        this.cam3 = this.cameras.add(0, centerY, viewportW, viewportH).setZoom(0.5);
        this.cam4 = this.cameras.add(centerX, centerY, viewportW, viewportH).setZoom(0.5);
        // set camera bounds
        this.cam1.setBounds(0, 0, this.bgSize, this.bgSize);
        this.cam2.setBounds(0, 0, this.bgSize, this.bgSize);
        this.cam3.setBounds(0, 0, this.bgSize, this.bgSize);
        this.cam4.setBounds(0, 0, this.bgSize, this.bgSize);
        // assign camera follow target
        //this.cam1.startFollow(); //Dorothy
        //this.cam2.startFollow(); //Scarecrow
        //this.cam3.startFollow(); //Tin Man
        //this.cam4.startFollow(); //Lion
       

        // set up input
        this.cursors = this.input.keyboard.createCursorKeys();

        // DEBUG
        //console.log(this.cameras);
    }
    updata() {

    }

}