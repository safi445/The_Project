/**
 * AR rendering utilities for drawing hairstyle and beard overlays
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
  const top = landmarks[10];
  const leftEdge = landmarks[103];
  const rightEdge = landmarks[332];
  const hairlineTop = landmarks[151]; // More precise hairline center

  ctx.save();

  // Style-specific colors and gradients
  const hairGradient = ctx.createLinearGradient(
    0, top.y * ctx.canvas.height - 50,
    0, hairlineTop.y * ctx.canvas.height
  );
  hairGradient.addColorStop(0, '#1a1a1a');
  hairGradient.addColorStop(1, '#2d2d2d');

  ctx.fillStyle = hairGradient;
  ctx.shadowBlur = 10;
  ctx.shadowColor = 'rgba(0,0,0,0.5)';

  if (styleId === 'h1') { // Classic Side Part
    ctx.beginPath();
    ctx.moveTo(leftEdge.x * ctx.canvas.width, leftEdge.y * ctx.canvas.height);
    ctx.bezierCurveTo(
      leftEdge.x * ctx.canvas.width, (top.y - 0.12) * ctx.canvas.height,
      rightEdge.x * ctx.canvas.width, (top.y - 0.12) * ctx.canvas.height,
      rightEdge.x * ctx.canvas.width, rightEdge.y * ctx.canvas.height
    );
    ctx.lineTo(rightEdge.x * ctx.canvas.width, (rightEdge.y + 0.02) * ctx.canvas.height);
    ctx.lineTo(leftEdge.x * ctx.canvas.width, (leftEdge.y + 0.02) * ctx.canvas.height);
    ctx.closePath();
    ctx.fill();

    // Add a part line
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo((top.x - 0.05) * ctx.canvas.width, (top.y - 0.05) * ctx.canvas.height);
    ctx.lineTo((top.x - 0.02) * ctx.canvas.width, top.y * ctx.canvas.height);
    ctx.stroke();
  } else if (styleId === 'h3') { // Pompadour
    ctx.beginPath();
    ctx.moveTo(leftEdge.x * ctx.canvas.width, leftEdge.y * ctx.canvas.height);
    ctx.quadraticCurveTo(
      top.x * ctx.canvas.width, (top.y - 0.25) * ctx.canvas.height,
      rightEdge.x * ctx.canvas.width, rightEdge.y * ctx.canvas.height
    );
    ctx.lineTo(rightEdge.x * ctx.canvas.width, (rightEdge.y + 0.05) * ctx.canvas.height);
    ctx.lineTo(leftEdge.x * ctx.canvas.width, (leftEdge.y + 0.05) * ctx.canvas.height);
    ctx.closePath();
    ctx.fill();
  } else {
    // Default textured crop with "spiky" top
    ctx.beginPath();
    ctx.moveTo(leftEdge.x * ctx.canvas.width, leftEdge.y * ctx.canvas.height);
    for (let i = 0; i <= 20; i++) {
        const x = (leftEdge.x + (rightEdge.x - leftEdge.x) * (i/20)) * ctx.canvas.width;
        const jitter = i % 2 === 0 ? 0.02 : 0;
        const y = (top.y - 0.08 - jitter) * ctx.canvas.height;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(rightEdge.x * ctx.canvas.width, rightEdge.y * ctx.canvas.height);
    ctx.lineTo(rightEdge.x * ctx.canvas.width, (rightEdge.y + 0.03) * ctx.canvas.height);
    ctx.lineTo(leftEdge.x * ctx.canvas.width, (leftEdge.y + 0.03) * ctx.canvas.height);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

function drawBeardStyle(ctx: CanvasRenderingContext2D, landmarks: any, styleId: string) {
  ctx.save();

  const beardColor = styleId === 'b2' ? 'rgba(30, 20, 10, 0.3)' : 'rgba(25, 15, 5, 0.7)';
  ctx.fillStyle = beardColor;

  ctx.beginPath();
  const jawIndices = [58, 172, 136, 150, 149, 176, 148, 152, 377, 400, 378, 379, 365, 397, 288];

  const first = landmarks[jawIndices[0]];
  ctx.moveTo(first.x * ctx.canvas.width, first.y * ctx.canvas.height);

  for (let i = 1; i < jawIndices.length; i++) {
    const p = landmarks[jawIndices[i]];
    ctx.lineTo(p.x * ctx.canvas.width, p.y * ctx.canvas.height);
  }

  // Connect lip line
  const lipUpper = landmarks[164];
  const lipLower = landmarks[18];

  ctx.lineTo(landmarks[288].x * ctx.canvas.width, (landmarks[288].y - 0.05) * ctx.canvas.height);
  ctx.quadraticCurveTo(
    lipLower.x * ctx.canvas.width, (lipLower.y + 0.02) * ctx.canvas.height,
    landmarks[58].x * ctx.canvas.width, (landmarks[58].y - 0.05) * ctx.canvas.height
  );

  ctx.closePath();
  ctx.fill();

  // Moustache
  ctx.beginPath();
  ctx.moveTo(landmarks[205].x * ctx.canvas.width, landmarks[205].y * ctx.canvas.height);
  ctx.quadraticCurveTo(
    landmarks[164].x * ctx.canvas.width, (landmarks[164].y - 0.02) * ctx.canvas.height,
    landmarks[425].x * ctx.canvas.width, landmarks[425].y * ctx.canvas.height
  );
  ctx.lineTo(landmarks[425].x * ctx.canvas.width, (landmarks[425].y + 0.01) * ctx.canvas.height);
  ctx.lineTo(landmarks[205].x * ctx.canvas.width, (landmarks[205].y + 0.01) * ctx.canvas.height);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}
