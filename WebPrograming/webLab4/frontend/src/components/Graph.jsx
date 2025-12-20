import React from 'react';

function Graph({ points, r, onCheck }) {
    const SIZE = 300;
    const CENTER = SIZE / 2;
    const SCALE = SIZE / 10; // 1 unit = 30px. Range -5 to 5.

    const handleClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const x = (mouseX - CENTER) / SCALE;
        const y = -(mouseY - CENTER) / SCALE;

        onCheck(x, y);
    };

    const validR = r > 0 ? r : 0;

    return (
        <div className="graph-section">
            <svg
                width={SIZE}
                height={SIZE}
                onClick={handleClick}
                style={{ border: '1px solid #ccc', cursor: 'crosshair', background: 'white' }}
            >
                {/* Axes */}
                <line x1={0} y1={CENTER} x2={SIZE} y2={CENTER} stroke="black" />
                <line x1={CENTER} y1={0} x2={CENTER} y2={SIZE} stroke="black" />

                {/* Arrows */}
                <polygon points={`${SIZE},${CENTER} ${SIZE - 5},${CENTER - 5} ${SIZE - 5},${CENTER + 5}`} fill="black" />
                <polygon points={`${CENTER},0 ${CENTER - 5},5 ${CENTER + 5},5`} fill="black" />

                {/* Area */}
                {validR > 0 && (
                    <g fill="#6c5ce7" fillOpacity="0.5">
                        {/* Q2 Triangle: (0,0), (0, r/2), (-r/2, 0) */}
                        {/* Logic: y <= x + r/2. Corner (-r/2, 0) -> y=0 <= -r/2 + r/2 = 0. Correct. */}
                        {/* Coords: 0,0 -> 0, R/2 -> -R/2, 0 */}
                        <polygon
                            points={`
                           ${CENTER},${CENTER} 
                           ${CENTER},${CENTER - (validR / 2) * SCALE} 
                           ${CENTER - (validR / 2) * SCALE},${CENTER}
                        `}
                        />

                        {/* Q3 Square: (0,0) to (-R, -R) */}
                        <rect
                            x={CENTER - validR * SCALE}
                            y={CENTER}
                            width={validR * SCALE}
                            height={validR * SCALE}
                        />

                        {/* Q4 Sector: x>=0, y<=0. x^2+y^2 <= R^2. 
                         Start (0,0) -> (R,0) -> Arc to (0,-R) -> (0,0).
                         (0, -R) in SVG is y = CENTER + R*SCALE. 
                     */}
                        <path
                            d={`
                           M ${CENTER} ${CENTER}
                           L ${CENTER + validR * SCALE} ${CENTER}
                           A ${validR * SCALE} ${validR * SCALE} 0 0 1 ${CENTER} ${CENTER + validR * SCALE}
                           Z
                        `}
                        />
                    </g>
                )}

                {/* Points */}
                {points.map((p, idx) => (
                    <circle
                        key={idx}
                        cx={CENTER + p.x * SCALE}
                        cy={CENTER - p.y * SCALE}
                        r={4}
                        fill={p.hit ? 'green' : 'red'}
                    />
                ))}
            </svg>
        </div>
    );
}

export default Graph;
