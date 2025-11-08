import { useMediaQuery as useResponsive } from 'react-responsive';

export const useMediaQuery = () => {
  const isMobile = useResponsive({ maxWidth: 639 });
  const isTablet = useResponsive({ minWidth: 640, maxWidth: 1023 });
  const isDesktop = useResponsive({ minWidth: 1024 });
  const isSmallMobile = useResponsive({ maxWidth: 374 });

  return {
    isMobile,
    isTablet,
    isDesktop,
    isSmallMobile,
    isMobileOrTablet: isMobile || isTablet,
  };
};
