
class Munchkin extends Phaser.Scene {
    constructor() {
        super('munchkinScene');
        
        this.VEL = 100;
    }

    create() {
        //scene test without tilemap:
        //this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, "This is Oz!", menuConfig).setOrigin(0.5);
       
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
        this.dorothy = new playerChar(this, 64, 448, 'dorothy');

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

        //Background music
        this.sound.audioPlayDelay = 0.1;
        this.sound.loopEndOffset = 0.05;
        
        const loopMarker = {
            name: 'loop',
            start: 0,
            duration: 200,
            config: {
                volume: 0.1,
                loop: true
            }
        };

        this.music =  this.sound.add('munchkin');
        this.music.addMarker(loopMarker);
            this.music.play('loop', {
                delay: 0
            });
        
        //flower group
        this.flowers = this.add.group({
            classType: flowers,
            runChildUpdate: true,
        });
        this.physics.world.on('overlap', (gameObject1, gameObject2, body1, body2) =>{
            gameObject2.onOverlap = false;
            if(gameObject2.texture.key == 'flower01'){
                gameObject2.destroy();
            }});
        
        this.nextFlower = this.sys.game.loop.time + 700;

    }
    
    update() {
        this.dorothy.update();
        if(this.flowers){    
            if(this.sys.game.loop.time > this.nextFlower){
                //this.time.delayedCall(Phaser.Math.Between(1000, 10000), () => {
                    this.flowers.add(new flowers(this,
                        Math.floor(Math.random()*640), Math.floor(Math.random()*480),
                        'flower01',
                    ));
                    this.nextFlower = this.sys.game.loop.time + 700;
                //});
            }
        }
        if(this.dorothy.body.onOverlap){
            this.physics.world.overlap(this.dorothy, this.flowers);
        }
        this.physics.world.collide(this.dorothy, this.flowerGroup, this.flowerCollision, null, this);
        if(this.bubble){
            this.bubble.x += -1.5;
            this.bubble.y += 1;
        }
        
    }

    goodWitch() {
        //enter bubble of the good witch
        this.bubble = this.add.image(640, 0, 'bubble', 0);

        this.time.delayedCall(8000, () => {
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

        
        
        this.time.delayedCall(12000, () => {
            this.music.pause();
            //play pop sound
            this.pop = this.sound.add('pop');
            this.pop.play();
            this.scene.start('forestScene');
        });
        
        
    }
}

