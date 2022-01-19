import { h } from "@stencil/core";

/**
 * Icon SVG paths
 */
export const icons:Object = {
  'check-circle': () => <path fill="currentColor" d="M15.33 8A7.33 7.33 0 1 1 8 .67 7.33 7.33 0 0 1 15.33 8Zm-8.18 3.88 5.44-5.44a.46.46 0 0 0 0-.65l-.67-.67a.48.48 0 0 0-.67 0L6.82 9.54 4.75 7.47a.46.46 0 0 0-.65 0l-.67.67a.46.46 0 0 0 0 .65l3.07 3.07a.46.46 0 0 0 .65 0Z"/>,
  cross: () => <path fill="currentColor" d="M14.26 12.74 9.52 8l4.7-4.7a.29.29 0 0 0 0-.41l-1.1-1.1a.29.29 0 0 0-.41 0L8 6.48 3.26 1.74a.24.24 0 0 0-.34 0L1.74 2.91a.24.24 0 0 0 0 .34L6.48 8l-4.7 4.7a.29.29 0 0 0 0 .41l1.1 1.1a.29.29 0 0 0 .41 0L8 9.52l4.74 4.74a.24.24 0 0 0 .34 0l1.17-1.17a.24.24 0 0 0 0-.34Z"/>,
  'exclamation-circle': () => <path fill="currentColor" d="M8 15.33A7.33 7.33 0 1 0 .67 8 7.33 7.33 0 0 0 8 15.33ZM7 4a.29.29 0 0 1 .3-.3h1.35A.29.29 0 0 1 9 4v4.68a.29.29 0 0 1-.28.3H7.35a.29.29 0 0 1-.3-.28Zm0 6.78a.29.29 0 0 1 .3-.3h1.35a.29.29 0 0 1 .3.3H9V12a.29.29 0 0 1-.28.3H7.35a.29.29 0 0 1-.3-.28Z"/>,
  'exclamation-triangle': () => <path fill="currentColor" d="m14.28 13.87-6-12a.32.32 0 0 0-.41-.15.36.36 0 0 0-.15.15l-6 12a.31.31 0 0 0 .14.42.33.33 0 0 0 .14 0h12a.3.3 0 0 0 .33-.28.31.31 0 0 0-.05-.14ZM7 6a.29.29 0 0 1 .28-.28h1.44A.28.28 0 0 1 9 6v4a.28.28 0 0 1-.28.29H7.28A.29.29 0 0 1 7 10Zm2 7a.31.31 0 0 1-.3.32H7.32A.32.32 0 0 1 7 13v-1.38a.31.31 0 0 1 .31-.31h1.4a.31.31 0 0 1 .31.31H9Z"/>,
  'info-circle': () => <path fill="currentColor" d="M8 .67A7.33 7.33 0 1 0 15.33 8 7.33 7.33 0 0 0 8 .67ZM9 12a.29.29 0 0 1-.3.3H7.35a.29.29 0 0 1-.3-.3V7.32A.29.29 0 0 1 7.33 7h1.32a.29.29 0 0 1 .35.3Zm0-6.74a.29.29 0 0 1-.3.3H7.35a.29.29 0 0 1-.3-.3V4a.29.29 0 0 1 .28-.3h1.32a.29.29 0 0 1 .3.28V4Z"/>,
  loader: () => [
    <path fill="currentColor" class="loader__full-circle" d="M8 2.67A5.33 5.33 0 1 1 2.67 8 5.33 5.33 0 0 1 8 2.67m0-2A7.33 7.33 0 1 0 15.33 8 7.33 7.33 0 0 0 8 .67Z"/>,
    <path fill="currentColor" d="M8 2.67v-2A7.33 7.33 0 0 0 .67 8h2A5.33 5.33 0 0 1 8 2.67Z"/>
  ]
}

/**
 * List of all possibles sizes
 */
 export const sizes:string[] = ["regular", "large", "extra-large"];

 /**
 * List of all possibles variants
 */
  export const variants:string[] = ["success" , "warning", "danger", "info"];
