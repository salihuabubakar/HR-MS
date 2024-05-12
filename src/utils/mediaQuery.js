import { useMediaQuery } from "react-responsive";

/**
 * The function `isMobile` checks if the current device is a mobile device by using a media query with
 * a maximum width of 768 pixels.
 * @returns the result of the `useMediaQuery` hook with the `maxWidth` option set to 768.
 */
export const isMobile = () => {
  return useMediaQuery({ maxWidth: 768 });
}