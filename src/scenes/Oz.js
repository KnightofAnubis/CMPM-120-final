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
        this.anims.create({
            key: 'charUP',
            defaultTextureKey: 'dorothy',
                frames: [
                    `dorothy_10`,
                    `dorothy_9`,
                    `dorothy_11`,
                    `dorothy_9`,
                ],
                frameRate: 40,
                
        });
        this.anims.create({
            key: 'charDOWN',
            defaultTextureKey: 'dorothy',
                frames: [
                    `dorothy_1`,
                    `dorothy_0`,
                    `dorothy_2`,
                    `dorothy_0`,
                ],
                frameRate: 40,
        });
        this.anims.create({
            key: 'charRIGHT',
            defaultTextureKey: 'dorothy',
                frames: [
                    `dorothy_4`,
                    `dorothy_3`,
                    `dorothy_5`,
                    `dorothy_3`,
                ],
                frameRate: 40,
        });
        this.anims.create({
            key: 'charLEFT',
            defaultTextureKey: 'dorothy',
                frames: [
                    `dorothy_7`,
                    `dorothy_6`,
                    `dorothy_8`,
                    `dorothy_6`,
                ],
                frameRate: 40
        });

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.cameras.main.setZoom(2);
        
        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('tileset', 'tilesetImage');
        
        const floor = map.createLayer('Tile Layer 1', 'tileset', 0, 0);
        const wallStage = map.createLayer('Tile Layer 2', 'tileset', 0, 0);
        this.toto = new playerChar(this, 64, 448, 'dorothy', 'dorothy_0');
        this.cameras.main.startFollow(this.toto)
    }

    update() {
        this.toto.update();

    }
}
/*
    create() {
        //scene test without tilemap:
        this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, "This is Oz!", menuConfig).setOrigin(0.5);

        //for when bubble appears and what happens after...
        this.bubbleTimer = this.time.addEvent({
            delay: 1000,
            callback: this.goodWitch,
            callbackScope: this,
            loop: false
        });

    }

    update() {

        //moving bubble... represents the 'good witch'
        if(this.bubble){
            if(this.bubble.x > 320){
                this.bubble.x += -1.5;
                this.bubble.y += 1;
               
            } else{
                this.bubble.scaleX += .05;
                this.bubble.scaleY += .05;
                this.time.delayedCall(4000, () => {
                    //play pop sound
                    this.scene.start('forestScene');
                });
            }
        }
    }

    goodWitch() {
        this.bubble = this.add.image(640, 0, 'bubble', 0);
    }
}
*/
