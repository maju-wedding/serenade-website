"use client";

interface HexagonChartProps {
  scores: {
    label: string;
    value: number;
    maxValue?: number;
    average?: number;
    difference?: number;
  }[];
}

export function HexagonChart({ scores }: HexagonChartProps) {
  const centerX = 120;
  const centerY = 120;
  const radius = 80;
  const angleStep = (2 * Math.PI) / scores.length;
  const maxScore = 10; // Assuming max score is 10

  // Calculate points for the outer hexagon (background)
  const outerPoints = scores.map((_, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Calculate points for the data hexagon
  const dataPoints = scores.map((score, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const normalizedValue = score.value / (score.maxValue || maxScore);
    const r = radius * normalizedValue;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Calculate points for the average hexagon (if averages exist)
  const hasAverages = scores.some(s => s.average !== undefined);
  const averagePoints = hasAverages ? scores.map((score, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const normalizedValue = (score.average || 0) / (score.maxValue || maxScore);
    const r = radius * normalizedValue;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ') : null;

  // Grid lines from center to each vertex
  const gridLines = scores.map((_, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x1: centerX, y1: centerY, x2: x, y2: y };
  });

  // Labels positions
  const labels = scores.map((score, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const labelRadius = radius + 25;
    const x = centerX + labelRadius * Math.cos(angle);
    const y = centerY + labelRadius * Math.sin(angle);
    return { x, y, text: score.label, value: score.value };
  });

  return (
    <div className="flex justify-center">
      <svg width="240" height="240" viewBox="0 0 240 240" className="w-full max-w-[240px]">
        {/* Background circles for reference */}
        <circle cx={centerX} cy={centerY} r={radius * 0.2} fill="none" stroke="#f3f4f6" strokeWidth="1" />
        <circle cx={centerX} cy={centerY} r={radius * 0.4} fill="none" stroke="#f3f4f6" strokeWidth="1" />
        <circle cx={centerX} cy={centerY} r={radius * 0.6} fill="none" stroke="#f3f4f6" strokeWidth="1" />
        <circle cx={centerX} cy={centerY} r={radius * 0.8} fill="none" stroke="#f3f4f6" strokeWidth="1" />
        
        {/* Grid lines */}
        {gridLines.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {/* Outer hexagon */}
        <polygon
          points={outerPoints}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="2"
        />

        {/* Average hexagon (if exists) */}
        {averagePoints && (
          <polygon
            points={averagePoints}
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
        )}

        {/* Data hexagon */}
        <polygon
          points={dataPoints}
          fill="rgba(251, 101, 65, 0.2)"
          stroke="#FB6541"
          strokeWidth="2"
        />

        {/* Data points */}
        {scores.map((score, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const normalizedValue = score.value / (score.maxValue || maxScore);
          const r = radius * normalizedValue;
          const x = centerX + r * Math.cos(angle);
          const y = centerY + r * Math.sin(angle);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill="#FB6541"
              stroke="white"
              strokeWidth="2"
            />
          );
        })}

        {/* Labels */}
        {labels.map((label, index) => (
          <g key={index}>
            <text
              x={label.x}
              y={label.y - 5}
              textAnchor="middle"
              className="text-xs font-medium fill-gray-700"
            >
              {label.text}
            </text>
            <text
              x={label.x}
              y={label.y + 8}
              textAnchor="middle"
              className="text-xs font-bold fill-[#FB6541]"
            >
              {label.value.toFixed(1)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}