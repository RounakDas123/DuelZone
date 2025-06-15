import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { Howl } from 'howler';

const shootSound = new Howl({
  src: ['/sounds/shoot.wav'],
  volume: 0.1,
});
const hitSound = new Howl({
  src: ['/sounds/hit.wav'],
  volume: 0.4,
});
const explosionSound = new Howl({
  src: ['/sounds/explosion.wav'],
  volume: 0.7,
});
const gameOverSound = new Howl({
  src: ['/sounds/gameover.wav'],
  volume: 0.7,
});
const winSound = new Howl({
  src: ['/sounds/win.wav'],
  volume: 0.7,
});


const GameSolo = () => {
  const gameContainer = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    const init = () => {
      if (!gameContainer.current) return;
      try {
        const app = new PIXI.Application();
        app.init({
          width: 800,
          height: 600,
          backgroundColor: '#1e1e1e',
          antialias: true,
        }).then(async ()=> {
            appRef.current = app;
            if (app.canvas) {
                gameContainer.current.appendChild(app.canvas);
            } else {
                console.error('PIXI.Application view is not available');
                return;
            }
            // Create player rectangle
            // const player = new PIXI.Graphics();
            // player.beginFill(0x00ff00);
            // player.drawRect(0, 0, 40, 40);
            // player.endFill();

            /*const player = new PIXI.Graphics()
            .fill(0x00ff00)
            .rect(0, 0, 40, 40);

            player.x = 100;
            player.y = 100;
            player.hitArea = new PIXI.Rectangle(0, 0, 40, 40);
            app.stage.addChild(player);*/
            // ✅ Use classic drawRect method for compatibility
            const player = new PIXI.Graphics();
            const playerSize = 40;
            player.beginFill(0x00ff00);
            player.drawRect(0, 0, playerSize, playerSize);
            player.endFill();
            player.x = 100;
            player.y = 100;
            app.stage.addChild(player);

            const enemy = new PIXI.Graphics();
            const enemySize = 40;
            const enemySpeed = 2;
            enemy.beginFill(0xff0000); // Red enemy
            enemy.drawRect(0, 0, enemySize, enemySize);
            enemy.endFill();
            enemy.x = 700;
            enemy.y = 500;
            app.stage.addChild(enemy);
            let enemyAlive = true;

            const keys = {};
            const speed = 5;
            const bullets = [];

            const handleKeyDown = (e) => {
                keys[e.code] = true;
                if (e.code === 'Space') {
                shootBullet();
                }
            };

            const handleKeyUp = (e) => {
                keys[e.code] = false;
            };

            const shootBullet = () => {
                const bullet = new PIXI.Graphics();
                bullet.beginFill(0xffff00);
                bullet.drawCircle(0, 0, 5);
                bullet.endFill();
                
                bullet.x = player.x + 20;
                bullet.y = player.y + 20;
                bullet.vx = 10;
                app.stage.addChild(bullet);
                bullets.push(bullet);
                shootSound.play();
            };

            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
            let prevX = player.x;
            let prevY = player.y;
            const isColliding = (a, b) => {
            const ab = a.getBounds();
            const bb = b.getBounds();
            return ab.x < bb.x + bb.width &&
                    ab.x + ab.width > bb.x &&
                    ab.y < bb.y + bb.height &&
                    ab.y + ab.height > bb.y;
            };
            let playerHealth = 100;
            let enemyHealth = 100;
            let gameOver = false;

            // Text for health
            const playerHealthText = new PIXI.Text(`Player HP: ${playerHealth}`, {
            fill: 'white',
            fontSize: 16,
            });
            playerHealthText.position.set(10, 10);
            app.stage.addChild(playerHealthText);

            const enemyHealthText = new PIXI.Text(`Enemy HP: ${enemyHealth}`, {
            fill: 'white',
            fontSize: 16,
            });
            enemyHealthText.position.set(10, 30);
            app.stage.addChild(enemyHealthText);

            // Game over text
            const gameOverText = new PIXI.Text(``, {
            fill: 'red',
            fontSize: 32,
            fontWeight: 'bold',
            });
            gameOverText.anchor.set(0.5);
            gameOverText.position.set(app.screen.width / 2, app.screen.height / 2);
            app.stage.addChild(gameOverText);

            app.ticker.add(() => {
            if (gameOver) return;

            if (keys['ArrowUp'] || keys['KeyW']) player.y -= speed;
            if (keys['ArrowDown'] || keys['KeyS']) player.y += speed;
            if (keys['ArrowLeft'] || keys['KeyA']) player.x -= speed;
            if (keys['ArrowRight'] || keys['KeyD']) player.x += speed;

            // Clamp player inside canvas
            player.x = Math.max(0, Math.min(app.screen.width - player.width, player.x));
            player.y = Math.max(0, Math.min(app.screen.height - player.height, player.y));

            // Move enemy
            if (enemyAlive && enemy && !enemy.destroyed) {
                const dx = player.x - enemy.x;
                const dy = player.y - enemy.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 1) {
                const normX = dx / distance;
                const normY = dy / distance;
                enemy.x += normX * enemySpeed;
                enemy.y += normY * enemySpeed;
                }

                // Enemy hits player
                if (isColliding(player, enemy)) {
                playerHealth -= 1;
                playerHealthText.text = `Player HP: ${playerHealth}`;
                hitSound.play();
                if (playerHealth <= 0) {
                    gameOver = true;
                    gameOverText.text = '💀 Game Over!';
                    gameOverSound.play();
                }
                }
            }

            for (let i = bullets.length - 1; i >= 0; i--) {
                const bullet = bullets[i];
                bullet.x += bullet.vx;

                if (bullet.x > app.screen.width) {
                app.stage.removeChild(bullet);
                bullets.splice(i, 1);
                continue;
                }

                if (enemyAlive && enemy && isColliding(bullet, enemy)) {
                app.stage.removeChild(bullet);
                bullets.splice(i, 1);
                enemyHealth -= 20;
                enemyHealthText.text = `Enemy HP: ${enemyHealth}`;

                hitSound.play();

                if (enemyHealth <= 0) {
                    const enemyX = enemy.x;
                    const enemyY = enemy.y;
                    app.stage.removeChild(enemy);

                    setTimeout(() => {
                    const explosion = new PIXI.Graphics();
                    explosion.beginFill(0xffa500, 0.9);
                    explosion.drawRect(-20, -20, 40, 40);
                    explosion.endFill();
                    explosion.x = enemyX + 20;
                    explosion.y = enemyY + 20;
                    explosion.alpha = 1;
                    app.stage.addChild(explosion);
                    const explosionId = explosionSound.play();
                    explosionSound.once('end', () => {
                        winSound.play();
                    });

                    const fadeEffect = (delta) => {
                        explosion.alpha -= 0.05 * delta;
                        if (explosion.alpha <= 0) {
                        app.stage.removeChild(explosion);
                        app.ticker.remove(fadeEffect);
                        }
                    };
                    app.ticker.add(fadeEffect);
                    }, 0);

                    enemy.destroy({ children: true });
                    enemyAlive = false;
                    gameOver = true;
                    gameOverText.text = '🎉 You Win!';

                }
                }
            }
            });

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
                window.removeEventListener('keyup', handleKeyUp);
                app.destroy(true, { children: true });
            };

        });
      } catch (error) {
        console.error('Failed to initialize PIXI application:', error);
      }
    };

    const timeoutId = setTimeout(init, 0);
    return () => {
      clearTimeout(timeoutId);
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
      }
    };
  }, []);

  return <div ref={gameContainer} style={{ width: '100vw', height: '100vh' }} />;
};

export default GameSolo;