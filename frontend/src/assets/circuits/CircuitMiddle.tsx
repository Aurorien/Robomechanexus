interface CircuitMiddleProps {
  color: string;
}

function CircuitMiddle({ color }: CircuitMiddleProps) {
  return (
    <svg
      width="82"
      height="7"
      viewBox="0 0 82 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 18">
        <path id="Vector 6" d="M7 3.5H75.5" stroke={color} stroke-width="2" />
        <g id="Group 16">
          <circle
            id="Ellipse 10"
            cx="78.5"
            cy="3.5"
            r="3"
            stroke={color}
            stroke-width="2"
          />
          <circle
            id="Ellipse 13"
            cx="3.5"
            cy="3.5"
            r="3"
            stroke={color}
            stroke-width="2"
          />
        </g>
      </g>
    </svg>
  );
}

export default CircuitMiddle;
