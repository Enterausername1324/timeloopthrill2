// ============================
// CANVAS SETUP
// ============================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player object (speed handled separately)
let player = { 
    x: 160, 
    y: 520, 
    width: 40, 
    height: 40 
};

// Movement flags
let moveLeft = false;
let moveRight = false;

// Unified movement speed (balanced for PC + mobile)
const MOVE_SPEED = 8;

// Game variables
let obstacles = [];
let score = 0;
let gameOver = false;
let obstacleSpeed = 4;

// UI elements
const gameOverScreen = document.getElementById("gameOver");
const finalScoreEl = document.getElementById("finalScore");
const highScoreEl = document.getElementById("highScore");

// Mobile buttons
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

// ============================
// DESKTOP CONTROLS
// ============================
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") moveLeft = true;
    if (e.key === "ArrowRight") moveRight = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") moveLeft = false;
    if (e.key === "ArrowRight") moveRight = false;
});

// ============================
// MOBILE TOUCH CONTROLS
// ============================
leftBtn.addEventListener("touchstart", () => moveLeft = true);
leftBtn.addEventListener("touchend", () => moveLeft = false);

rightBtn.addEventListener("touchstart", () => moveRight = true);
rightBtn.addEventListener("touchend", () => moveRight = false);

// ============================
// SPAWN OBSTACLES
// ============================
function spawnObstacle() {
    const size = 40;
    const x = Math.random() * (canvas.width - size);

    obstacles.push({
        x,
        y: -size,
        width: size,
        height: size,
        speed: obstacleSpeed
    });
}

// Spawn every 500ms
setInterval(() => {
    if (!gameOver) spawnObstacle();
}, 500);

// ============================
// DIFFICULTY SCALING
// ============================
function increaseDifficulty() {
    if (score % 300 === 0) {
        obstacleSpeed += 0.4;
    }
}

// ============================
// GAME OVER
// ============================
function showGameOver() {
    gameOver = true;

    finalScoreEl.textContent = score;

    let highScore = localStorage.getItem("neonHighScore") || 0;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("neonHighScore", highScore);
    }

    highScoreEl.textContent = highScore;

    gameOverScreen.classList.add("show");
}

function restartGame() {
    window.location.reload();
}

// ============================
// MAIN GAME LOOP
// ============================
function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Movement (balanced for PC + mobile)
    if (moveLeft) player.x -= MOVE_SPEED;
    if (moveRight) player.x += MOVE_SPEED;

    // Boundaries
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));

    // Draw player
    ctx.fillStyle = "#00eaff";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw + move obstacles
    ctx.fillStyle = "#ff3b3b";
    obstacles.forEach((o) => {
        o.y += o.speed;
        ctx.fillRect(o.x, o.y, o.width, o.height);

        // Collision detection
        if (
            o.x < player.x + player.width &&
            o.x + o.width > player.x &&
            o.y < player.y + player.height &&
            o.y + o.height > player.y
        ) {
            showGameOver();
        }
    });

    // Remove off-screen obstacles
    obstacles = obstacles.filter((o) => o.y < canvas.height);

    // Score + difficulty
    score++;
    increaseDifficulty();

    // Draw score
    ctx.fillStyle = "#fff";
    ctx.font = "16px Inter";
    ctx.fillText("Score: " + score, 10, 20);

    requestAnimationFrame(update);
}

update();

