import { useMediaQuery, useTheme } from "@mui/material";

export function useScreenSizes() {
  const theme = useTheme();

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return { isMediumScreen, isLargeScreen, isSmallScreen };
}
