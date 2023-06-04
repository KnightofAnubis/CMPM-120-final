class Oz extends Phaser.Scene {
    constructor() {
        super('ozScene');
        
        this.VEL = 100;
    }
    preload() {
        this.load.path = './assets/wiz/'
        this.load.image('tilesetImage', 'tileset.png');
        this.load.tilemapTiledJSON('tilemapJSON','wiz.json');
        this.load.path = './assets/'
        this.load.aseprite('dorothy', 'dorothy.png', 'dorothy.json');

    }

    create() {
        

    
        //input keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //camera
        this.cameras.main.setZoom(2);
        
        //tilemap
        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('tileset', 'tilesetImage');
        
        const floor = map.createLayer('Tile Layer 1', 'tileset', 0, 0);
        const wallStage = map.createLayer('Tile Layer 2', 'tileset', 0, 0);
        this.toto = new playerChar(this, 64, 448, 'dorothy');
        this.cameras.main.startFollow(this.toto)
    }

    update() {
        this.toto.update();
    }
}
