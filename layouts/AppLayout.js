import { useCallback, useState } from "react";
import { Box, Container } from "@material-ui/core";
import NavBar from "components/NavBar";
import SideMenu from "components/SideMenu";

const AppLayout = ({ children, contentBoxProps = {} }) => {
  const [showMobileSideMenu, setShowMobileSideMenu] = useState(false);
  const openMobileSideMenu = useCallback(() => setShowMobileSideMenu(true), []);
  const closeMobileSideMenu = useCallback(
    () => setShowMobileSideMenu(false),
    []
  );

  return (
    <Box display="flex" minHeight="100vh" flexDirection="column">
      <NavBar openMobileSideMenu={openMobileSideMenu} />
      <Box display="flex" flexGrow={1} {...contentBoxProps}>
        <SideMenu
          showMobileSideMenu={showMobileSideMenu}
          onCloseMobileSideMenu={closeMobileSideMenu}
        />
        <Container maxWidth={null} style={{ display: "flex" }}>
          <Box paddingY={3} display="flex" flexGrow={1} flexDirection="column">
            {children}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AppLayout;
