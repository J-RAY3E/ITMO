import React, { useState } from 'react';

function Graph({ points, r, onCheck }) {
    const SIZE = 300;
    const CENTER = SIZE / 2;
    const SCALE = 30;

    const [hoverPos, setHoverPos] = useState(null);

    const handleClick = (e) => {
        const svg = e.currentTarget;
        const rect = svg.getBoundingClientRect();
        const xPixels = e.clientX - rect.left;
        const yPixels = e.clientY - rect.top;

        const mathX = (xPixels - CENTER) / SCALE;
        const mathY = -(yPixels - CENTER) / SCALE;

        onCheck(mathX, mathY);
    };

    const handleMouseMove = (e) => {
        const svg = e.currentTarget;
        const rect = svg.getBoundingClientRect();
        const xPixels = e.clientX - rect.left;
        const yPixels = e.clientY - rect.top;

        const mathX = (xPixels - CENTER) / SCALE;
        const mathY = -(yPixels - CENTER) / SCALE;

        const formatTooltip = (val) => {
            const num = parseFloat(val);
            if (isNaN(num)) return val;
            const str = num.toString();
            if (str.includes('.') && str.split('.')[1].length > 4) {
                return num.toExponential(2);
            }
            return num.toFixed(2);
        };

        setHoverPos({
            x: formatTooltip(mathX),
            y: formatTooltip(mathY),
            px: xPixels,
            py: yPixels
        });
    };

    const handleMouseLeave = () => {
        setHoverPos(null);
    };

    const rVal = parseFloat(r) || 0;
    const absR = Math.abs(rVal);
    const rPixels = absR * SCALE;
    const halfRPixels = rPixels / 2;

    const transform = rVal < 0 ? "scale(-1, -1)" : "";

    const ticks = [1, 2, 3, 4];

    const PURPLE = "#8b5cf6";
    const FUCHSIA = "#d946ef";

    return (
        <div className="graph-wrapper" style={{ position: 'relative', width: SIZE, padding: '10px' }}>
            <svg id="graph-svg" width={SIZE} height={SIZE}
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'crosshair', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                <g stroke="#ffffff11" strokeWidth="1">
                    {ticks.map(t => {
                        const px = t * SCALE;
                        return (
                            <React.Fragment key={t}>
                                <line x1={CENTER + px} y1="0" x2={CENTER + px} y2={SIZE} />
                                <line x1={CENTER - px} y1="0" x2={CENTER - px} y2={SIZE} />
                                <line x1="0" y1={CENTER + px} x2={SIZE} y2={CENTER + px} />
                                <line x1="0" y1={CENTER - px} x2={SIZE} y2={CENTER - px} />
                            </React.Fragment>
                        );
                    })}
                </g>

                {absR > 0 && (
                    <g transform={`translate(${CENTER}, ${CENTER}) ${transform}`}>
                        <path d={`M 0,0 L -${rPixels},0 A ${rPixels},${rPixels} 0 0,1 0,-${rPixels} Z`} fill="rgba(139, 92, 246, 0.4)" />
                        <polygon points={`0,0 ${rPixels},0 0,${rPixels}`} fill="rgba(139, 92, 246, 0.4)" />
                        <rect x={`-${halfRPixels}`} y="0" width={halfRPixels} height={rPixels} fill="rgba(139, 92, 246, 0.4)" />
                    </g>
                )}
                <g stroke="#ffffff55" strokeWidth="1.5">
                    <line x1="0" y1={CENTER} x2={SIZE} y2={CENTER} />
                    <line x1={CENTER} y1="0" x2={CENTER} y2={SIZE} />
                </g>

                <g fill="#ffffff77" fontSize="10" textAnchor="middle">
                    {ticks.map(t => (
                        <React.Fragment key={t}>
                            <text x={CENTER + t * SCALE} y={CENTER + 15}>{t}</text>
                            <text x={CENTER - t * SCALE} y={CENTER + 15}>-{t}</text>
                            <text x={CENTER - 15} y={CENTER - t * SCALE + 4}>{t}</text>
                            <text x={CENTER - 15} y={CENTER + t * SCALE + 4}>-{t}</text>
                        </React.Fragment>
                    ))}
                </g>

                {absR > 0 && (
                    <g strokeDasharray="4 4" strokeWidth="1.5">
                        <line x1="0" y1={CENTER - rPixels * (rVal < 0 ? -1 : 1)} x2={SIZE} y2={CENTER - rPixels * (rVal < 0 ? -1 : 1)} stroke={PURPLE} />
                        <line x1={CENTER - rPixels * (rVal < 0 ? -1 : 1)} y1="0" x2={CENTER - rPixels * (rVal < 0 ? -1 : 1)} y2={SIZE} stroke={PURPLE} />
                        <line x1={CENTER + rPixels * (rVal < 0 ? -1 : 1)} y1="0" x2={CENTER + rPixels * (rVal < 0 ? -1 : 1)} y2={SIZE} stroke={PURPLE} />
                        <line x1="0" y1={CENTER + rPixels * (rVal < 0 ? -1 : 1)} x2={SIZE} y2={CENTER + rPixels * (rVal < 0 ? -1 : 1)} stroke={PURPLE} />
                        <line x1="0" y1={CENTER - halfRPixels * (rVal < 0 ? -1 : 1)} x2={SIZE} y2={CENTER - halfRPixels * (rVal < 0 ? -1 : 1)} stroke={FUCHSIA} />
                        <line x1="0" y1={CENTER + halfRPixels * (rVal < 0 ? -1 : 1)} x2={SIZE} y2={CENTER + halfRPixels * (rVal < 0 ? -1 : 1)} stroke={FUCHSIA} />
                        <line x1={CENTER - halfRPixels * (rVal < 0 ? -1 : 1)} y1="0" x2={CENTER - halfRPixels * (rVal < 0 ? -1 : 1)} y2={SIZE} stroke={FUCHSIA} />
                        <line x1={CENTER + halfRPixels * (rVal < 0 ? -1 : 1)} y1="0" x2={CENTER + halfRPixels * (rVal < 0 ? -1 : 1)} y2={SIZE} stroke={FUCHSIA} />
                    </g>
                )}

                {points.map((p, i) => {
                    const plotX = CENTER + (p.x * SCALE);
                    const plotY = CENTER - (p.y * SCALE);
                    if (plotX < 0 || plotX > SIZE || plotY < 0 || plotY > SIZE) return null;
                    return (
                        <circle className="point-circle" key={i} cx={plotX} cy={plotY} r="3.5"
                            fill={p.hit ? "#10b981" : "#ef4444"}
                            stroke="white" strokeWidth="1" />
                    );
                })}

                {hoverPos && (
                    <g pointerEvents="none">
                        <rect id="tooltip-rect" x={hoverPos.px + 10} y={hoverPos.py - 25} width="85" height="20" rx="4" fill="rgba(0,0,0,0.85)" />
                        <text id="tooltip-text" x={hoverPos.px + 15} y={hoverPos.py - 11} fill="white" fontSize="10" fontWeight="600">
                            {`(${hoverPos.x}, ${hoverPos.y})`}
                        </text>
                    </g>
                )}
            </svg>

            <div className="legend" style={{
                marginTop: '10px',
                fontSize: '0.75rem',
                display: 'flex',
                gap: '1.5rem',
                justifyContent: 'center',
                color: 'var(--text-muted)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '15px', height: '2px', borderTop: `2px dashed ${PURPLE}` }}></div>
                    <span>R</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '15px', height: '2px', borderTop: `2px dashed ${FUCHSIA}` }}></div>
                    <span>R/2</span>
                </div>
            </div>
        </div>
    );
}

export default Graph;
