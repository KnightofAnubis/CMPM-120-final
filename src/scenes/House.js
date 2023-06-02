class House extends Phaser.Scene {
    constructor() {
        super('houseScene');
        //velocity
        this.VEL = 100
    }

    create() {
        //background: tornado
        this.tornado = this.add.image(game.config.width/2, game.config.height/2, 'tornado', 0).setOrigin(0.5);

        //witch sprite
        this.witch = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'witch', 0).setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true, 1, 1, true);
        this.witch.body.setSize(50,50);



        //house shadow
        this.shadow = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'houseShadow', 0); 
        this.shadow.body.setCollideWorldBounds(true);
        //what the player needs to do...
        menuConfig.fontSize = '20px';
        menuConfig.color = '#ffffff';
        this.add.text(game.config.width/2, game.config.height/5.5 - borderUISize - borderPadding, "Press SPACE to Squash the Wicked Witch of the East!", menuConfig).setOrigin(0.5);

        //controls for house shadow WASD
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
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
        if(this.cursors.space.isDown){
            //house shadow 'zooms in' gets bigger
            this.physics.world.collide(this.shadow, this.witch, this.collision, null, this);
        }
    }

    collision(){
        //switch next scene
        this.witch.setVelocity(0,0);
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
            this.scene.start('ozScene');
        });    
    }
}