
class Munchkin extends Phaser.Scene {
    constructor() {
        super('munchkinScene');
        
        this.VEL = 100;
    }

    create() {
        //scene test without tilemap:
        //this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, "This is Oz!", menuConfig).setOrigin(0.5);
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
        const background = map.createLayer('Tile Layer 1', tileset, 0, 0);

        //dorothy
        this.dorothy = new playerChar(this, 64, 448, 'dorothy', 'dorothy_0');

        //camera stuff
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.dorothy, true, 0.25, 0.25);
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        //for when bubble appears and what happens after...
        this.bubbleTimer = this.time.addEvent({
            delay: 1000,
            callback: this.goodWitch,
            callbackScope: this,
            loop: false
        });

    }

    update() {
        this.dorothy.update();
        if(this.bubble){
            this.bubble.x += -1.5;
            this.bubble.y += 1;
        }
        
    }

    goodWitch() {
        //enter bubble of the good witch
        this.bubble = this.add.image(640, 0, 'bubble', 0);

        this.time.delayedCall(4000, () => {
            //gets bigger
            this.basicTween = this.tweens.add({
                targets: this.bubble,
                scale: { from: 1, to: 10 },
                ease: 'Sine.easeInOut',
                duration: 2000,
                repeat: 1, 
                yoyo: false,
                hold: 1000,
            });
            this.basicTween.play();
        });

        
        
        this.time.delayedCall(8000, () => {
            //play pop sound
            this.scene.start('forestScene');
        });
        
        
    }
}

