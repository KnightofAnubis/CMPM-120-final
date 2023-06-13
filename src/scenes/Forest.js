class Forest extends Phaser.Scene {
    constructor() {
        super('forestScene');
        this.VEL = 100;
    }

    create() {
        //temp music
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

        this.music = this.sound.add('forest');
        this.music.addMarker(loopMarker);
        this.music.play('loop', {
            delay: 0
        });

        //input keys
        this.cursors = this.input.keyboard.createCursorKeys();
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        

        //add tile map
        const map = this.add.tilemap('tilemapForestJSON');
        const tileset = map.addTilesetImage('tileset', 'tilesetImage');
        const background = map.createLayer('ground', tileset, 0, 0);
        const road = map.createLayer('road', tileset, 0, 0);
        const fence = map.createLayer('scarecrow-fence', tileset, 0, 0);
        const corn = map.createLayer('scarecrow-corn', tileset, 0, 0);
        

          let textConfig = {
            fontFamily: "Georgia",
            fontSize: '10px',
            //backgroundColor: '#008080',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.text = this.add.text(100, game.config.height/1.4, "Find: Scarecrow, Tinman, and Lion", textConfig).setOrigin(0.5);


        this.cameras.main.setZoom(2);

        //add characters
        //dorothy
        const dorothySpawn = map.findObject('dorothy', obj => obj.name == 'dorothySpawn');
        this.dorothy = new playerChar(this, dorothySpawn.x, dorothySpawn.y, 'dorothy');

        //scarecrow
        const scareSpawn = map.findObject('scarecrow', obj => obj.name == 'scarecrowSpawn');
        this.scare = new followChar(this, scareSpawn.x, scareSpawn.y, 'scare');
        this.scare.follow = this.dorothy;

        //tinman
        const tinSpawn = map.findObject('tinman', obj => obj.name == 'tinmanSpawn');
        this.tinman = new followChar(this, tinSpawn.x, tinSpawn.y, 'tin');
        this.tinman.follow = this.scare;

        //lion
        const lionSpawn = map.findObject('lion', obj => obj.name == 'lionSpawn');
        this.lion = new followChar(this, lionSpawn.x, lionSpawn.y, 'lion');
        this.lion.follow = this.tinman;

        //apear behind...
        const tinTrees1 = map.createLayer('tinman-trees1', tileset, 0, 0);
        const tinTrees2 = map.createLayer('tinman-tress2', tileset, 0, 0);
        const lionTrees1 = map.createLayer('lion-trees1', tileset, 0, 0);
        const lionTrees2 = map.createLayer('lion-trees2', tileset, 0, 0);
        const lionFallen = map.createLayer('lion-fallen', tileset, 0, 0);

        //collisions with tilemap
        fence.setCollisionByProperty({collide: true});
        corn.setCollisionByProperty({collide: true});
        tinTrees1.setCollisionByProperty({collide: true});
        tinTrees2.setCollisionByProperty({collide: true});
        lionTrees1.setCollisionByProperty({collide: true});
        lionTrees2.setCollisionByProperty({collide: true});
        lionFallen.setCollisionByProperty({collide: true});
        this.physics.add.collider(this.dorothy, fence);
        this.physics.add.collider(this.dorothy, corn);
        this.physics.add.collider(this.dorothy, tinTrees1);
        this.physics.add.collider(this.dorothy, tinTrees2);
        this.physics.add.collider(this.dorothy, lionTrees1);
        this.physics.add.collider(this.dorothy, lionTrees2);
        this.physics.add.collider(this.dorothy, lionFallen);
        
        


        this.waitChar = [this.tinman, this.scare, this.lion];
        this.activechar = [this.dorothy];
        //set camera viewports 
        const viewportW = game.config.width / 2;
        const viewportH = game.config.height / 2;
        const centerX = game.config.width / 2;
        const centerY = game.config.height / 2;

        //add( [x] [, y] [, width] [, height] [, makeMain] [, name])
        this.cam1 = this.cameras.main.setViewport(0, 0, viewportW, viewportH).setZoom(2);
        this.cam2 = this.cameras.add(centerX, 0, viewportW, viewportH).setZoom(2);
        this.cam3 = this.cameras.add(0, centerY, viewportW, viewportH).setZoom(2);
        this.cam4 = this.cameras.add(centerX, centerY, viewportW, viewportH).setZoom(2);
        // set camera bounds

        this.cam1.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cam2.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cam3.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cam4.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // assign camera follow target
        this.cam1.startFollow(this.dorothy, true, 0.25, 0.25); //Dorothy
        this.cam4.startFollow(this.tinman, true, 0.25, 0.25); //tinman
        this.cam2.startFollow(this.lion, true, 0.25, 0.25); //lion
        this.cam3.startFollow(this.scare, true, 0.25, 0.25); //scarecrow


        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
        const endTrigger = map.findObject('end', obj => obj.name == 'endTrigger');
        const rect = this.add.rectangle(endTrigger.x, endTrigger.y, 30, 100, 0x000000, 0);
        this.endBody = this.physics.add.existing(rect, 1);

    }
    update() {
        this.dorothy.update();
        this.tinman.update();
        this.lion.update();
        this.scare.update();
        
        this.physics.world.overlap(this.dorothy, this.scare, () => {
            console.log('overlap');
            this.scare.lockMove = false;
        });
        this.physics.world.overlap(this.dorothy, this.tinman, () => {
            console.log('overlap');
            this.tinman.lockMove = false;
        });
        this.physics.world.overlap(this.dorothy, this.lion, () => {
            console.log('overlap');
            this.lion.lockMove = false;
        });
        
            
        
       this.physics.world.collide(this.dorothy, this.endBody, this.switchScene, null, this);
    }
   switchScene(){
    console.log('end');
    this.music.pause();
  
    this.scene.start('ozScene');
   }

}