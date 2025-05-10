import { Link } from "react-router-dom";
import "./OctaButton.css";

interface OctaButtonProps {
  text: string;
  linkPath: string;
}

function OctaButton({ text, linkPath }: OctaButtonProps) {
  return (
    <button className="nav-button" aria-label={text} role="button" tabIndex={0}>
      <svg
        width="120"
        height="70"
        viewBox="0 0 120 67"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id="insetGlow">
            <feOffset dx="0" dy="0" result="offsetblur" />
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite
              in="SourceGraphic"
              in2="blur"
              operator="out"
              result="shadowDiff"
            />
            <feFlood
              flood-color="var(--blue-gradient)"
              flood-opacity="0.5"
              result="glowColor"
            />
            <feComposite
              in="glowColor"
              in2="shadowDiff"
              operator="in"
              result="softGlow"
            />
            <feComposite in="softGlow" in2="SourceGraphic" operator="over" />
          </filter>

          <radialGradient
            id="buttonFill"
            cx="50%"
            cy="50%"
            r="100%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="var(--blue-dark)" />
            <stop offset="80%" stopColor="var(--blue-dark)" />
            <stop offset="100%" stopColor="var(--blue-dark-2)" />
          </radialGradient>
        </defs>

        <polygon
          points="25,5 95,5 115,35 95,65 25,65 5,35"
          className="octagon-outer"
        />

        <polygon
          points="30,10 90,10 105,35 90,60 30,60 15,35"
          className="octagon-inner"
        />

        <text x="61" y="37" className="button-text">
          <Link to={linkPath}>{text}</Link>
        </text>
      </svg>
    </button>
  );
}

export default OctaButton;
