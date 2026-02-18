// ============================
// CANVAS SETUP
// ============================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player
let player = {
    x: 160,
    y: 520,
    width: 40,
    height: 40
};

// Movement
let moveLeft = false;
let moveRight = false;
const MOVE_SPEED = 8;

// Game state
let obstacles = [];
let score = 0;
let gameOver = false;
let obstacleSpeed = 4;

// UI
const gameOverScreen = document.getElementById("gameOver");
const finalScoreEl = document.getElementById("finalScore");
const highScoreEl = document.getElementById("highScore");

// Buttons
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

// ============================
// KEYBOARD CONTROLS
// ============================
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") moveLeft = true;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") moveRight = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") moveLeft = false;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") moveRight = false;
});

// ============================
// TOUCH BUTTON CONTROLS
// ============================
if (leftBtn && rightBtn) {
    leftBtn.addEventListener("touchstart", () => { moveLeft = true; });
    leftBtn.addEventListener("touchend", () => { moveLeft = false; });

    rightBtn.addEventListener("touchstart", () => { moveRight = true; });
    rightBtn.addEventListener("touchend", () => { moveRight = false; });

    // Also support mouse click/hold (for tablets with cursors)
    leftBtn.addEventListener("mousedown", () => { moveLeft = true; });
    leftBtn.addEventListener("mouseup", () => { moveLeft = false; });
    leftBtn.addEventListener("mouseleave", () => { moveLeft = false; });

    rightBtn.addEventListener("mousedown", () => { moveRight = true; });
    rightBtn.addEventListener("mouseup", () => { moveRight = false; });
    rightBtn.addEventListener("mouseleave", () => { moveRight = false; });
}

// ============================
// OBSTACLES
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

setInterval(() => {
    if (!gameOver) spawnObstacle();
}, 500);

// ============================
// DIFFICULTY
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
// MAIN LOOP
// ============================
function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Movement
    if (moveLeft) player.x -= MOVE_SPEED;
    if (moveRight) player.x += MOVE_SPEED;

    // Bounds
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));

    // Player
    ctx.fillStyle = "#00eaff";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Obstacles
    ctx.fillStyle = "#ff3b3b";
    obstacles.forEach((o) => {
        o.y += o.speed;
        ctx.fillRect(o.x, o.y, o.width, o.height);

        if (
            o.x < player.x + player.width &&
            o.x + o.width > player.x &&
            o.y < player.y + player.height &&
            o.y + o.height > player.y
        ) {
            showGameOver();
        }
    });

    obstacles = obstacles.filter((o) => o.y < canvas.height);

    // Score
    score++;
    increaseDifficulty();

    ctx.fillStyle = "#fff";
    ctx.font = "16px Inter";
    ctx.fillText("Score: " + score, 10, 20);

    requestAnimationFrame(update);
}

update();
