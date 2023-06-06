
class Munchkin extends Phaser.Scene {
    constructor() {
        super('munchkinScene');
        
        this.VEL = 100;
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
        const background = map.createLayer('Tile Layer 1', tileset, 0, 0);

        //dorothy
        this.dorothy = new playerChar(this, 0, 0, 'dorothy');

        
        //camera stuff
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.dorothy, true, 0.25, 0.25);
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        //for when bubble appears and what happens after...
        this.bubbleTimer = this.time.addEvent({
            delay: 8000,
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
        //new initialize score
        score = 0;
        this.scene.run('UIScene', {active: true});

        //collsion
        this.physics.world.on('overlap', (gameObject1, gameObject2, body1, body2) =>{
            gameObject2.onOverlap = false;
            if(gameObject2.texture.key == 'flower01'|| gameObject2.texture.key == 'flower02'||gameObject2.texture.key == 'flower03'){
                gameObject2.destroy();
                sceneEvents.emit('collectFlowers');
            }});
        
        this.nextFlower = this.sys.game.loop.time + 700;

       
        
    }
    
    update() {
        this.dorothy.update();
        if(this.flowers){    
            if(this.sys.game.loop.time > this.nextFlower){
                //this.time.delayedCall(Phaser.Math.Between(1000, 10000), () => {
                    let randomFlower = ['flower01', 'flower02', 'flower03'];
                    let pickFlower = Math.round(Math.random()* randomFlower.length);
                    var chosenFlower = randomFlower[pickFlower];
                    this.flowers.add(new flowers(this,
                        Math.floor(Math.random()*640), Math.floor(Math.random()*480),
                        chosenFlower,
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
            this.physics.moveToObject(this.bubble, this.dorothy);
        }   
    }

    goodWitch() {
        //enter bubble of the good witch
        this.bubble = this.physics.add.sprite(0, 0, 'bubble', 0);
        this.bubble.body.setVelocity(10, 10);
        
       this.time.delayedCall(14000, () => {
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

        
        
        this.time.delayedCall(16000, () => {
            this.music.pause();
            //play pop sound
            this.pop = this.sound.add('pop');
            this.pop.play();
            this.scene.start('forestScene');
        });
        
        
    }
}

