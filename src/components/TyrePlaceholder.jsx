import React from 'react';

function TyrePlaceholder({brand = 'Unknown Tire', size = ''}) {
    const fontSize = 10;
    const letterSpacing = 1.5;
    const r = 38;
    const strokeWidth = 20;

    return (
        <div className="w-full h-full flex items-center justify-center">
            <svg
                viewBox="0 0 100 100"
                className="w-full h-full max-w-full max-h-full"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Tyre outline */}
                <circle
                    cx="50"
                    cy="50"
                    r={r}
                    fill="none"
                    stroke="#4b3f36"
                    strokeWidth={strokeWidth}
                />

                {/* Outer thin border */}
                <circle
                    cx="50"
                    cy="50"
                    r={r + strokeWidth / 2}
                    fill="none"
                    stroke="#000"
                    strokeWidth="1"
                />

                {/* Inner thin border */}
                <circle
                    cx="50"
                    cy="50"
                    r={r - strokeWidth / 2}
                    fill="none"
                    stroke="#000"
                    strokeWidth="2"
                />

                {/*Protectors*/}
                {
                    Array.from({ length: 12 }).map((_, i) => {
                        const angle = (i / 12) * 2 * Math.PI;
                        const outerR = r + strokeWidth / 2;
                        const innerR = r - strokeWidth / 2 + 2; // трішки вглиб

                        const x1 = 50 + Math.cos(angle) * outerR;
                        const y1 = 50 + Math.sin(angle) * outerR;
                        const x2 = 50 + Math.cos(angle) * innerR;
                        const y2 = 50 + Math.sin(angle) * innerR;

                        return (
                            <line
                                key={i}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="black"
                                strokeWidth="0.5"
                                strokeLinecap="round"
                            />
                        );
                    })
                }

                {/* Circular single-line brand name */}
                <defs>
                    <path id="textCircle" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"/>
                </defs>
                <text
                    fill="#ffffff"
                    fontSize={fontSize}
                    letterSpacing={letterSpacing}
                >
                    <textPath
                        href="#textCircle"
                        startOffset="50%"
                        textAnchor="middle"
                    >
                        {`${brand} ${size}`}
                    </textPath>
                </text>
            </svg>
        </div>
    );
}

export default TyrePlaceholder;
