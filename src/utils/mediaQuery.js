import { useMediaQuery } from "react-responsive";

export const isMobile = () => {
  return useMediaQuery({ maxWidth: 768 });
}