interface CircuitTopProps {
  color: string;
}

function CircuitTop({ color }: CircuitTopProps) {
  return (
    <svg
      width="82"
      height="28"
      viewBox="0 0 82 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 15">
        <path
          id="Vector 4"
          d="M6.5 3.5H21.5L59.5 24.5H75"
          stroke={color}
          stroke-width="2"
        />
        <circle
          id="Ellipse 8"
          cx="3.5"
          cy="3.5"
          r="3"
          stroke={color}
          stroke-width="2"
        />
        <circle
          id="Ellipse 11"
          cx="78.5"
          cy="24.5"
          r="3"
          stroke={color}
          stroke-width="2"
        />
      </g>
    </svg>
  );
}

export default CircuitTop;
