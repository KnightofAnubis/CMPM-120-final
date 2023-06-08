class Oz extends Phaser.Scene {
    constructor() {
        super('ozScene');
        
        this.VEL = 100;
        this.mapSize = 512;
    }
    preload() {
        

    }

    create() {
        //input keys
        this.cursors = this.input.keyboard.createCursorKeys();
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //camera
        this.cameras.main.setZoom(2);
        
        //tilemap
        const map = this.add.tilemap('tilemapWizJSON');
        const tileset = map.addTilesetImage('tileset', 'tilesetImage');
        
        const floor = map.createLayer('Tile Layer 1', 'tileset', 0, 0);
        const wallStage = map.createLayer('Tile Layer 2', 'tileset', 0, 0);
        this.toto = new playerChar(this, 64, 448, 'dorothy');
        this.cameras.main.setBounds(0,0, this.mapSize, this.mapSize);

        this.wiz = this.physics.add.sprite(this.mapSize/2, 96, 'demonOpen', 0).setOrigin(0.5, 1);
        this.wiz.scale = 1.4;
        this.cameras.main.startFollow(this.wiz);
        this.addParticles();
        console.log(this.wiz);

        this.fireball = this.add.group({
            classType: projectile,
            runChildUpdate: true,
            maxSize: -1
        });
        this.startAngle = 20;
        this.tweens.add({
            targets: this.wiz,   
            texture: 'demonClose',     
            duration: 1000,
            repeat: -1,
            onRepeat: () => { 
                for(let i = this.startAngle; i <= 180; i += 20){
                    this.fireball.add(new projectile(this, this.mapSize/2, 80, 'fireball', i))
                }
                if(this.startAngle > 40){
                    this.startAngle = 20
                }else{
                    this.startAngle += 5;
                }
            }
        
        });
        // derived from  https://blog.ourcade.co/posts/2020/phaser-3-typewriter-text-effect-bitmap/
        this.wizDio = 'I AM OZ THE GREAT AND POWERFUL\n\nLEAVE MY PRESENTS AT ONCE\n\n OR FACE MY WRATH!'
        this.wizDisplay = this.add.text(this.wiz.x, 128, '',{align: 'center'}).setOrigin(.5,0).setDepth(1);
        this.textIndex = 0;
        this.time.addEvent({
            callback: () => {
                this.wizDisplay.text += this.wizDio[this.textIndex];
                this.textIndex ++;
            },
            repeat: this.wizDio.length - 1,
            delay: 100,
        });
        this.time.addEvent({
            callback: ()  => {
                this.cameras.main.startFollow(this.toto);
                this.wizDisplay.destroy();
                this.toto.lockMove = false;
                
            },
            delay : 100 * this.wizDio.length + 1000
        })


    }
    update() {
        this.toto.update();
        this.wiz.update();
        this.physics.world.overlap(this.toto, this.fireball, () => {
            this.scene.restart()
        });
        if(this.cursors.space.isDown){
            this.scene.start('gameOverScene');
        }
    }
    
    addParticles(){
        // built off of the phaser example Fire Effects
        
        this.particleConfig = {
            color: [ 0xffffff, 0xf83600, 0xff0404, 0xff0000],
            colorEase: 'quad.easeOut',
            lifespan: 1200,    
            angle: { min: -110, max: -70 },
            scale: { start: 1, end: .40, ease: 'sine.out' },
            speed: 50,
            advance: 1500,
            blendMode: 'ADD'
        };
            this.add.particles(this.mapSize/2 - 56, 88, 'particleBase', this.particleConfig);
            this.add.particles(this.mapSize/2 - 88, 56, 'particleBase', this.particleConfig);
            this.add.particles(this.mapSize/2 + 56, 88, 'particleBase', this.particleConfig);
            this.add.particles(this.mapSize/2 + 88, 56, 'particleBase', this.particleConfig);
        this.particleConfig = {
                color: [0x3b3943],
                lifespan: 2000,
                alpha: 0.2,
                x: {min: this.mapSize/2 - 88, max: this.mapSize/2 + 88},
                angle: { min: -135, max: -45},
                scale: { start: 1, end: 3, ease: 'sine.out' },
                speed: 40,
                advance: 2000,
                blendMode: 'ADD'
            };
            this.add.particles(0 , 104, 'particleBase', this.particleConfig);
    }
}
