class House extends Phaser.Scene {
    constructor() {
        super('houseScene');
        //velocity
        this.VEL = 100
    }

    create() {
        //background: tornado
        this.tornado = this.add.image(game.config.width/2, game.config.height/2, 'tornado', 0).setOrigin(0.5);
        
        //sound
        this.sound.audioPlayDelay = 0.1;
        this.sound.loopEndOffset = 0.05;
        
        const loopMarker = {
            name: 'loop',
            start: 0,
            duration: 5,
            config: {
                volume: 4,
                loop: true
            }
        };

        this.wind =  this.sound.add('wind');
        this.wind.addMarker(loopMarker);
            this.wind.play('loop', {
                delay: 0
            });
    


        //witch sprite
        //need to set it to follow a path... from cameralucida?
        this.witchPath = this.add.path(game.config.width-100, game.config.height/2); // start of path
        this.witchPath.circleTo(200);                // radius of circle path
        let s = this.witchPath.getStartPoint();   // get start point of path
        // add path follower: follower(path, x, y, texture [, frame])
        this.witch = this.add.follower(this.witchPath, s.x, s.y, 'witch').setScale(0.8);
        // start path follow with config
        this.witch.startFollow({
            from: 0,            // points allow a path are values 0–1
            to: 1,
            delay: 0,
            duration: 10000,
            ease: 'Power0',
            hold: 0,
            repeat: -1,
            yoyo: false,
            rotateToPath: true
        });
        this.physics.world.enable(this.witch);



        //house shadow
        this.shadow = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'houseShadow', 0); 
        this.shadow.body.setCollideWorldBounds(true);
        //what the player needs to do...
        menuConfig.fontSize = '20px';
        menuConfig.color = '#ffffff';
        this.add.text(game.config.width/2, game.config.height/5.5 - borderUISize - borderPadding, "Squash the Wicked Witch of the East!", menuConfig).setOrigin(0.5);

        //controls for house shadow WASD
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {

        //moving house shadow with WASD
        this.direction = new Phaser.Math.Vector2(0);
        if(keyA.isDown) {
            this.direction.x += -1;
        }else if(keyD.isDown){
            this.direction.x += 1;
        }
        if(keyW.isDown) {
            this.direction.y += -1;
        }else if(keyS.isDown){
            this.direction.y += 1;
        }
        this.direction.normalize();
        this.shadow.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);
       
        //squish the witch
        
        this.physics.world.collide(this.shadow, this.witch, this.collision, null, this);
        
    }

    collision(){
        //switch next scene
        this.witch.destroy();
        //house shadow 'zooms in' gets bigger
         this.basicTween = this.tweens.add({
            targets: this.shadow,
            scale: { from: 1, to: 10 },
            angle: { from: 0, to: 360 },
            ease: 'Sine.easeInOut',
            duration: 2000,
            repeat: 1, 
            yoyo: false,
            hold: 1000,
        });
        this.basicTween.play();
        this.time.delayedCall(2000, ()=>{
            this.wind.pause();
            this.scene.start('munchkinScene');
        });    
    }
}