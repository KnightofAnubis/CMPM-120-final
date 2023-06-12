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

        this.music = this.sound.add('munchkin');
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
        const background = map.createLayer('floor', tileset, 0, 0);
        //const trees = map.createLayer('trees', tileset, 0, 0);
        //const trees2 = map.createLayer('trees2', tileset, 0, 0);
        //const bush = map.createLayer('bush', tileset, 0, 0);

        //scene test without tilemap:
        this.add.text(game.config.width / 2, game.config.height / 2.5 - borderUISize - borderPadding, "Press SPACE to continue...", menuConfig).setOrigin(0.5);


        this.cameras.main.setZoom(2);

        //add characters
        //dorothy
        this.dorothy = new playerChar(this, 64, game.config.height - 32, 'dorothy');

        this.scare = new followChar(this, 120, game.config.height / 2, 'scare');
        this.scare.follow = this.dorothy;
        this.tinman = new followChar(this, 20, game.config.height / 4, 'tin');
        this.tinman.follow = this.scare
        this.lion = new followChar(this, 90, 32, 'lion');
        this.lion.follow = this.tinman

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
        this.cam2.startFollow(this.tinman, true, 0.25, 0.25); //Dorothy
        this.cam3.startFollow(this.lion, true, 0.25, 0.25); //Dorothy
        this.cam4.startFollow(this.scare, true, 0.25, 0.25); //Dorothy


        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);


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

        if (this.cursors.space.isDown) {
            this.scene.start('ozScene');
        }
    }

}