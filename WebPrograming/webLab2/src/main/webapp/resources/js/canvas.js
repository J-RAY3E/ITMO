/**
 * Canvas functionality for interactive point visualization
 */

const CANVAS_SIZE = 400;
const CENTER = CANVAS_SIZE / 2;
const SCALE = 80; // pixels per unit

function drawCanvas(r) {
    const canvas = document.getElementById('pointCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(CENTER, 0);
    ctx.lineTo(CENTER, CANVAS_SIZE);
    ctx.moveTo(0, CENTER);
    ctx.lineTo(CANVAS_SIZE, CENTER);
    ctx.stroke();

    // Draw arrows
    drawArrow(ctx, CENTER, 10, CENTER, 0);
    drawArrow(ctx, CANVAS_SIZE - 10, CENTER, CANVAS_SIZE, CENTER);

    // Draw shapes based on radius
    ctx.fillStyle = 'rgba(102, 126, 234, 0.3)';
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 2;

    const rPixels = r * SCALE;

    // Quadrant II: Quarter circle
    ctx.beginPath();
    ctx.arc(CENTER, CENTER, rPixels, Math.PI, Math.PI * 1.5);
    ctx.lineTo(CENTER, CENTER);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Quadrant III: Rectangle (width R/2, height R)
    ctx.fillRect(CENTER - rPixels / 2, CENTER, rPixels / 2, rPixels);
    ctx.strokeRect(CENTER - rPixels / 2, CENTER, rPixels / 2, rPixels);

    // Quadrant IV: Triangle
    ctx.beginPath();
    ctx.moveTo(CENTER, CENTER);
    ctx.lineTo(CENTER + rPixels, CENTER);
    ctx.lineTo(CENTER, CENTER + rPixels / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw grid and labels
    drawGrid(ctx, r);
}

function drawArrow(ctx, fromX, fromY, toX, toY) {
    const headLen = 10;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6),
        toY - headLen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6),
        toY - headLen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
}

function drawGrid(ctx, r) {
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    ctx.font = '12px Arial';
    ctx.fillStyle = '#666';

    for (let i = -Math.ceil(r); i <= Math.ceil(r); i++) {
        if (i === 0) continue;

        const x = CENTER + i * SCALE;
        const y = CENTER + i * SCALE;

        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_SIZE);
        ctx.stroke();

        // Horizontal lines  
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(CANVAS_SIZE, y);
        ctx.stroke();

        // Labels
        ctx.fillText(i.toString(), x - 5, CENTER - 5);
        ctx.fillText((-i).toString(), CENTER + 5, y + 5);
    }
}

function drawPoints() {
    // This function would draw all points from the results table
    // Implementation depends on how we pass the results data to JavaScript
}

function handleCanvasClick(event) {
    const canvas = document.getElementById('pointCanvas');
    const rect = canvas.getBoundingClientRect();

    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;

    // Convert canvas coordinates to mathematical coordinates
    const x = (canvasX - CENTER) / SCALE;
    const y = -(canvasY - CENTER) / SCALE;

    // Set hidden input values
    document.getElementById('canvasForm:canvasXInput').value = x.toFixed(2);
    document.getElementById('canvasForm:canvasYInput').value = y.toFixed(2);

    // Submit the form
    submitCanvasPoint();
}

// Add event listener when page loads
window.addEventListener('load', function () {
    const canvas = document.getElementById('pointCanvas');
    if (canvas) {
        canvas.addEventListener('click', handleCanvasClick);

        const rInput = document.getElementById('canvasForm:currentR');
        if (rInput) {
            const r = parseFloat(rInput.value) || 1;
            drawCanvas(r);
        }
    }
});
