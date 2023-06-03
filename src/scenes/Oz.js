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
        this.load.atlas('dorothy', 'dorothy.png', 'dorothy.json');
    }

    create() {
        //animations
        this.anims.create({
            key: 'charUP',
            frameRate: 40,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('dorothy', {
                start: `dorothy_9`,
                end: `dorothy_11`
            })

        });
        this.anims.create({
            key: 'charDOWN',
            frameRate: 40,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('dorothy', {
                start: `dorothy_0`,
                end: `dorothy_2`
            })

        });
        this.anims.create({
            key: 'charLEFT',
            frameRate: 40,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('dorothy', {
                start: `dorothy_6`,
                end: `dorothy_8`
            })

        });
        this.anims.create({
            key: 'charRIGHT',
            frameRate: 40,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('dorothy', {
                start: `dorothy_3`,
                end: `dorothy_5`
            })

        });
       
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

        //toto
        this.toto = new playerChar(this, 64, 448, 'dorothy', 'dorothy_0');
        
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.toto, true, 0.25, 0.25);
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
    }

    update() {
        this.toto.update();

    }
}
