class Forest extends Phaser.Scene{
    constructor(){
        super('forestScene');
    }

    create() {
        //scene test without tilemap:
        this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, "This is the forest!", menuConfig).setOrigin(0.5);
    }
    updata() {

    }
}