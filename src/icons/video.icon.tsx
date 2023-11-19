import React from 'react';

interface P {
  reverseColors?: boolean;
}

export const VideoIcon = ({ reverseColors }: P) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 455 455"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="227.5"
      cy="227.5"
      r="227.5"
      fill={reverseColors ? '#FFFFFF' : '#00ACEE'}
    />
    <path
      d="M328.731 227.065C329.065 227.258 329.065 227.739 328.731 227.931L177.257 315.385C176.924 315.577 176.507 315.337 176.507 314.952L176.507 140.044C176.507 139.66 176.924 139.419 177.257 139.611L328.731 227.065Z"
      fill={reverseColors ? '#00ACEE' : '#FFFFFF'}
    />
  </svg>
);
