/**
 * AR rendering utilities for drawing hairstyle and beard overlays
 * In a real app, this would use 3D models (Three.js) or SVG overlays.
 * For this MVP, we use canvas drawing to represent the styles.
 */

export function renderAROverlay(
  ctx: CanvasRenderingContext2D,
  landmarks: any,
  styleId: string,
  type: 'hair' | 'beard'
) {
  if (type === 'hair') {
    drawHairStyle(ctx, landmarks, styleId);
  } else {
    drawBeardStyle(ctx, landmarks, styleId);
  }
}

function drawHairStyle(ctx: CanvasRenderingContext2D, landmarks: any, styleId: string) {
  // Use forehead and top head landmarks for hair positioning
  // Landmarks 10 (top), 109, 338, 21 (eyebrow left), 251 (eyebrow right)
  const top = landmarks[10];
  const leftEdge = landmarks[103];
  const rightEdge = landmarks[332];

  ctx.save();
  ctx.fillStyle = 'rgba(20, 20, 20, 0.8)';

  // Simplified shape based on styleId
  if (styleId === 'h1') { // Classic Side Part
    ctx.beginPath();
    ctx.moveTo(leftEdge.x * ctx.canvas.width, (leftEdge.y - 0.05) * ctx.canvas.height);
    ctx.quadraticCurveTo(
      top.x * ctx.canvas.width, (top.y - 0.15) * ctx.canvas.height,
      rightEdge.x * ctx.canvas.width, (rightEdge.y - 0.05) * ctx.canvas.height
    );
    ctx.lineTo(rightEdge.x * ctx.canvas.width, rightEdge.y * ctx.canvas.height);
    ctx.lineTo(leftEdge.x * ctx.canvas.width, leftEdge.y * ctx.canvas.height);
    ctx.closePath();
    ctx.fill();
  } else {
    // Default messy crop
    ctx.beginPath();
    ctx.moveTo(leftEdge.x * ctx.canvas.width, leftEdge.y * ctx.canvas.height);
    for (let i = 0; i < 10; i++) {
        const x = (leftEdge.x + (rightEdge.x - leftEdge.x) * (i/10)) * ctx.canvas.width;
        const y = (top.y - 0.1 - Math.random() * 0.05) * ctx.canvas.height;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(rightEdge.x * ctx.canvas.width, rightEdge.y * ctx.canvas.height);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

function drawBeardStyle(ctx: CanvasRenderingContext2D, landmarks: any, styleId: string) {
  // Use jawline landmarks 58 to 288
  ctx.save();
  ctx.fillStyle = 'rgba(40, 30, 20, 0.6)';

  ctx.beginPath();
  const jawIndices = [58, 172, 136, 150, 149, 176, 148, 152, 377, 400, 378, 379, 365, 397, 288];

  const first = landmarks[jawIndices[0]];
  ctx.moveTo(first.x * ctx.canvas.width, first.y * ctx.canvas.height);

  for (let i = 1; i < jawIndices.length; i++) {
    const p = landmarks[jawIndices[i]];
    ctx.lineTo(p.x * ctx.canvas.width, p.y * ctx.canvas.height);
  }

  // Connect back along the lip line (simplified)
  const underLip = landmarks[200];
  ctx.lineTo(underLip.x * ctx.canvas.width, underLip.y * ctx.canvas.height);

  ctx.closePath();
  ctx.fill();

  ctx.restore();
}
