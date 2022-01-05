import * as React from "react";

const SvgUserIcon = (props) => (
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
      d="M292.667 0h80v80h-80z"
      transform="translate(-292.667)"
    />
    <path
      d="M357 36.941c0-5.53-4.49-10.02-10.02-10.02h-24.96c-5.53 0-10.02 4.49-10.02 10.02V56.98c0 5.53 4.49 10.02 10.02 10.02h24.96c5.53 0 10.02-4.49 10.02-10.02V36.941Z"
      style={{
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "6.67px",
      }}
      transform="translate(-294.5 7.079)"
    />
    <ellipse
      cx={334.5}
      cy={15.461}
      rx={11.5}
      ry={11.461}
      style={{
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "6.66px",
      }}
      transform="matrix(1 0 0 1.00342 -294.5 -.092)"
    />
  </svg>
);

export default SvgUserIcon;
