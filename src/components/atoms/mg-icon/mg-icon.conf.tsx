import { h } from "@stencil/core";

/**
 * Icon SVG paths
 */
export const icons:Object = {
  success: () => <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>,
  info: () => <path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>,
  danger: () => <path fill="currentColor" d="M256,0C114.62,0,0,114.62,0,256S114.62,512,256,512,512,397.38,512,256,397.36.05,256,0Zm25.6,384H230.4V332.8h51.2Zm0-102.4H230.4V128h51.2Z"/>,
  warning: () => <path fill="currentColor" d="M0,484H512L256,8.51Zm283.46-72.92H228.62V356h54.84Zm0-91.14H228.62V209.63h54.84Z"/>,
  cross: () => <path fill="currentColor" d="M512,51.58,460.42,0,256,204.42,51.58,0,0,51.58,204.42,256,0,460.42,51.58,512,256,307.58,460.42,512,512,460.42,307.58,256Z"/>,
  loader: () => [
    <path fill="currentColor" class="loader__full-circle" d="M256,85.44A170.56,170.56,0,1,1,85.44,256h0A170.56,170.56,0,0,1,256,85.44m0-64c-129.54,0-234.56,105-234.56,234.56S126.46,490.56,256,490.56,490.56,385.54,490.56,256,385.54,21.44,256,21.44Z"/>,
    <path fill="currentColor" d="M256,85.44v-64c-129.54,0-234.56,105-234.56,234.56h64A170.56,170.56,0,0,1,256,85.44Z" />
  ]
}

/**
 * List of all possibles sizes
 */
 export const sizes:string[] = ["small", "regular", "large"];
