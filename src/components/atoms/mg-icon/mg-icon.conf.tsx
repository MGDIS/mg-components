import { h } from '@stencil/core';

/**
 * Icon SVG paths
 */
export const icons: unknown = {
  'arrow-down': () => (
    <path
      fill="currentColor"
      d="M13,10.1H10.23a.31.31,0,0,1-.32-.28h0V.94A.3.3,0,0,0,9.59.65H6.37A.32.32,0,0,0,6,.94H6V9.81a.29.29,0,0,1-.31.29H3a.3.3,0,0,0-.31.29.27.27,0,0,0,.08.22l5.06,4.58a.36.36,0,0,0,.46,0l5-4.58a.29.29,0,0,0,0-.42C13.22,10.1,13.12,10.1,13,10.1Z"
    />
  ),
  'arrow-left': () => (
    <path
      fill="currentColor"
      d="M5.88,12.93V10.18a.3.3,0,0,1,.28-.32H15a.31.31,0,0,0,.29-.33h0V6.32A.31.31,0,0,0,15,6H6.17a.32.32,0,0,1-.29-.31h0V2.93a.3.3,0,0,0-.28-.32.32.32,0,0,0-.23.09L.79,7.76a.36.36,0,0,0,0,.46l4.58,5a.31.31,0,0,0,.43,0A.4.4,0,0,0,5.88,12.93Z"
    />
  ),
  'arrow-right': () => (
    <path
      fill="currentColor"
      d="M10.16,3V5.75a.3.3,0,0,1-.28.32H1a.31.31,0,0,0-.29.33h0V9.61A.31.31,0,0,0,1,9.94H9.87a.29.29,0,0,1,.29.31h0V13a.3.3,0,0,0,.28.32.32.32,0,0,0,.23-.09l4.58-5.06a.36.36,0,0,0,0-.46l-4.58-5a.3.3,0,0,0-.42,0C10.16,2.76,10.16,2.87,10.16,3Z"
    />
  ),
  'arrow-up': () => (
    <path
      fill="currentColor"
      d="M3.06,5.82H5.81a.31.31,0,0,1,.32.28h0V15a.31.31,0,0,0,.33.29H9.67A.3.3,0,0,0,10,15h0V6.11a.3.3,0,0,1,.31-.29h2.75a.3.3,0,0,0,.23-.51L8.23.73a.36.36,0,0,0-.46,0l-5,4.58a.3.3,0,0,0,0,.43C2.82,5.83,2.92,5.82,3.06,5.82Z"
    />
  ),
  'arrow-up-right-square': () => (
    <path
      fill="currentColor"
      d="M14.33 3v10A1.34 1.34 0 0 1 13 14.33H3A1.34 1.34 0 0 1 1.67 13V3A1.34 1.34 0 0 1 3 1.67h10A1.34 1.34 0 0 1 14.33 3Zm-2.48.46H8.68a.67.67 0 0 0-.68.7.63.63 0 0 0 .2.47l.91.91-5.53 5.53a.33.33 0 0 0 0 .48l.87.87a.33.33 0 0 0 .48 0l5.53-5.52.91.9a.69.69 0 0 0 1 0 .71.71 0 0 0 .19-.48V4.15a.67.67 0 0 0-.67-.67Z"
    />
  ),
  'arrows-rotate': () => (
    <path
      fill="currentColor"
      d="M2.3,7h3.4c0.3,0,0.6-0.3,0.6-0.6c0-0.1-0.1-0.3-0.2-0.4L5.1,4.9c1.7-1.6,4.4-1.5,6,0.2c0,0,0,0,0,0  c0.5,0.5,0.8,1.2,1,1.9h2.1C13.7,3.5,10.4,1.2,7,1.8C5.7,2,4.6,2.6,3.6,3.4L2.7,2.5c-0.2-0.2-0.6-0.2-0.8,0c0,0,0,0,0,0l0,0  C1.8,2.6,1.7,2.8,1.7,2.9v3.4C1.7,6.7,1.9,7,2.3,7z M13.7,9h-3.4C9.9,9,9.7,9.3,9.7,9.6c0,0.2,0.1,0.3,0.2,0.4l1.1,1.1  c-1.7,1.6-4.4,1.5-6-0.2C4.4,10.4,4,9.7,3.8,9H1.7c0.6,3.5,3.9,5.8,7.3,5.2c1.3-0.2,2.4-0.8,3.3-1.7l0.9,0.9c0.2,0.2,0.6,0.2,0.8,0  c0,0,0,0,0,0l0,0c0.1-0.1,0.2-0.3,0.2-0.4V9.6C14.3,9.3,14.1,9,13.7,9z"
    />
  ),
  'ban': () => (
    <path
      fill="currentColor"
      d="M8 .67A7.33 7.33 0 1 0 15.33 8 7.33 7.33 0 0 0 8 .67Zm3.85 3.48a5.46 5.46 0 0 1 .61 7L4.88 3.54a5.46 5.46 0 0 1 6.97.61Zm-7.7 7.7a5.45 5.45 0 0 1-.61-7l7.58 7.58a5.46 5.46 0 0 1-7-.61Z"
    />
  ),
  'calculator': () => (
    <path
      fill="currentColor"
      d="M12.83.67H3.17a.5.5 0 0 0-.5.5v13.66a.5.5 0 0 0 .5.5h9.66a.5.5 0 0 0 .5-.5V1.17a.5.5 0 0 0-.5-.5ZM5.58 13.39a.29.29 0 0 1-.28.3H4.1a.29.29 0 0 1-.3-.28v-1.2a.29.29 0 0 1 .28-.3h1.2a.29.29 0 0 1 .3.28v1.2Zm0-3.28a.29.29 0 0 1-.3.3H4.1a.29.29 0 0 1-.3-.3V8.93a.29.29 0 0 1 .28-.3h1.2a.29.29 0 0 1 .3.28v1.2Zm3.29 3.28a.29.29 0 0 1-.3.3H7.38a.29.29 0 0 1-.3-.3v-1.18a.29.29 0 0 1 .3-.3h1.19a.29.29 0 0 1 .3.3Zm0-3.28a.32.32 0 0 1-.3.3H7.38a.32.32 0 0 1-.3-.3V8.93a.29.29 0 0 1 .3-.3h1.19a.29.29 0 0 1 .3.3Zm3.33 3.28a.29.29 0 0 1-.28.3h-1.25a.29.29 0 0 1-.3-.28V8.93a.29.29 0 0 1 .28-.3h1.25a.29.29 0 0 1 .3.28v4.48Zm0-7.15a.29.29 0 0 1-.3.3H4.1a.29.29 0 0 1-.3-.3V2.61a.29.29 0 0 1 .28-.3h7.82a.29.29 0 0 1 .3.28v3.65Z"
    />
  ),
  'check': () => (
    <path
      fill="currentColor"
      d="m15.27 4.23-1.11-1.18c-.11-.1-.27-.1-.38 0L6 10.36l-3.76-4a.187.187 0 0 0-.26 0L.71 7.6c-.07.07-.07.19 0 .26l5.12 5.41c.07.07.18.07.25 0l1.3-1.23 7.87-7.45c.1-.1.11-.26.01-.37h.01Z"
    />
  ),
  'check-circle': () => (
    <path
      fill="currentColor"
      d="M15.33 8A7.33 7.33 0 1 1 8 .67 7.33 7.33 0 0 1 15.33 8Zm-8.18 3.88 5.44-5.44a.46.46 0 0 0 0-.65l-.67-.67a.48.48 0 0 0-.67 0L6.82 9.54 4.75 7.47a.46.46 0 0 0-.65 0l-.67.67a.46.46 0 0 0 0 .65l3.07 3.07a.46.46 0 0 0 .65 0Z"
    />
  ),
  'chevron-down': () => (
    <path
      fill="currentColor"
      d="M7.43,12.21.9,5.69a.81.81,0,0,1,0-1.14h0l.76-.77a.81.81,0,0,1,1.14,0L8,9l5.2-5.18a.81.81,0,0,1,1.14,0l.76.77a.8.8,0,0,1,0,1.13h0L8.57,12.21a.79.79,0,0,1-1.13,0Z"
    />
  ),
  'chevron-left': () => (
    <path
      fill="currentColor"
      d="M3.79,7.43,10.31.9a.81.81,0,0,1,1.14,0h0l.77.76a.81.81,0,0,1,0,1.14L7,8l5.18,5.2a.81.81,0,0,1,0,1.14l-.77.76a.8.8,0,0,1-1.13,0h0L3.79,8.57a.79.79,0,0,1,0-1.13Z"
    />
  ),
  'chevron-right': () => (
    <path
      fill="currentColor"
      d="M12.21,8.57,5.69,15.1a.81.81,0,0,1-1.14,0h0l-.77-.76a.81.81,0,0,1,0-1.14L9,8,3.78,2.8a.81.81,0,0,1,0-1.14L4.55.9A.8.8,0,0,1,5.68.9h0l6.53,6.53a.79.79,0,0,1,0,1.13Z"
    />
  ),
  'chevron-up': () => (
    <path
      fill="currentColor"
      d="M8.57,3.79l6.53,6.52a.81.81,0,0,1,0,1.14h0l-.76.77a.81.81,0,0,1-1.14,0L8,7,2.8,12.22a.81.81,0,0,1-1.14,0L.9,11.45a.8.8,0,0,1,0-1.13h0L7.43,3.79a.79.79,0,0,1,1.13,0Z"
    />
  ),
  'clock': () => (
    <path
      fill="currentColor"
      d="M8,.67C3.95,.67,.67,3.95,.67,8s3.28,7.33,7.33,7.33,7.33-3.28,7.33-7.33h0C15.33,3.95,12.05,.67,8,.67h0Zm1.69,10.33l-2.61-1.88c-.09-.07-.14-.17-.14-.28V3.84c0-.19,.16-.35,.35-.36h1.42c.2,0,.35,.16,.36,.36V7.93l1.87,1.37c.16,.1,.2,.32,.09,.47v.02h-.01l-.83,1.15c-.12,.15-.34,.18-.5,.06Z"
    />
  ),
  'conversation': () => (
    <path
      fill="currentColor"
      d="M11.22,6.48c0-2.11-2.36-3.81-5.28-3.81S.67,4.37.67,6.48a3.15,3.15,0,0,0,1,2.19A5.17,5.17,0,0,1,.72,10a.2.2,0,0,0,0,.21.23.23,0,0,0,.19.12,4.79,4.79,0,0,0,2.25-.6,6.84,6.84,0,0,0,2.82.6C8.86,10.29,11.22,8.58,11.22,6.48Zm3.1,5.23a3.08,3.08,0,0,0,1-2.19C15.28,7.93,14,6.57,12,6a3.84,3.84,0,0,1,0,.48C12,9,9.3,11.05,6,11.05a7.16,7.16,0,0,1-.8-.05A5.6,5.6,0,0,0,10,13.33a6.7,6.7,0,0,0,2.82-.59,4.66,4.66,0,0,0,2.25.59.21.21,0,0,0,.19-.11.2.2,0,0,0,0-.21,5.15,5.15,0,0,1-.91-1.3Z"
    />
  ),
  'cross': () => (
    <path
      fill="currentColor"
      d="M14.26 12.74 9.52 8l4.7-4.7a.29.29 0 0 0 0-.41l-1.1-1.1a.29.29 0 0 0-.41 0L8 6.48 3.26 1.74a.24.24 0 0 0-.34 0L1.74 2.91a.24.24 0 0 0 0 .34L6.48 8l-4.7 4.7a.29.29 0 0 0 0 .41l1.1 1.1a.29.29 0 0 0 .41 0L8 9.52l4.74 4.74a.24.24 0 0 0 .34 0l1.17-1.17a.24.24 0 0 0 0-.34Z"
    />
  ),
  'cross-circle': () => (
    <path
      fill="currentColor"
      d="M8.06.67H8A7.33 7.33 0 0 0 .68 8v.1a7.42 7.42 0 0 0 7.23 7.23A7.33 7.33 0 1 0 8.06.67Zm3.6 9.57a.28.28 0 0 1 0 .4l-.19.2-.61.61-.2.19a.27.27 0 0 1-.39 0L8 9.41l-2.23 2.24a.27.27 0 0 1-.39 0l-.2-.2-.6-.6-.19-.2a.28.28 0 0 1 0-.4L6.6 8 4.36 5.76a.28.28 0 0 1 0-.4l1-1a.28.28 0 0 1 .4 0L8 6.59l2.24-2.24a.28.28 0 0 1 .4 0l.2.2.6.6.2.2a.28.28 0 0 1 0 .4L9.42 8Z"
    />
  ),
  'download': () => (
    <path
      fill="currentColor"
      d="M6.4 2v4.1c0 .2-.1.3-.3.3H4c-.2 0-.3.1-.3.3 0 .1 0 .2.1.2l4 4c.1.1.3.1.4 0l4-4c.1-.1.1-.3 0-.4-.1-.1-.1-.1-.2-.1H9.9c-.2 0-.3-.1-.3-.3V2c0-.2-.1-.3-.3-.3H6.7c-.1 0-.3.1-.3.3zm7.9 11v1c0 .2-.1.3-.3.3H2c-.2 0-.3-.1-.3-.3v-1c0-.2.1-.3.3-.3h12c.2 0 .3.1.3.3z"
    />
  ),
  'exclamation-circle': () => (
    <path
      fill="currentColor"
      d="M8 15.33c4.05 0 7.33-3.28 7.33-7.33S12.05.67 8 .67.67 3.95.67 8 3.95 15.33 8 15.33Zm.95-3.3c0 .15-.12.27-.28.27h-1.4c-.15 0-.28-.12-.28-.27v-1.31c0-.15.12-.28.28-.28h1.4c.15 0 .28.12.28.28v1.31ZM7 3.96c0-.14.11-.25.25-.25H8.7c.14 0 .25.11.25.25v4.8c0 .14-.11.25-.25.25H7.25c-.14 0-.25-.11-.25-.25V3.95Z"
    />
  ),
  'exclamation-triangle': () => (
    <path
      fill="currentColor"
      d="m14.28 13.87-6-12a.32.32 0 0 0-.41-.15.36.36 0 0 0-.15.15l-6 12a.31.31 0 0 0 .14.42.33.33 0 0 0 .14 0h12a.3.3 0 0 0 .33-.28.31.31 0 0 0-.05-.14ZM7 6a.29.29 0 0 1 .28-.28h1.44A.28.28 0 0 1 9 6v4a.28.28 0 0 1-.28.29H7.28A.29.29 0 0 1 7 10Zm2 7a.31.31 0 0 1-.3.32H7.32A.32.32 0 0 1 7 13v-1.38a.31.31 0 0 1 .31-.31h1.4a.31.31 0 0 1 .31.31H9Z"
    />
  ),
  'file-cog': () => (
    <path
      fill="currentColor"
      d="M9,10.1C9,10.6,8.5,11,8,11l0,0c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1C8.6,9,9,9.4,9,10.1C9,10,9,10,9,10.1z   M13.2,3.7l-2.8-2.8c-0.1-0.1-0.3-0.2-0.5-0.2H9.8v3.7h3.5V4.2C13.3,4,13.2,3.8,13.2,3.7L13.2,3.7z M9.6,5.3h3.8v9.4  c0,0.4-0.3,0.6-0.7,0.7H3.3c-0.4,0-0.7-0.3-0.7-0.7c0,0,0,0,0,0V1.3C2.7,1,3,0.7,3.3,0.7h5.5v3.9l0,0C8.9,4.9,9.2,5.2,9.6,5.3  C9.5,5.2,9.5,5.2,9.6,5.3z M10,8L9.5,8.3C9.3,8.1,9,8,8.8,7.9V7.3c0-0.1,0-0.1-0.1-0.1c-0.4-0.1-0.9-0.1-1.3,0  c-0.1,0-0.1,0.1-0.1,0.1v0.6C7,8,6.7,8.1,6.5,8.3L6,8C5.9,8,5.9,8,5.8,8C5.5,8.3,5.3,8.7,5.2,9.1c0,0.1,0,0.1,0.1,0.2l0.5,0.3  c-0.1,0.3-0.1,0.6,0,0.8l-0.5,0.3c-0.1,0-0.1,0.1-0.1,0.2c0.1,0.4,0.4,0.8,0.7,1.1c0.1,0,0.1,0,0.2,0l0.5-0.3  C6.7,11.9,7,12,7.2,12.1v0.6c0,0.1,0,0.1,0.1,0.1c0.4,0.1,0.9,0.1,1.3,0c0.1,0,0.1-0.1,0.1-0.1v-0.5C9,12.1,9.3,12,9.5,11.8l0.5,0.3  c0.1,0,0.1,0,0.2,0c0.3-0.3,0.5-0.7,0.6-1.1c0-0.1,0-0.1-0.1-0.2l0,0l-0.5-0.3c0-0.3,0-0.6,0-0.8l0.5-0.3c0.1,0,0.1-0.1,0.1-0.2  c-0.1-0.4-0.4-0.8-0.6-1.1C10.1,8,10.1,8,10,8z"
    />
  ),
  'file-text': () => (
    <path
      fill="currentColor"
      d="M8.89 4.56V.67H3.35c-.36 0-.66.3-.66.66v13.32c0 .37.29.67.66.68h9.3c.36 0 .66-.3.66-.66V5.25H9.55c-.37 0-.67-.31-.66-.68Zm1.77 6.75c0 .19-.15.34-.34.35H5.68c-.19 0-.34-.16-.34-.35v-.23c0-.19.15-.34.34-.34h4.64c.19 0 .34.15.34.34v.23Zm0-1.83c0 .19-.15.34-.34.34H5.68c-.19 0-.34-.15-.34-.34v-.23c0-.19.15-.34.34-.34h4.64c.19 0 .34.15.34.34v.23Zm0-2.06v.23c0 .19-.15.34-.34.34H5.68c-.19 0-.34-.15-.34-.34v-.23c0-.19.15-.34.34-.35h4.64c.19 0 .34.16.34.35Zm2.65-3.27v.17H9.77V.67h.17c.18 0 .35.07.47.2l2.71 2.8c.13.13.19.31.19.49Z"
    />
  ),
  'file-text-outline': () => (
    <path
      fill="currentColor"
      d="M10.31 10.74H5.69c-.2 0-.36.16-.36.35v.22c0 .19.16.35.36.35h4.62c.2 0 .36-.16.36-.35v-.22c0-.19-.16-.35-.36-.35Zm0-1.84H5.69c-.2 0-.36.16-.36.36v.21c0 .2.16.35.36.35h4.62c.2 0 .36-.15.36-.35v-.21c0-.2-.16-.36-.36-.36Zm0-1.83H5.69c-.2 0-.36.16-.36.35v.22c0 .19.16.35.36.35h4.62c.2 0 .36-.16.36-.35v-.22c0-.19-.16-.35-.36-.35Zm0 3.67H5.69c-.2 0-.36.16-.36.35v.22c0 .19.16.35.36.35h4.62c.2 0 .36-.16.36-.35v-.22c0-.19-.16-.35-.36-.35Zm0-1.84H5.69c-.2 0-.36.16-.36.36v.21c0 .2.16.35.36.35h4.62c.2 0 .36-.15.36-.35v-.21c0-.2-.16-.36-.36-.36Zm0-1.83H5.69c-.2 0-.36.16-.36.35v.22c0 .19.16.35.36.35h4.62c.2 0 .36-.16.36-.35v-.22c0-.19-.16-.35-.36-.35Zm2.76-2.64L9.69.92A.8.8 0 0 0 9.1.67H3.35c-.36 0-.66.3-.66.66v13.32c0 .37.29.67.66.68h9.3c.36 0 .66-.3.66-.66V5.05c0-.23-.07-.45-.24-.62Zm-.76 9.9H3.69V1.67h5.2v2.75c0 .46.37.83.83.83h2.59v9.08Z"
    />
  ),
  'file-upload': () => [
    <path fill="currentColor" d="M13.1 3.7 10.4.9c-.1-.1-.3-.2-.5-.2h-.1v3.7h3.5v-.2c0-.2-.1-.4-.2-.5z" />,
    <path
      fill="currentColor"
      d="M13.3 14.6V5.3H9.6c-.4 0-.7-.3-.7-.7V.7H3.3c-.3 0-.6.3-.6.6v13.3c0 .4.3.7.7.7h9.3c.3 0 .6-.3.6-.7zm-3-4.6H8.9c-.1 0-.2.1-.2.2v2.6c0 .1-.1.2-.2.2H6.9c-.1 0-.2-.1-.2-.2v-2.6c0-.1-.1-.2-.2-.2H5.1C5 9.9 5 9.8 5 9.7l2.5-2.6c.1-.1.2-.1.3 0l2.5 2.5.1.1c.1.2 0 .3-.1.3z"
    />,
  ],
  'floppy-disk': () => (
    <path
      fill="currentColor"
      d="m13.93 4.44-2.37-2.37c-.25-.25-.6-.4-.96-.4H3.03c-.75 0-1.36.61-1.36 1.36v9.94c0 .75.61 1.36 1.36 1.36h9.94c.75 0 1.36-.61 1.36-1.36V5.4c0-.36-.14-.7-.4-.96ZM8 12.52A1.81 1.81 0 1 1 8 8.9a1.81 1.81 0 0 1 0 3.62Zm2.71-5.77c0 .09-.04.18-.1.24a.35.35 0 0 1-.24.1H3.82c-.19 0-.34-.15-.34-.34V3.82c0-.19.15-.34.34-.34h6.55c.19 0 .34.15.34.34v2.93Z"
    />
  ),
  'history': () => [
    <path
      fill="currentColor"
      d="M8,1.67A6.37,6.37,0,0,0,3.6,3.42l-.91-.91a.6.6,0,0,0-.85,0h0a.58.58,0,0,0-.18.43V6.37A.61.61,0,0,0,2.24,7H5.68a.62.62,0,0,0,.62-.62A.69.69,0,0,0,6.12,6L5.05,4.87a4.29,4.29,0,1,1,.1,6.36.3.3,0,0,0-.41,0l-1,1a.3.3,0,0,0,0,.42h0A6.33,6.33,0,1,0,8,1.67Z"
    />,
    <path fill="currentColor" d="M9.85,9.3l-.36.36a.3.3,0,0,1-.43,0L7.45,8V5.15a.3.3,0,0,1,.3-.3h.5a.3.3,0,0,1,.3.3V7.58l1.3,1.3A.31.31,0,0,1,9.85,9.3Z" />,
  ],
  'info-circle': () => (
    <path
      fill="currentColor"
      d="M8 .67A7.33 7.33 0 1 0 15.33 8 7.33 7.33 0 0 0 8 .67ZM9 12a.29.29 0 0 1-.3.3H7.35a.29.29 0 0 1-.3-.3V7.32A.29.29 0 0 1 7.33 7h1.32a.29.29 0 0 1 .35.3Zm0-6.74a.29.29 0 0 1-.3.3H7.35a.29.29 0 0 1-.3-.3V4a.29.29 0 0 1 .28-.3h1.32a.29.29 0 0 1 .3.28V4Z"
    />
  ),
  'lines-rectangle': () => (
    <path
      fill="currentColor"
      d="M12.32.67H3.68c-.56 0-1.01.45-1.01 1.01v12.64c0 .56.45 1.01 1.01 1.01h8.64c.56 0 1.01-.45 1.01-1.01V1.68c0-.56-.45-1.01-1.01-1.01ZM9 11.25H4.67v-2H9v2Zm2.33-4.49H4.67v-2h6.67v2Z"
    />
  ),
  'list': () => (
    <path
      fill="currentColor"
      d="M1.9 2.68c-.67 0-1.22.56-1.21 1.23 0 .67.56 1.22 1.23 1.21.67 0 1.22-.56 1.21-1.23 0-.32-.13-.63-.36-.86-.23-.23-.54-.36-.87-.35Zm0 4.09a1.23 1.23 0 1 0 0 2.46 1.23 1.23 0 1 0 0-2.46Zm0 4.09a1.23 1.23 0 1 0 0 2.46 1.23 1.23 0 1 0 0-2.46Zm13 .41H5.18c-.23 0-.41.18-.41.41v.82c0 .23.18.41.41.41h9.75c.23 0 .41-.18.41-.41v-.82c0-.23-.18-.41-.41-.41h-.03Zm0-8.18H5.18c-.23 0-.41.18-.41.41v.81c0 .23.18.41.41.41h9.75c.23 0 .41-.18.41-.41V3.5c0-.23-.18-.41-.41-.41h-.03Zm0 4.09H5.18c-.23 0-.41.18-.41.41v.82c0 .23.18.41.41.41h9.75c.23 0 .41-.18.41-.41v-.82c0-.23-.18-.41-.41-.41h-.03Z"
    />
  ),
  'loader': () => [
    <path fill="currentColor" class="loader__full-circle" d="M8 2.67A5.33 5.33 0 1 1 2.67 8 5.33 5.33 0 0 1 8 2.67m0-2A7.33 7.33 0 1 0 15.33 8 7.33 7.33 0 0 0 8 .67Z" />,
    <path fill="currentColor" d="M8 2.67v-2A7.33 7.33 0 0 0 .67 8h2A5.33 5.33 0 0 1 8 2.67Z" />,
  ],
  'lock': () => (
    <path
      fill="currentColor"
      d="M12 5.56h-.67v-1.4C11.37 2.28 9.88.71 8 .67 6.12.71 4.63 2.28 4.67 4.16v1.4H4c-.75.02-1.35.64-1.33 1.39V14c.02.73.6 1.31 1.33 1.33h8c.75-.02 1.35-.64 1.33-1.39V7a1.37 1.37 0 0 0-1.28-1.44H12Zm-4 6.28c-.77.04-1.43-.56-1.47-1.33-.04-.77.56-1.43 1.33-1.47.77-.04 1.43.56 1.47 1.33v.07c.02.75-.57 1.38-1.32 1.4H8Zm2.07-6.28H5.93v-1.4A2.12 2.12 0 0 1 8 2c1.17.03 2.1 1 2.07 2.17v1.39Z"
    />
  ),
  'log-in': () => (
    <path
      fill="currentColor"
      d="M10.97,7.78h0L6.97,3.78c-.12-.12-.31-.12-.42,0h0c-.07,.06-.12,.15-.13,.24v2.07c0,.17-.13,.3-.3,.32H1.97c-.16,0-.29,.12-.3,.28h0v2.58c0,.16,.12,.29,.28,.3H6.11c.17,0,.3,.14,.3,.31v2.14c0,.16,.12,.29,.28,.3h0c.11,.01,.21-.03,.28-.11l4-4c.11-.12,.11-.3,0-.42Zm3.37,5.26h0v1c0,.16-.13,.28-.28,.28h-4.77c-.16,0-.28-.13-.28-.28v-1c0-.16,.13-.28,.28-.28h3.43V3.3h-3.42c-.16,0-.29-.13-.29-.29V1.97c0-.16,.13-.29,.29-.29h4.76c.16,0,.29,.13,.29,.29v.68h0V13.04Z"
    />
  ),
  'log-out': () => [
    <path
      fill="currentColor"
      d="M14.25,7.77h0l-4-4a.31.31,0,0,0-.43,0A.34.34,0,0,0,9.7,4V6.07a.32.32,0,0,1-.3.32H5.23a.3.3,0,0,0-.3.3V9.25a.3.3,0,0,0,.3.3H9.4a.31.31,0,0,1,.3.31V12a.3.3,0,0,0,.3.3.33.33,0,0,0,.23-.09l4-4A.29.29,0,0,0,14.25,7.77Z"
    />,
    <path
      fill="currentColor"
      d="M6.71,12.72H3.27V3.26H6.69A.31.31,0,0,0,7,3V2a.3.3,0,0,0-.31-.3H2A.29.29,0,0,0,1.67,2h0V3h0V14a.27.27,0,0,0,.1.24h0a.32.32,0,0,0,.14.08H6.71A.3.3,0,0,0,7,14V13A.3.3,0,0,0,6.71,12.72Z"
    />,
  ],
  'magnifying-glass': () => (
    <path
      fill="currentColor"
      d="M11.24 9.5c1.48-2.44.71-5.62-1.73-7.1-.05-.03-.11-.07-.17-.1A5.232 5.232 0 0 0 2.52 4C.94 6.38 1.6 9.59 3.98 11.17a5.142 5.142 0 0 0 5.54.1L12.3 14c.39.39 1.02.39 1.41 0l.33-.33a.996.996 0 0 0 0-1.41l-2.8-2.76Zm-4.4.5c-1.76.02-3.2-1.4-3.22-3.16-.02-1.76 1.4-3.2 3.16-3.22 1.76-.02 3.2 1.4 3.22 3.16v.06A3.193 3.193 0 0 1 6.84 10Z"
    />
  ),
  'paper-plane': () => (
    <path
      fill="currentColor"
      d="M14 1.69 1.84 7a.28.28 0 0 0-.15.36.29.29 0 0 0 .16.15l3.27 1.82a.57.57 0 0 0 .61-.06l6.45-5.57c.05 0 .15-.1.19-.06s0 .14-.06.18l-5.59 6.29a.52.52 0 0 0 0 .63l2.09 3.44a.28.28 0 0 0 .37.12.3.3 0 0 0 .13-.12l5-12.11a.3.3 0 0 0-.14-.37.28.28 0 0 0-.17-.01Z"
    />
  ),
  'paper-plane-slash': () => (
    <path
      fill="currentColor"
      d="M2.67,1.69,14.26,13.28l-1,1-2.79-2.8-1.1,2.67a.3.3,0,0,1-.13.12.28.28,0,0,1-.37-.12L6.75,10.74a.52.52,0,0,1,0-.63L7.82,8.9l-.76-.76L5.76,9.27a.57.57,0,0,1-.61.06L1.88,7.51a.29.29,0,0,1-.16-.15A.28.28,0,0,1,1.87,7L4.68,5.76l-3-3Zm11.53,0a.28.28,0,0,0-.22,0L7.53,4.51,9.26,6.24l3-2.54s.15-.1.19-.06,0,.14-.06.18L9.75,6.73l1.88,1.88,2.71-6.54A.3.3,0,0,0,14.2,1.7Z"
    />
  ),
  'pen': () => (
    <path
      fill="currentColor"
      d="M1.67,11.69v2.64h2.64l7.78-7.78-2.64-2.64L1.67,11.69ZM14.13,4.51c.27-.28,.27-.72,0-1h0l-1.65-1.64c-.28-.27-.72-.27-1,0h0l-1.28,1.29,2.64,2.64,1.29-1.29Z"
    />
  ),
  'pen-fancy': () => (
    <path
      fill="currentColor"
      d="M3.63,8.65c-.24,.07-.43,.26-.5,.5l-1.46,4.37,.11,.12,2.3-2.3c0-.06,0-.13,0-.19,0-.44,.35-.8,.79-.81,.44,0,.8,.35,.81,.79,0,.44-.35,.8-.79,.81,0,0-.01,0-.02,0h-.19l-2.3,2.3,.12,.11,4.37-1.46c.24-.07,.43-.26,.5-.5l.82-2.08-2.49-2.48-2.07,.82ZM10.8,2.35L6.27,7.28l2.42,2.42,4.94-4.52c2.1-1.86-.99-4.92-2.83-2.83Z"
    />
  ),
  'plus-circle': () => (
    <path
      fill="currentColor"
      d="M8,0.7C4,0.7,0.7,4,0.7,8S4,15.3,8,15.3S15.3,12,15.3,8l0,0C15.3,4,12,0.7,8,0.7  C8,0.7,8,0.7,8,0.7z M12.3,8.8c0,0.2-0.2,0.4-0.4,0.4H9.2v2.7c0,0.2-0.2,0.4-0.4,0.4H7.2c-0.2,0-0.4-0.2-0.3-0.4V9.2H4.1  C3.9,9.2,3.7,9,3.7,8.8V7.2c0-0.2,0.2-0.4,0.4-0.3h2.7V4.1c0-0.2,0.2-0.4,0.3-0.4h1.7c0.2,0,0.4,0.2,0.4,0.4v2.7h2.7  c0.2,0,0.4,0.2,0.4,0.3L12.3,8.8z"
    />
  ),
  'share': () => (
    <path
      fill="currentColor"
      d="M13.43,10.67a2,2,0,0,0-2.42.18L5.64,8.28a2.11,2.11,0,0,0,0-.56L11,5.15a2,2,0,0,0,2.42.18,2,2,0,1,0-3.08-1.57L4.83,6.4l-.11-.09a2,2,0,1,0,.12,3.3l5.51,2.63a2,2,0,1,0,3.08-1.57Z"
    />
  ),
  'trash': () => [
    <path
      fill="currentColor"
      d="M3.27 14.17c0 .66.54 1.19 1.2 1.2h7l-.05-.02h.08c.64-.02 1.14-.56 1.12-1.2V4.32H3.27v9.85Zm5.97-7.12c0-.33.27-.6.6-.6s.6.27.6.6v5.3c0 .33-.27.6-.6.6s-.6-.27-.6-.6v-5.3Zm-3.5 0c0-.33.27-.59.6-.6.32.02.58.28.6.6v5.3c-.02.32-.28.58-.6.6a.645.645 0 0 1-.6-.6v-5.3Zm7.28-5.39h-2.6V.95a.28.28 0 0 0-.28-.28H5.87a.28.28 0 0 0-.28.28v.72H2.91a.28.28 0 0 0-.28.28V3.1c0 .15.12.28.28.28h10.11c.15 0 .28-.12.28-.28V1.94a.28.28 0 0 0-.28-.28Z"
    />,
    <path
      fill="currentColor"
      d="M13,2h-2.9L9.9,1.6    C9.8,1.4,9.6,1.2,9.4,1.2H6.6c-0.2,0-0.4,0.1-0.5,0.3L5.8,2H2.9C2.7,2,2.5,2.2,2.5,2.4c0,0,0,0,0,0v0.8c0,0.2,0.2,0.4,0.4,0.4H13    c0.2,0,0.4-0.2,0.4-0.4V2.4C13.4,2.2,13.2,2,13,2z"
    />,
  ],
  'unlock': () => (
    <path
      fill="currentColor"
      d="M13.33 13.94V7a1.37 1.37 0 0 0-1.28-1.44h-.72v-1.4A3.422 3.422 0 0 0 8 .67 3.4 3.4 0 0 0 4.68 4h1.26C6 2.9 6.9 2.03 8 2c1.17.03 2.1 1 2.07 2.17v1.39H4c-.75.02-1.35.64-1.33 1.39V14c.02.73.6 1.31 1.33 1.33h8c.75-.02 1.35-.64 1.33-1.39ZM8 11.84c-.77.04-1.43-.56-1.47-1.33-.04-.77.56-1.43 1.33-1.47.77-.04 1.43.56 1.47 1.33v.07c.02.75-.57 1.38-1.32 1.4H8Z"
    />
  ),
  'user': () => (
    <path
      fill="currentColor"
      d="M8 8.79a3.56 3.56 0 1 0-3.56-3.56A3.56 3.56 0 0 0 8 8.79Zm3.17.79H9.8a4.27 4.27 0 0 1-3.6 0H4.83a3.16 3.16 0 0 0-3.16 3.17v.4a1.18 1.18 0 0 0 1.18 1.18h10.3a1.18 1.18 0 0 0 1.18-1.18v-.4a3.16 3.16 0 0 0-3.16-3.17Z"
    />
  ),
  'user-plus': () => (
    <path
      fill="currentColor"
      d="M14,3.33H12.65V2a.36.36,0,0,0-.35-.33h-.65A.36.36,0,0,0,11.3,2V3.33H10a.34.34,0,0,0-.33.34v.66a.34.34,0,0,0,.33.34H11.3V6a.37.37,0,0,0,.35.33h.65A.37.37,0,0,0,12.65,6V4.67H14a.34.34,0,0,0,.32-.34V3.67A.34.34,0,0,0,14,3.33ZM9.28,9.77h-.2a5.19,5.19,0,0,1-3.91,0H5A3,3,0,0,0,1.7,12.46h0v.72A1.27,1.27,0,0,0,3,14.33h8.25a1.26,1.26,0,0,0,1.36-1.14v-.68A3,3,0,0,0,9.37,9.76H9.28ZM7.13,3.7A2.64,2.64,0,1,1,4.5,6.34h0A2.64,2.64,0,0,1,7.13,3.7Z"
    />
  ),
  'users': () => (
    <path
      fill="currentColor"
      d="M12,8.76h-.2a5.24,5.24,0,0,1-3.93,0H7.61a3.05,3.05,0,0,0-3.3,2.75v.69a1.28,1.28,0,0,0,1.38,1.14H14a1.27,1.27,0,0,0,1.37-1.14v-.69A3.07,3.07,0,0,0,12,8.75Zm-6.4-.32A2,2,0,0,0,4.31,8H2.48A1.69,1.69,0,0,0,.65,9.53v.76a.85.85,0,0,0,.91.76H3.45A3.58,3.58,0,0,1,5.61,8.44ZM9.81,2.66A2.65,2.65,0,1,1,7.16,5.31h0A2.65,2.65,0,0,1,9.81,2.66ZM3.31,4.18A1.51,1.51,0,1,1,1.8,5.69,1.51,1.51,0,0,1,3.31,4.18Z"
    />
  ),
};

/**
 * List of all possibles sizes
 */
export const sizes: string[] = ['regular', 'large', 'extra-large'];

/**
 * List of all possibles variants
 */
export const variants: string[] = ['success', 'warning', 'danger', 'info'];
