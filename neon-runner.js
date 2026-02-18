const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 160, y: 520, width: 40, height: 40, speed: 6 };
let obstacles = [];
let score = 0;
let gameOver = false;

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") player.x -= player.speed;
    if (e.key === "ArrowRight") player.x += player.speed;
});

function spawnObstacle() {
    const size = 40;
    const x = Math.random() * (canvas.width - size);
    obstacles.push({ x, y: -size, width: size, height: size, speed: 4 });
}

setInterval(spawnObstacle, 900);

function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = "#00eaff";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Move & draw obstacles
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
            gameOver = true;
            alert("Game Over! Score: " + score);
            window.location.reload();
        }
    });

    // Remove off-screen obstacles
    obstacles = obstacles.filter((o) => o.y < canvas.height);

    // Score
    score++;
    ctx.fillStyle = "#fff";
    ctx.font = "16px Inter";
    ctx.fillText("Score: " + score, 10, 20);

    requestAnimationFrame(update);
}

update();
