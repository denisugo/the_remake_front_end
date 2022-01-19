const SvgHomeIcon = (props) => (
  <svg
    viewBox="0 0 80 80"
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeMiterlimit: 1.5,
    }}
    width="1em"
    height="1em"
    {...props}
  >
    <path
      style={{
        fill: "none",
      }}
      d="M0 0h80v80H0z"
    />
    <path
      d="M0 22.069 40 0l40 22.069V80H52.857l-.097-29.56H27.24L27.143 80H0V22.069Z"
      style={{
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "7.46px",
      }}
      transform="matrix(.89353 0 0 .89353 4.259 4.259)"
    />
  </svg>
);

export default SvgHomeIcon;
