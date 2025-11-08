// ============ HACKATHON ARCADE 2025 ============
// Two cutting-edge games about AI and developers

const cfg = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 } }
  },
  scene: []
};

// ============ LOBBY SCENE ============
class LobbyScene extends Phaser.Scene {
  constructor() {
    super('Lobby');
  }

  create() {
    // Dark tech office floor
    const g = this.add.graphics();
    g.fillStyle(0x0a0a0a, 1);
    g.fillRect(0, 0, 800, 600);

    // Grid pattern
    g.lineStyle(1, 0x00ff88, 0.15);
    for (let i = 0; i < 800; i += 40) g.lineBetween(i, 0, i, 600);
    for (let j = 0; j < 600; j += 40) g.lineBetween(0, j, 800, j);

    // Scattered laptops (workstations)
    for (let i = 0; i < 8; i++) {
      const x = 80 + (i % 4) * 180;
      const y = 100 + Math.floor(i / 4) * 200;
      g.fillStyle(0x333333, 1);
      g.fillRect(x, y, 60, 40);
      g.fillStyle(0x00ff88, 1);
      g.fillRect(x + 5, y + 5, 50, 25);
    }

    // Coffee cups
    for (let i = 0; i < 6; i++) {
      const x = 100 + Math.random() * 600;
      const y = 100 + Math.random() * 400;
      g.fillStyle(0x8b4513, 1);
      g.fillRect(x, y, 20, 25);
      g.fillStyle(0x654321, 1);
      g.fillEllipse(x + 10, y + 5, 15, 10);
    }

    // LEFT Arcade machine (PROMPT INJECTION PANIC)
    g.fillStyle(0x1a1a2e, 1);
    g.fillRect(200, 220, 120, 160);
    g.fillStyle(0x0f3460, 1);
    g.fillRect(210, 230, 100, 80);

    // Screen glow - GREEN theme
    g.fillStyle(0x00ff88, 0.3);
    g.fillRect(205, 225, 110, 90);

    // Arcade buttons
    const btnColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00];
    for (let i = 0; i < 4; i++) {
      g.fillStyle(btnColors[i], 1);
      g.fillCircle(225 + i * 25, 340, 10);
    }

    // Joystick
    g.fillStyle(0xff0000, 1);
    g.fillCircle(260, 360, 15);
    g.fillStyle(0x000000, 1);
    g.fillCircle(260, 360, 8);

    // RIGHT Arcade machine (MERGE CONFLICT MAYHEM)
    g.fillStyle(0x1a1a2e, 1);
    g.fillRect(480, 220, 120, 160);
    g.fillStyle(0x0f3460, 1);
    g.fillRect(490, 230, 100, 80);

    // Screen glow - RED/ORANGE theme
    g.fillStyle(0xff6600, 0.3);
    g.fillRect(485, 225, 110, 90);

    // Arcade buttons
    for (let i = 0; i < 4; i++) {
      g.fillStyle(btnColors[i], 1);
      g.fillCircle(505 + i * 25, 340, 10);
    }

    // Joystick
    g.fillStyle(0xff0000, 1);
    g.fillCircle(540, 360, 15);
    g.fillStyle(0x000000, 1);
    g.fillCircle(540, 360, 8);

    // Station physics
    this.station1 = this.physics.add.sprite(260, 300, null).setVisible(false);
    this.station1.body.setSize(120, 160);

    this.station2 = this.physics.add.sprite(540, 300, null).setVisible(false);
    this.station2.body.setSize(120, 160);

    // Title with glow
    this.add.text(400, 30, 'HACKATHON ARCADE', {
      fontSize: '36px',
      color: '#00ff88',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);

    this.add.text(400, 65, 'AI DEVELOPER EDITION', {
      fontSize: '20px',
      color: '#ff0066',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Game labels
    this.add.text(260, 190, 'PROMPT INJECTION\nPANIC', {
      fontSize: '14px',
      color: '#00ff88',
      fontStyle: 'bold',
      align: 'center'
    }).setOrigin(0.5);

    this.add.text(540, 190, 'MERGE CONFLICT\nMAYHEM', {
      fontSize: '14px',
      color: '#ff6600',
      fontStyle: 'bold',
      align: 'center'
    }).setOrigin(0.5);

    // Player textures
    const p1g = this.add.graphics();
    p1g.fillStyle(0x00aaff, 1);
    p1g.fillCircle(20, 20, 18);
    p1g.fillStyle(0x0066cc, 1);
    p1g.fillCircle(15, 15, 5);
    p1g.fillCircle(25, 15, 5);
    p1g.fillStyle(0xffffff, 1);
    p1g.fillCircle(15, 15, 3);
    p1g.fillCircle(25, 15, 3);
    p1g.generateTexture('p1', 40, 40);
    p1g.destroy();

    const p2g = this.add.graphics();
    p2g.fillStyle(0xff0066, 1);
    p2g.fillCircle(20, 20, 18);
    p2g.fillStyle(0xcc0044, 1);
    p2g.fillCircle(15, 15, 5);
    p2g.fillCircle(25, 15, 5);
    p2g.fillStyle(0xffffff, 1);
    p2g.fillCircle(15, 15, 3);
    p2g.fillCircle(25, 15, 3);
    p2g.generateTexture('p2', 40, 40);
    p2g.destroy();

    // Players
    this.p1 = this.physics.add.sprite(100, 300, 'p1');
    this.p1.setCollideWorldBounds(true);
    this.p1.body.setCircle(18);

    this.p2 = this.physics.add.sprite(700, 300, 'p2');
    this.p2.setCollideWorldBounds(true);
    this.p2.body.setCircle(18);

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys('W,A,S,D');
    this.space = this.input.keyboard.addKey('SPACE');

    // Prompts
    this.prompt1 = this.add.text(260, 400, 'PRESS SPACE\nDEFEND AI!', {
      fontSize: '16px',
      color: '#00ff88',
      backgroundColor: '#000000',
      padding: { x: 10, y: 6 },
      align: 'center',
      fontStyle: 'bold'
    }).setOrigin(0.5).setVisible(false);

    this.prompt2 = this.add.text(540, 400, 'PRESS SPACE\nRESOLVE GIT!', {
      fontSize: '16px',
      color: '#ff6600',
      backgroundColor: '#000000',
      padding: { x: 10, y: 6 },
      align: 'center',
      fontStyle: 'bold'
    }).setOrigin(0.5).setVisible(false);

    // Controls hint
    this.add.text(400, 570, 'Arrow Keys or WASD to move | SPACE to play', {
      fontSize: '14px',
      color: '#666666'
    }).setOrigin(0.5);

    // Pulsing animations
    this.tweens.add({
      targets: [this.prompt1, this.prompt2],
      alpha: 0.5,
      duration: 500,
      yoyo: true,
      repeat: -1
    });
  }

  update() {
    const spd = 220;

    // P1 movement
    if (this.cursors.left.isDown) this.p1.setVelocityX(-spd);
    else if (this.cursors.right.isDown) this.p1.setVelocityX(spd);
    else this.p1.setVelocityX(0);

    if (this.cursors.up.isDown) this.p1.setVelocityY(-spd);
    else if (this.cursors.down.isDown) this.p1.setVelocityY(spd);
    else this.p1.setVelocityY(0);

    // P2 movement
    if (this.wasd.A.isDown) this.p2.setVelocityX(-spd);
    else if (this.wasd.D.isDown) this.p2.setVelocityX(spd);
    else this.p2.setVelocityX(0);

    if (this.wasd.W.isDown) this.p2.setVelocityY(-spd);
    else if (this.wasd.S.isDown) this.p2.setVelocityY(spd);
    else this.p2.setVelocityY(0);

    // Check station proximity
    const p1Near1 = Phaser.Math.Distance.Between(this.p1.x, this.p1.y, 260, 300) < 100;
    const p2Near1 = Phaser.Math.Distance.Between(this.p2.x, this.p2.y, 260, 300) < 100;
    const p1Near2 = Phaser.Math.Distance.Between(this.p1.x, this.p1.y, 540, 300) < 100;
    const p2Near2 = Phaser.Math.Distance.Between(this.p2.x, this.p2.y, 540, 300) < 100;

    const nearStation1 = p1Near1 || p2Near1;
    const nearStation2 = p1Near2 || p2Near2;

    this.prompt1.setVisible(nearStation1);
    this.prompt2.setVisible(nearStation2);

    if (nearStation1 && Phaser.Input.Keyboard.JustDown(this.space)) {
      this.scene.start('PromptPanic', { players: 2 });
    }

    if (nearStation2 && Phaser.Input.Keyboard.JustDown(this.space)) {
      this.scene.start('MergeConflict', { players: 2 });
    }
  }
}

// ============ GAME 1: PROMPT INJECTION PANIC ============
class PromptPanicScene extends Phaser.Scene {
  constructor() {
    super('PromptPanic');
  }

  init(data) {
    this.playerCount = data.players || 2;
    this.score = 0;
    this.wave = 1;
    this.lives = 3;
    this.combo = 0;
    this.comboTimer = 0;
    this.comboMult = 1;
    this.gameActive = true;
    this.lastFire1 = 0;
    this.lastFire2 = 0;
    this.attacksLeft = 0;
    this.bossActive = false;
  }

  create() {
    // Background - terminal aesthetic
    this.add.rectangle(400, 300, 800, 600, 0x000000);

    // Matrix-style code rain background
    this.codeRain = this.add.graphics();
    this.rainDrops = [];
    for (let i = 0; i < 40; i++) {
      this.rainDrops.push({
        x: Math.random() * 800,
        y: Math.random() * 600,
        speed: 1 + Math.random() * 2,
        char: String.fromCharCode(65 + Math.floor(Math.random() * 26))
      });
    }

    // Create textures
    this.createTextures();

    // Audio context
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    } catch (e) {
      this.audioCtx = null;
    }

    // Defenders (players)
    this.ship1 = this.physics.add.sprite(200, 500, 'defender1');
    this.ship1.setCollideWorldBounds(true);

    this.ship2 = this.physics.add.sprite(600, 500, 'defender2');
    this.ship2.setCollideWorldBounds(true);

    // Groups
    this.filters = this.physics.add.group({ maxSize: 40 });
    this.attacks = this.physics.add.group();
    this.attackBullets = this.physics.add.group({ maxSize: 30 });

    // Particles
    const pg = this.add.graphics();
    pg.fillStyle(0xffffff, 1);
    pg.fillCircle(2, 2, 2);
    pg.generateTexture('particle', 4, 4);
    pg.destroy();

    this.particles = this.add.particles('particle');

    // Collisions
    this.physics.add.overlap(this.filters, this.attacks, this.blockAttack, null, this);
    this.physics.add.overlap(this.attackBullets, [this.ship1, this.ship2], this.hitDefender, null, this);
    this.physics.add.overlap([this.ship1, this.ship2], this.attacks, this.hitDefender, null, this);

    // UI
    this.scoreText = this.add.text(16, 16, 'THREATS BLOCKED: 0', {
      fontSize: '18px',
      color: '#00ff88',
      fontStyle: 'bold'
    });

    this.waveText = this.add.text(400, 16, 'ATTACK WAVE 1', {
      fontSize: '22px',
      color: '#ff0066',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.comboText = this.add.text(784, 16, '', {
      fontSize: '18px',
      color: '#ffff00',
      fontStyle: 'bold'
    }).setOrigin(1, 0);

    this.livesText = this.add.text(16, 50, '🛡️ '.repeat(this.lives), {
      fontSize: '20px'
    });

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys('W,A,S,D');

    // Start first wave
    this.time.delayedCall(1000, () => this.startWave());
  }

  createTextures() {
    // Defender 1 (shield/firewall icon)
    const d1 = this.add.graphics();
    d1.fillStyle(0x00ff88, 1);
    d1.fillTriangle(20, 5, 5, 30, 35, 30);
    d1.fillStyle(0x00aa66, 1);
    d1.fillRect(18, 20, 4, 8);
    d1.generateTexture('defender1', 40, 35);
    d1.destroy();

    // Defender 2
    const d2 = this.add.graphics();
    d2.fillStyle(0x0088ff, 1);
    d2.fillTriangle(20, 5, 5, 30, 35, 30);
    d2.fillStyle(0x0066aa, 1);
    d2.fillRect(18, 20, 4, 8);
    d2.generateTexture('defender2', 40, 35);
    d2.destroy();

    // Safety filter (bullet)
    const f = this.add.graphics();
    f.fillStyle(0x00ff88, 1);
    f.fillRect(0, 0, 3, 10);
    f.generateTexture('filter', 3, 10);
    f.destroy();

    // Attack bullet
    const ab = this.add.graphics();
    ab.fillStyle(0xff0000, 1);
    ab.fillRect(0, 0, 4, 10);
    ab.generateTexture('attackbullet', 4, 10);
    ab.destroy();
  }

  update(time, delta) {
    if (!this.gameActive) return;

    // Update code rain
    this.codeRain.clear();
    this.codeRain.fillStyle(0x00ff88, 0.3);
    this.rainDrops.forEach(drop => {
      this.codeRain.fillText(drop.char, drop.x, drop.y, { fontSize: '12px' });
      drop.y += drop.speed;
      if (drop.y > 600) {
        drop.y = 0;
        drop.char = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    });

    const spd = 260;

    // Ship 1 controls
    if (this.cursors.left.isDown) this.ship1.setVelocityX(-spd);
    else if (this.cursors.right.isDown) this.ship1.setVelocityX(spd);
    else this.ship1.setVelocityX(0);

    if (this.cursors.down.isDown) this.ship1.setVelocityY(spd * 0.5);
    else if (this.cursors.up.isDown && this.ship1.y > 350) this.ship1.setVelocityY(-spd * 0.5);
    else this.ship1.setVelocityY(0);

    if (this.cursors.up.isDown && time > this.lastFire1 + 200) {
      this.deployFilter(this.ship1.x, this.ship1.y - 15);
      this.lastFire1 = time;
    }

    // Ship 2 controls
    if (this.wasd.A.isDown) this.ship2.setVelocityX(-spd);
    else if (this.wasd.D.isDown) this.ship2.setVelocityX(spd);
    else this.ship2.setVelocityX(0);

    if (this.wasd.S.isDown) this.ship2.setVelocityY(spd * 0.5);
    else if (this.wasd.W.isDown && this.ship2.y > 350) this.ship2.setVelocityY(-spd * 0.5);
    else this.ship2.setVelocityY(0);

    if (this.wasd.W.isDown && time > this.lastFire2 + 200) {
      this.deployFilter(this.ship2.x, this.ship2.y - 15);
      this.lastFire2 = time;
    }

    // Update attacks
    this.attacks.children.entries.forEach(a => {
      if (a.attackType === 'dan') {
        a.x += Math.sin(time * 0.003 + a.offset) * 2;
      } else if (a.attackType === 'roleplay') {
        a.x += Math.sin(time * 0.005 + a.offset) * 3;
        a.y += Math.cos(time * 0.004 + a.offset) * 1;
      } else if (a.attackType === 'encoding') {
        a.x += Math.sin(time * 0.004 + a.offset) * 2.5;
        if (Math.random() < 0.003 && !this.bossActive) {
          this.attackShoot(a.x, a.y + 15);
        }
      } else if (a.attackType === 'recursive') {
        a.x += Math.sin(time * 0.007 + a.offset) * 4;
        a.y += Math.sin(time * 0.006 + a.offset) * 2;
      } else if (a.attackType === 'boss') {
        a.x += Math.sin(time * 0.002) * 2;
        if (time % 800 < 50) {
          this.attackShoot(a.x - 25, a.y + 30);
          this.attackShoot(a.x + 25, a.y + 30);
        }
      }

      if (a.y > 620) a.destroy();
    });

    // Combo timer
    if (this.comboTimer > 0) {
      this.comboTimer -= delta;
      if (this.comboTimer <= 0) {
        this.combo = 0;
        this.comboMult = 1;
        this.comboText.setText('');
      }
    }

    // Check wave complete
    if (this.attacksLeft <= 0 && this.attacks.countActive() === 0 && !this.bossActive) {
      this.waveComplete();
    }

    // Cleanup
    this.filters.children.entries.forEach(f => { if (f.y < -20) f.destroy(); });
    this.attackBullets.children.entries.forEach(b => { if (b.y > 620) b.destroy(); });
  }

  deployFilter(x, y) {
    const f = this.filters.create(x, y, 'filter');
    f.setVelocityY(-600);
    this.playSound(550, 0.06, 0.12);
  }

  attackShoot(x, y) {
    const b = this.attackBullets.create(x, y, 'attackbullet');
    b.setVelocityY(250);
  }

  startWave() {
    this.waveText.setText('ATTACK WAVE ' + this.wave);

    // Boss wave every 5 waves
    if (this.wave % 5 === 0) {
      this.spawnBoss();
      return;
    }

    // Calculate attack counts
    const dan = Math.min(4 + this.wave, 10);
    const roleplay = this.wave > 2 ? Math.min(Math.floor(this.wave / 2), 5) : 0;
    const encoding = this.wave > 3 ? Math.min(Math.floor(this.wave / 3), 4) : 0;
    const recursive = this.wave > 2 ? Math.min(this.wave - 2, 6) : 0;

    this.attacksLeft = dan + roleplay + encoding + recursive;

    // Spawn attacks
    let delay = 0;
    for (let i = 0; i < dan; i++) {
      this.time.delayedCall(delay, () => this.spawnAttack('dan'));
      delay += 400;
    }
    for (let i = 0; i < roleplay; i++) {
      this.time.delayedCall(delay, () => this.spawnAttack('roleplay'));
      delay += 500;
    }
    for (let i = 0; i < encoding; i++) {
      this.time.delayedCall(delay, () => this.spawnAttack('encoding'));
      delay += 600;
    }
    for (let i = 0; i < recursive; i++) {
      this.time.delayedCall(delay, () => this.spawnAttack('recursive'));
      delay += 300;
    }
  }

  spawnAttack(type) {
    const x = 100 + Math.random() * 600;
    const y = -40;

    // Create texture if needed
    if (!this.textures.exists(type)) {
      const g = this.add.graphics();

      if (type === 'dan') {
        g.fillStyle(0xff3333, 1);
        g.fillRect(0, 0, 35, 35);
        g.fillStyle(0x000000, 1);
        g.fillCircle(12, 14, 4);
        g.fillCircle(23, 14, 4);
        g.fillRect(10, 24, 15, 3);
      } else if (type === 'roleplay') {
        g.fillStyle(0xff6600, 1);
        g.fillRect(0, 0, 38, 38);
        g.fillStyle(0xffffff, 1);
        g.fillCircle(13, 13, 4);
        g.fillCircle(25, 13, 4);
        g.fillRect(11, 24, 16, 3);
      } else if (type === 'encoding') {
        g.fillStyle(0xff00ff, 1);
        g.fillRect(0, 0, 40, 40);
        g.fillStyle(0xffff00, 1);
        g.fillCircle(14, 14, 5);
        g.fillCircle(26, 14, 5);
        g.fillStyle(0xff0000, 1);
        g.fillRect(11, 26, 18, 4);
      } else if (type === 'recursive') {
        g.fillStyle(0xff9900, 1);
        g.fillCircle(12, 12, 12);
        g.fillStyle(0x000000, 1);
        g.fillCircle(9, 10, 2);
        g.fillCircle(15, 10, 2);
      }

      const size = type === 'recursive' ? 24 : (type === 'dan' ? 35 : (type === 'roleplay' ? 38 : 40));
      g.generateTexture(type, size, size);
      g.destroy();
    }

    const a = this.attacks.create(x, y, type);
    a.attackType = type;
    a.offset = Math.random() * 10;
    a.hp = type === 'dan' ? 1 : (type === 'roleplay' ? 2 : (type === 'encoding' ? 3 : 1));
    a.points = type === 'dan' ? 15 : (type === 'roleplay' ? 30 : (type === 'encoding' ? 60 : 10));

    const speed = type === 'recursive' ? 90 : (type === 'roleplay' ? 65 : 45);
    a.setVelocityY(speed);

    // Spawn animation
    a.setScale(0);
    this.tweens.add({
      targets: a,
      scale: 1,
      duration: 350,
      ease: 'Back.easeOut'
    });
  }

  spawnBoss() {
    this.bossActive = true;
    this.attacksLeft = 1;

    // Boss texture
    if (!this.textures.exists('boss')) {
      const g = this.add.graphics();
      g.fillStyle(0xff0000, 1);
      g.fillRect(0, 0, 90, 70);
      g.fillStyle(0x000000, 1);
      g.fillCircle(25, 25, 9);
      g.fillCircle(65, 25, 9);
      g.fillStyle(0xff0000, 1);
      g.fillCircle(25, 25, 6);
      g.fillCircle(65, 25, 6);
      g.fillStyle(0xffff00, 1);
      g.fillRect(18, 48, 54, 6);
      g.generateTexture('boss', 90, 70);
      g.destroy();
    }

    const boss = this.attacks.create(400, -70, 'boss');
    boss.attackType = 'boss';
    boss.offset = 0;
    boss.hp = 35 + (this.wave * 6);
    boss.points = 600;
    boss.setVelocityY(35);

    // Boss warning
    const warning = this.add.text(400, 300, 'JAILBREAK ATTACK!', {
      fontSize: '52px',
      color: '#ff0000',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 7
    }).setOrigin(0.5);

    this.tweens.add({
      targets: warning,
      alpha: 0,
      duration: 2200,
      onComplete: () => warning.destroy()
    });

    this.playSound(110, 1, 0.25);
    this.cameras.main.shake(600, 0.012);
  }

  blockAttack(filter, attack) {
    filter.destroy();

    attack.hp--;

    // Flash effect
    attack.setTint(0xffffff);
    this.time.delayedCall(80, () => attack.clearTint());

    if (attack.hp <= 0) {
      // Explosion
      this.particles.createEmitter({
        x: attack.x,
        y: attack.y,
        speed: { min: 60, max: 220 },
        angle: { min: 0, max: 360 },
        scale: { start: 1, end: 0 },
        tint: attack.attackType === 'dan' ? 0xff3333 : (attack.attackType === 'roleplay' ? 0xff6600 : (attack.attackType === 'encoding' ? 0xff00ff : (attack.attackType === 'boss' ? 0xff0000 : 0xff9900))),
        lifespan: 650,
        quantity: attack.attackType === 'boss' ? 60 : 18
      });

      // Score
      this.combo++;
      this.comboTimer = 2200;
      this.comboMult = Math.min(Math.floor(this.combo / 3) + 1, 5);
      this.score += attack.points * this.comboMult;
      this.scoreText.setText('THREATS BLOCKED: ' + this.score);

      if (this.comboMult > 1) {
        this.comboText.setText('x' + this.comboMult + ' DEFENSE!');
      }

      this.attacksLeft--;

      if (attack.attackType === 'boss') {
        this.bossActive = false;
        this.cameras.main.shake(900, 0.025);
      }

      attack.destroy();
      this.playSound(920, 0.16, 0.18);
    } else {
      this.playSound(680, 0.08, 0.13);
    }
  }

  hitDefender(defender, threat) {
    threat.destroy();
    this.lives--;
    this.livesText.setText('🛡️ '.repeat(Math.max(0, this.lives)));

    // Flash
    defender.setTint(0xff0000);
    this.time.delayedCall(220, () => defender.clearTint());

    this.cameras.main.shake(350, 0.018);
    this.playSound(240, 0.35, 0.28);

    if (this.lives <= 0) {
      this.gameOver();
    }
  }

  waveComplete() {
    this.score += this.wave * 120;
    this.scoreText.setText('THREATS BLOCKED: ' + this.score);

    const bonus = this.add.text(400, 300, 'SYSTEM SECURED!\n+' + (this.wave * 120), {
      fontSize: '38px',
      color: '#00ff88',
      fontStyle: 'bold',
      align: 'center'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: bonus,
      y: 250,
      alpha: 0,
      duration: 2200,
      onComplete: () => bonus.destroy()
    });

    this.wave++;
    this.time.delayedCall(2700, () => this.startWave());
    this.playSound(920, 0.6, 0.22);
  }

  gameOver() {
    this.gameActive = false;
    this.physics.pause();

    // High score
    const hs = parseInt(localStorage.getItem('promptPanicHS') || '0');
    const newHS = this.score > hs;
    if (newHS) localStorage.setItem('promptPanicHS', this.score.toString());

    this.add.rectangle(400, 300, 800, 600, 0x000000, 0.75);

    this.add.text(400, 200, 'SYSTEM BREACHED', {
      fontSize: '60px',
      color: '#ff0000',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 8
    }).setOrigin(0.5);

    this.add.text(400, 280, 'Threats Blocked: ' + this.score, {
      fontSize: '30px',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(400, 320, 'Wave Survived: ' + this.wave, {
      fontSize: '22px',
      color: '#00ff88'
    }).setOrigin(0.5);

    if (newHS) {
      this.add.text(400, 360, '🏆 NEW HIGH SCORE! 🏆', {
        fontSize: '26px',
        color: '#ffff00',
        fontStyle: 'bold'
      }).setOrigin(0.5);
    } else {
      this.add.text(400, 360, 'High Score: ' + hs, {
        fontSize: '19px',
        color: '#888888'
      }).setOrigin(0.5);
    }

    this.add.text(400, 420, 'The jailbreak succeeded...', {
      fontSize: '17px',
      color: '#666666',
      fontStyle: 'italic'
    }).setOrigin(0.5);

    this.playSound(230, 1.2, 0.27);

    this.time.delayedCall(4500, () => {
      this.scene.start('Lobby');
    });
  }

  playSound(freq, dur, vol) {
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.frequency.value = freq;
      osc.type = 'square';
      gain.gain.setValueAtTime(vol, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + dur);
      osc.start(this.audioCtx.currentTime);
      osc.stop(this.audioCtx.currentTime + dur);
    } catch (e) {}
  }
}

// ============ GAME 2: MERGE CONFLICT MAYHEM ============
class MergeConflictScene extends Phaser.Scene {
  constructor() {
    super('MergeConflict');
  }

  init(data) {
    this.playerCount = data.players || 2;
    this.score = 0;
    this.sprint = 1;
    this.lives = 3;
    this.gameActive = true;
    this.dropSpeed = 60;
    this.nextDrop = 0;
    this.blocks = [];
    this.currentBlock = null;
    this.nextBlock = null;
    this.grid = [];
    this.conflicts = 0;

    // Initialize grid (20 rows x 10 cols)
    for (let r = 0; r < 20; r++) {
      this.grid[r] = new Array(10).fill(null);
    }
  }

  create() {
    // Background - git graph aesthetic
    const g = this.add.graphics();
    g.fillStyle(0x0a0a0a, 1);
    g.fillRect(0, 0, 800, 600);

    // Grid lines (subtle)
    g.lineStyle(1, 0xff6600, 0.1);
    for (let i = 0; i < 800; i += 30) g.lineBetween(i, 0, i, 600);
    for (let j = 0; j < 600; j += 30) g.lineBetween(0, j, 800, j);

    // Draw branch visualization background
    this.branchViz = this.add.graphics();
    this.drawBranches();

    // Audio context
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    } catch (e) {
      this.audioCtx = null;
    }

    // Playing field (centered Tetris-style)
    this.fieldX = 300;
    this.fieldY = 80;
    this.blockSize = 25;

    // Draw playing field border
    const border = this.add.graphics();
    border.lineStyle(3, 0xff6600, 1);
    border.strokeRect(this.fieldX - 2, this.fieldY - 2, this.blockSize * 10 + 4, this.blockSize * 20 + 4);

    // UI
    this.scoreText = this.add.text(16, 16, 'MERGES: 0', {
      fontSize: '20px',
      color: '#ff6600',
      fontStyle: 'bold'
    });

    this.sprintText = this.add.text(400, 16, 'SPRINT 1', {
      fontSize: '26px',
      color: '#00ff88',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.conflictText = this.add.text(784, 16, 'CONFLICTS: 0', {
      fontSize: '18px',
      color: '#ffff00',
      fontStyle: 'bold'
    }).setOrigin(1, 0);

    this.livesText = this.add.text(16, 50, '💾 '.repeat(this.lives), {
      fontSize: '22px'
    });

    // Next block preview
    this.add.text(620, 100, 'NEXT:', {
      fontSize: '16px',
      color: '#888888'
    });

    this.nextPreview = this.add.container(650, 140);

    // Controls hint
    this.add.text(400, 570, 'Arrow Keys: Move | UP: Rotate | DOWN: Fast Drop', {
      fontSize: '13px',
      color: '#666666'
    }).setOrigin(0.5);

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.leftKey = this.cursors.left;
    this.rightKey = this.cursors.right;
    this.downKey = this.cursors.down;
    this.upKey = this.cursors.up;

    // Movement timing
    this.moveDelay = 0;
    this.fastDrop = false;

    // Create block types
    this.blockTypes = [
      { name: 'head', color: 0x00ff00, shape: [[1,1],[1,1]] },
      { name: 'incoming', color: 0xff0000, shape: [[1,1,1,1]] },
      { name: 'conflict', color: 0xff00ff, shape: [[0,1,0],[1,1,1]] },
      { name: 'clean', color: 0x0088ff, shape: [[1,1,0],[0,1,1]] }
    ];

    // Start game
    this.spawnBlock();
    this.spawnBlock();
  }

  update(time, delta) {
    if (!this.gameActive || !this.currentBlock) return;

    // Drop timing
    const dropInterval = this.downKey.isDown ? 50 : (800 - this.sprint * 40);

    if (time > this.nextDrop) {
      this.moveBlockDown();
      this.nextDrop = time + dropInterval;
    }

    // Horizontal movement
    if (time > this.moveDelay) {
      if (this.leftKey.isDown) {
        this.moveBlock(-1, 0);
        this.moveDelay = time + 150;
      } else if (this.rightKey.isDown) {
        this.moveBlock(1, 0);
        this.moveDelay = time + 150;
      }
    }

    // Rotation
    if (Phaser.Input.Keyboard.JustDown(this.upKey)) {
      this.rotateBlock();
    }
  }

  drawBranches() {
    this.branchViz.clear();
    this.branchViz.lineStyle(2, 0xff6600, 0.3);

    // Draw git-style branch lines
    for (let i = 0; i < 5; i++) {
      const x = 100 + i * 150;
      this.branchViz.moveTo(x, 100);
      this.branchViz.lineTo(x, 500);

      // Branch points
      for (let j = 0; j < 3; j++) {
        const y = 150 + j * 120;
        this.branchViz.fillStyle(0xff6600, 0.5);
        this.branchViz.fillCircle(x, y, 4);
      }
    }
  }

  spawnBlock() {
    if (this.currentBlock) {
      // Lock current block and get next
      this.currentBlock = this.nextBlock;
    }

    // Create next block
    const type = this.blockTypes[Math.floor(Math.random() * this.blockTypes.length)];
    this.nextBlock = {
      type: type.name,
      color: type.color,
      shape: JSON.parse(JSON.stringify(type.shape)),
      x: 4,
      y: 0,
      graphics: null
    };

    // Update preview
    this.nextPreview.removeAll(true);
    const preview = this.add.graphics();
    for (let r = 0; r < this.nextBlock.shape.length; r++) {
      for (let c = 0; c < this.nextBlock.shape[r].length; c++) {
        if (this.nextBlock.shape[r][c]) {
          preview.fillStyle(this.nextBlock.color, 1);
          preview.fillRect(c * 20, r * 20, 18, 18);
          preview.lineStyle(1, 0x000000, 1);
          preview.strokeRect(c * 20, r * 20, 18, 18);
        }
      }
    }
    this.nextPreview.add(preview);

    // Draw current block if it exists
    if (this.currentBlock) {
      this.drawBlock();

      // Check if game over (can't spawn)
      if (this.checkCollision(this.currentBlock.x, this.currentBlock.y)) {
        this.gameOver();
      }
    }
  }

  drawBlock() {
    if (this.currentBlock.graphics) {
      this.currentBlock.graphics.destroy();
    }

    const g = this.add.graphics();
    const block = this.currentBlock;

    for (let r = 0; r < block.shape.length; r++) {
      for (let c = 0; c < block.shape[r].length; c++) {
        if (block.shape[r][c]) {
          const px = this.fieldX + (block.x + c) * this.blockSize;
          const py = this.fieldY + (block.y + r) * this.blockSize;

          g.fillStyle(block.color, 1);
          g.fillRect(px, py, this.blockSize - 2, this.blockSize - 2);
          g.lineStyle(1, 0x000000, 0.5);
          g.strokeRect(px, py, this.blockSize - 2, this.blockSize - 2);
        }
      }
    }

    this.currentBlock.graphics = g;
  }

  moveBlock(dx, dy) {
    const newX = this.currentBlock.x + dx;
    const newY = this.currentBlock.y + dy;

    if (!this.checkCollision(newX, newY)) {
      this.currentBlock.x = newX;
      this.currentBlock.y = newY;
      this.drawBlock();

      if (dx !== 0) this.playSound(200, 0.05, 0.1);
      return true;
    }

    return false;
  }

  moveBlockDown() {
    if (!this.moveBlock(0, 1)) {
      // Block landed - lock it
      this.lockBlock();
      this.checkLines();
      this.spawnBlock();
    }
  }

  rotateBlock() {
    const old = this.currentBlock.shape;
    const n = old.length;
    const m = old[0].length;
    const rotated = [];

    for (let c = 0; c < m; c++) {
      rotated[c] = [];
      for (let r = n - 1; r >= 0; r--) {
        rotated[c].push(old[r][c]);
      }
    }

    this.currentBlock.shape = rotated;

    if (this.checkCollision(this.currentBlock.x, this.currentBlock.y)) {
      // Revert if collision
      this.currentBlock.shape = old;
    } else {
      this.drawBlock();
      this.playSound(350, 0.08, 0.12);
    }
  }

  checkCollision(x, y) {
    const block = this.currentBlock;

    for (let r = 0; r < block.shape.length; r++) {
      for (let c = 0; c < block.shape[r].length; c++) {
        if (block.shape[r][c]) {
          const gridX = x + c;
          const gridY = y + r;

          // Check boundaries
          if (gridX < 0 || gridX >= 10 || gridY >= 20) return true;

          // Check grid collision
          if (gridY >= 0 && this.grid[gridY][gridX]) return true;
        }
      }
    }

    return false;
  }

  lockBlock() {
    const block = this.currentBlock;

    for (let r = 0; r < block.shape.length; r++) {
      for (let c = 0; c < block.shape[r].length; c++) {
        if (block.shape[r][c]) {
          const gridX = block.x + c;
          const gridY = block.y + r;

          if (gridY >= 0) {
            this.grid[gridY][gridX] = {
              color: block.color,
              type: block.type
            };
          }
        }
      }
    }

    this.redrawGrid();
    this.playSound(180, 0.12, 0.15);
  }

  checkLines() {
    let linesCleared = 0;

    for (let r = 19; r >= 0; r--) {
      let full = true;

      for (let c = 0; c < 10; c++) {
        if (!this.grid[r][c]) {
          full = false;
          break;
        }
      }

      if (full) {
        linesCleared++;

        // Remove line
        for (let rr = r; rr > 0; rr--) {
          this.grid[rr] = [...this.grid[rr - 1]];
        }
        this.grid[0] = new Array(10).fill(null);

        r++; // Check same row again
      }
    }

    if (linesCleared > 0) {
      const points = [0, 100, 250, 400, 600][linesCleared];
      this.score += points;
      this.conflicts += linesCleared;

      this.scoreText.setText('MERGES: ' + this.score);
      this.conflictText.setText('CONFLICTS: ' + this.conflicts);

      this.playSound(800, 0.2, 0.2);
      this.cameras.main.flash(100, 0, 255, 0, false, 0.3);

      // Check sprint progression
      if (this.conflicts >= this.sprint * 10) {
        this.nextSprint();
      }
    }

    this.redrawGrid();
  }

  redrawGrid() {
    // Clear old grid graphics
    this.children.list.forEach(child => {
      if (child.gridBlock) child.destroy();
    });

    // Draw locked blocks
    for (let r = 0; r < 20; r++) {
      for (let c = 0; c < 10; c++) {
        if (this.grid[r][c]) {
          const px = this.fieldX + c * this.blockSize;
          const py = this.fieldY + r * this.blockSize;

          const g = this.add.graphics();
          g.gridBlock = true;
          g.fillStyle(this.grid[r][c].color, 1);
          g.fillRect(px, py, this.blockSize - 2, this.blockSize - 2);
          g.lineStyle(1, 0x000000, 0.5);
          g.strokeRect(px, py, this.blockSize - 2, this.blockSize - 2);
        }
      }
    }
  }

  nextSprint() {
    this.sprint++;
    this.sprintText.setText('SPRINT ' + this.sprint);

    const bonus = this.add.text(400, 300, 'SPRINT COMPLETE!\n+' + (this.sprint * 200), {
      fontSize: '42px',
      color: '#ff6600',
      fontStyle: 'bold',
      align: 'center'
    }).setOrigin(0.5);

    this.score += this.sprint * 200;
    this.scoreText.setText('MERGES: ' + this.score);

    this.tweens.add({
      targets: bonus,
      y: 250,
      alpha: 0,
      duration: 2000,
      onComplete: () => bonus.destroy()
    });

    this.playSound(1000, 0.5, 0.25);
    this.cameras.main.flash(200, 255, 102, 0);
  }

  gameOver() {
    this.gameActive = false;

    // High score
    const hs = parseInt(localStorage.getItem('mergeConflictHS') || '0');
    const newHS = this.score > hs;
    if (newHS) localStorage.setItem('mergeConflictHS', this.score.toString());

    this.add.rectangle(400, 300, 800, 600, 0x000000, 0.8);

    this.add.text(400, 180, 'MERGE FAILED', {
      fontSize: '70px',
      color: '#ff0000',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 9
    }).setOrigin(0.5);

    this.add.text(400, 270, 'Final Score: ' + this.score, {
      fontSize: '34px',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(400, 315, 'Conflicts Resolved: ' + this.conflicts, {
      fontSize: '24px',
      color: '#ff6600'
    }).setOrigin(0.5);

    this.add.text(400, 350, 'Sprint Reached: ' + this.sprint, {
      fontSize: '24px',
      color: '#00ff88'
    }).setOrigin(0.5);

    if (newHS) {
      this.add.text(400, 395, '🏆 NEW HIGH SCORE! 🏆', {
        fontSize: '28px',
        color: '#ffff00',
        fontStyle: 'bold'
      }).setOrigin(0.5);
    } else {
      this.add.text(400, 395, 'High Score: ' + hs, {
        fontSize: '20px',
        color: '#888888'
      }).setOrigin(0.5);
    }

    this.add.text(400, 445, 'Time to git reset --hard...', {
      fontSize: '18px',
      color: '#666666',
      fontStyle: 'italic'
    }).setOrigin(0.5);

    this.playSound(200, 1.5, 0.3);

    this.time.delayedCall(5000, () => {
      this.scene.start('Lobby');
    });
  }

  playSound(freq, dur, vol) {
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.frequency.value = freq;
      osc.type = 'square';
      gain.gain.setValueAtTime(vol, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + dur);
      osc.start(this.audioCtx.currentTime);
      osc.stop(this.audioCtx.currentTime + dur);
    } catch (e) {}
  }
}

// ============ GAME INIT ============
cfg.scene = [LobbyScene, PromptPanicScene, MergeConflictScene];
const game = new Phaser.Game(cfg);
