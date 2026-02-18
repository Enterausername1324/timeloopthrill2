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

// Movement flags
let moveLeft = false;
let moveRight = false;

// SLOWER, BALANCED SPEED
const MOVE_SPEED = 5; // was 8 — now slower and smoother

// Game state
let obstacles = [];
let score = 0;
let gameOver = false;

// SLOWER OBSTACLE SPEED
let obstacleSpeed = 2.5; // was 4

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
    if (e.key === "ArrowLeft" || e.key === "a") moveLeft = true;
    if (e.key === "ArrowRight" || e.key === "d") moveRight = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a") moveLeft = false;
    if (e.key === "ArrowRight" || e.key === "d") moveRight = false;
});

// ============================
// TOUCH BUTTON CONTROLS
// ============================
leftBtn.addEventListener("touchstart", () => moveLeft = true);
leftBtn.addEventListener("touchend", () => moveLeft = false);

rightBtn.addEventListener("touchstart", () => moveRight = true);
rightBtn.addEventListener("touchend", () => moveRight = false);

// Mouse support (for tablets w/ cursor)
leftBtn.addEventListener("mousedown", () => moveLeft = true);
leftBtn.addEventListener("mouseup", () => moveLeft = false);
leftBtn.addEventListener("mouseleave", () => moveLeft = false);

rightBtn.addEventListener("mousedown", () => moveRight = true);
rightBtn.addEventListener("mouseup", () => moveRight = false);
rightBtn.addEventListener("mouseleave", () => moveRight = false);

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

// Slower spawn rate
setInterval(() => {
    if (!gameOver) spawnObstacle();
}, 650); // was 500

// ============================
// DIFFICULTY (SLOWER)
// ============================
function increaseDifficulty() {
    if (score % 500 === 0) { // was 300
        obstacleSpeed += 0.25; // slower increase
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

    // Movement (same speed for PC + mobile)
    if (moveLeft) player.x -= MOVE_SPEED;
    if (moveRight) player.x += MOVE_SPEED;

    // Boundaries
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));

    // Draw player
    ctx.fillStyle = "#00eaff";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Obstacles
    ctx.fillStyle = "#ff3b3b";
    obstacles.forEach((o) => {
        o.y += o.speed;
        ctx.fillRect(o.x, o.y, o.width, o.height);

        // Collision
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

    // Score + difficulty
    score++;
    increaseDifficulty();

    ctx.fillStyle = "#fff";
    ctx.font = "16px Inter";
    ctx.fillText("Score: " + score, 10, 20);

    requestAnimationFrame(update);
}

update();
