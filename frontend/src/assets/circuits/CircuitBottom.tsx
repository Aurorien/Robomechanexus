interface CircuitBottomProps {
  color: string;
}

function CircuitBottom({ color }: CircuitBottomProps) {
  return (
    <svg
      width="82"
      height="28"
      viewBox="0 0 82 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 17">
        <path
          id="Vector 5"
          d="M6 25H20.5L60.5 3.5H75"
          stroke={color}
          stroke-width="2"
        />
        <circle
          id="Ellipse 9"
          cx="78.5"
          cy="3.5"
          r="3"
          stroke={color}
          stroke-width="2"
        />
        <circle
          id="Ellipse 12"
          cx="3.5"
          cy="24.5"
          r="3"
          stroke={color}
          stroke-width="2"
        />
      </g>
    </svg>
  );
}

export default CircuitBottom;
