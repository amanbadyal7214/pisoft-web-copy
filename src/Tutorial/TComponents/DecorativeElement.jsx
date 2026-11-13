// DotGrid.jsx
export const DotGrid = ({
  color = "#f07c22",
  className = "",
}) => (
  <svg
    className={className}
    width="75"
    height="75"
    viewBox="0 0 101 75"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {[0, 17.5488, 35.0986, 52.6475, 70.1963].map((y) =>
      [2.2146, 21.4348, 40.6553, 59.8757, 79.0962, 98.3164].map((x) => (
        <rect
          key={`${x}-${y}`}
          width="3.13"
          height="3.13"
          transform={`matrix(0.707 0.707 -0.707 0.707 ${x} ${y})`}
          fill={color}
        />
      ))
    )}
  </svg>
);

export const StarShape = ({ className = "" }) => (
  <svg
    className={className}
    width="38"
    height="38"
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.651129 19.1367C10.928 19.0878 19.2461 10.8072 19.2657 0.592236C19.2849 10.6462 27.3431 18.8262 37.3956 19.1283L37.3951 19.1451C27.5222 19.442 19.5732 27.3379 19.2744 37.1447C19.2686 37.1449 19.2628 37.1451 19.257 37.1453C18.9536 27.1781 10.7477 19.1847 0.651129 19.1367Z"
      fill="#022f66"
    />
  </svg>
);

export const CircleDot = ({
  size = 20,
  color = "#f07c22",
  className = "",
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx={size / 2}
      cy={size / 2}
      r={size / 2}
      fill={color}
    />
  </svg>
);

export const BlueDotGrid = ({ className = "" }) => (
  <svg
    className={className}
    width="60"
    height="60"
    viewBox="0 0 93 75"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {[0, 17.5488, 35.0986, 52.6475, 70.1963].map((y) =>
      [2.03, 19.66, 37.3, 54.93, 72.56, 90.19].map((x) => (
        <rect
          key={`${x}-${y}`}
          width="3"
          height="3"
          transform={`matrix(0.676 0.737 -0.676 0.737 ${x} ${y})`}
          fill="#022f66"
        />
      ))
    )}
  </svg>
);