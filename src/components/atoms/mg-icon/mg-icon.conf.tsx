import { h } from '@stencil/core';

/**
 * Icon SVG paths
 */
export const icons: Object = {
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
  'arrows-rotate': () => (
    <path
      fill="currentColor"
      d="M2.3,7h3.4c0.3,0,0.6-0.3,0.6-0.6c0-0.1-0.1-0.3-0.2-0.4L5.1,4.9c1.7-1.6,4.4-1.5,6,0.2c0,0,0,0,0,0  c0.5,0.5,0.8,1.2,1,1.9h2.1C13.7,3.5,10.4,1.2,7,1.8C5.7,2,4.6,2.6,3.6,3.4L2.7,2.5c-0.2-0.2-0.6-0.2-0.8,0c0,0,0,0,0,0l0,0  C1.8,2.6,1.7,2.8,1.7,2.9v3.4C1.7,6.7,1.9,7,2.3,7z M13.7,9h-3.4C9.9,9,9.7,9.3,9.7,9.6c0,0.2,0.1,0.3,0.2,0.4l1.1,1.1  c-1.7,1.6-4.4,1.5-6-0.2C4.4,10.4,4,9.7,3.8,9H1.7c0.6,3.5,3.9,5.8,7.3,5.2c1.3-0.2,2.4-0.8,3.3-1.7l0.9,0.9c0.2,0.2,0.6,0.2,0.8,0  c0,0,0,0,0,0l0,0c0.1-0.1,0.2-0.3,0.2-0.4V9.6C14.3,9.3,14.1,9,13.7,9z"
    />
  ),
  'calculator': () => (
    <path
      fill="currentColor"
      d="M12.83.67H3.17a.5.5 0 0 0-.5.5v13.66a.5.5 0 0 0 .5.5h9.66a.5.5 0 0 0 .5-.5V1.17a.5.5 0 0 0-.5-.5ZM5.58 13.39a.29.29 0 0 1-.28.3H4.1a.29.29 0 0 1-.3-.28v-1.2a.29.29 0 0 1 .28-.3h1.2a.29.29 0 0 1 .3.28v1.2Zm0-3.28a.29.29 0 0 1-.3.3H4.1a.29.29 0 0 1-.3-.3V8.93a.29.29 0 0 1 .28-.3h1.2a.29.29 0 0 1 .3.28v1.2Zm3.29 3.28a.29.29 0 0 1-.3.3H7.38a.29.29 0 0 1-.3-.3v-1.18a.29.29 0 0 1 .3-.3h1.19a.29.29 0 0 1 .3.3Zm0-3.28a.32.32 0 0 1-.3.3H7.38a.32.32 0 0 1-.3-.3V8.93a.29.29 0 0 1 .3-.3h1.19a.29.29 0 0 1 .3.3Zm3.33 3.28a.29.29 0 0 1-.28.3h-1.25a.29.29 0 0 1-.3-.28V8.93a.29.29 0 0 1 .28-.3h1.25a.29.29 0 0 1 .3.28v4.48Zm0-7.15a.29.29 0 0 1-.3.3H4.1a.29.29 0 0 1-.3-.3V2.61a.29.29 0 0 1 .28-.3h7.82a.29.29 0 0 1 .3.28v3.65Z"
    />
  ),
  'check-circle': () => (
    <path
      fill="currentColor"
      d="M15.33 8A7.33 7.33 0 1 1 8 .67 7.33 7.33 0 0 1 15.33 8Zm-8.18 3.88 5.44-5.44a.46.46 0 0 0 0-.65l-.67-.67a.48.48 0 0 0-.67 0L6.82 9.54 4.75 7.47a.46.46 0 0 0-.65 0l-.67.67a.46.46 0 0 0 0 .65l3.07 3.07a.46.46 0 0 0 .65 0Z"
    />
  ),
  'check': () => (
    <path
      fill="currentColor"
      d="M15.3,4.2L14.2,3c-0.1-0.1-0.3-0.1-0.4,0L6,10.4l-3.8-4C2.2,6.3,2.1,6.3,2,6.4L0.7,7.6c-0.1,0.1-0.1,0.2,0,0.3l5.1,5.4c0.1,0.1,0.2,0.1,0.3,0c0,0,0,0,0,0L7.4,12l0,0l7.9-7.4C15.4,4.5,15.4,4.3,15.3,4.2C15.3,4.2,15.3,4.2,15.3,4.2z"
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
  'exclamation-circle': () => (
    <path
      fill="currentColor"
      d="M8 15.33A7.33 7.33 0 1 0 .67 8 7.33 7.33 0 0 0 8 15.33ZM7 4a.29.29 0 0 1 .3-.3h1.35A.29.29 0 0 1 9 4v4.68a.29.29 0 0 1-.28.3H7.35a.29.29 0 0 1-.3-.28Zm0 6.78a.29.29 0 0 1 .3-.3h1.35a.29.29 0 0 1 .3.3H9V12a.29.29 0 0 1-.28.3H7.35a.29.29 0 0 1-.3-.28Z"
    />
  ),
  'exclamation-triangle': () => (
    <path
      fill="currentColor"
      d="m14.28 13.87-6-12a.32.32 0 0 0-.41-.15.36.36 0 0 0-.15.15l-6 12a.31.31 0 0 0 .14.42.33.33 0 0 0 .14 0h12a.3.3 0 0 0 .33-.28.31.31 0 0 0-.05-.14ZM7 6a.29.29 0 0 1 .28-.28h1.44A.28.28 0 0 1 9 6v4a.28.28 0 0 1-.28.29H7.28A.29.29 0 0 1 7 10Zm2 7a.31.31 0 0 1-.3.32H7.32A.32.32 0 0 1 7 13v-1.38a.31.31 0 0 1 .31-.31h1.4a.31.31 0 0 1 .31.31H9Z"
    />
  ),
  'floppy-disk': () => (
    <path
      fill="currentColor"
      d="m13.94 4.44-2.38-2.38a1.39 1.39 0 0 0-1-.39H3A1.35 1.35 0 0 0 1.67 3v10A1.35 1.35 0 0 0 3 14.33h10A1.35 1.35 0 0 0 14.33 13V5.4a1.39 1.39 0 0 0-.39-1ZM8 12.52a1.81 1.81 0 1 1 1.81-1.81A1.81 1.81 0 0 1 8 12.52Zm2.71-8.6v2.84a.34.34 0 0 1-.34.34H3.82a.34.34 0 0 1-.34-.34V3.82a.34.34 0 0 1 .34-.34h6.46a.35.35 0 0 1 .24.1l.1.1a.35.35 0 0 1 .1.24Z"
    />
  ),
  'info-circle': () => (
    <path
      fill="currentColor"
      d="M8 .67A7.33 7.33 0 1 0 15.33 8 7.33 7.33 0 0 0 8 .67ZM9 12a.29.29 0 0 1-.3.3H7.35a.29.29 0 0 1-.3-.3V7.32A.29.29 0 0 1 7.33 7h1.32a.29.29 0 0 1 .35.3Zm0-6.74a.29.29 0 0 1-.3.3H7.35a.29.29 0 0 1-.3-.3V4a.29.29 0 0 1 .28-.3h1.32a.29.29 0 0 1 .3.28V4Z"
    />
  ),
  'loader': () => [
    <path fill="currentColor" class="loader__full-circle" d="M8 2.67A5.33 5.33 0 1 1 2.67 8 5.33 5.33 0 0 1 8 2.67m0-2A7.33 7.33 0 1 0 15.33 8 7.33 7.33 0 0 0 8 .67Z" />,
    <path fill="currentColor" d="M8 2.67v-2A7.33 7.33 0 0 0 .67 8h2A5.33 5.33 0 0 1 8 2.67Z" />,
  ],
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
  'plus-circle': () => (
    <path
      fill="currentColor"
      d="M8,0.7C4,0.7,0.7,4,0.7,8S4,15.3,8,15.3S15.3,12,15.3,8l0,0C15.3,4,12,0.7,8,0.7  C8,0.7,8,0.7,8,0.7z M12.3,8.8c0,0.2-0.2,0.4-0.4,0.4H9.2v2.7c0,0.2-0.2,0.4-0.4,0.4H7.2c-0.2,0-0.4-0.2-0.3-0.4V9.2H4.1  C3.9,9.2,3.7,9,3.7,8.8V7.2c0-0.2,0.2-0.4,0.4-0.3h2.7V4.1c0-0.2,0.2-0.4,0.3-0.4h1.7c0.2,0,0.4,0.2,0.4,0.4v2.7h2.7  c0.2,0,0.4,0.2,0.4,0.3L12.3,8.8z"
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
