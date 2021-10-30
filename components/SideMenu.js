import Link from "next/link";
import {
  Box,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  Calendar,
  CheckboxMarkedCircleOutline,
  TextBoxSearch,
} from "mdi-material-ui";
import styled from "styled-components";

const StyledDrawer = styled(Drawer).attrs(({ width, PaperProps }) => ({
  style: {
    width: width,
  },
  PaperProps: {
    ...PaperProps,
    ...{
      style: {
        width: width,
      },
    },
  },
}))`
  && {
    ${(props) => (props.open ? null : "width: 0px !important;")}
    transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  }
  &,
  & > div {
    top: 88px;
    bottom: 0px;
    height: auto;
    overflow-y: hidden;
    /* Display below the navbar */
    z-index: 1000;
    overflow-wrap: break-word;
  }
`;

const LeftDrawerBox = styled(Box).attrs({
  id: "desktop-drawer",
})`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
`;

const DrawerContent = () => (
  <List>
    <Link href="/" passHref>
      <ListItem button component="a">
        <ListItemIcon>
          <Calendar />
        </ListItemIcon>
        <ListItemText primary="Events" />
      </ListItem>
    </Link>
    <Link href="/review" passHref>
      <ListItem button component="a">
        <ListItemIcon>
          <CheckboxMarkedCircleOutline />
        </ListItemIcon>
        <ListItemText primary="Review" />
      </ListItem>
    </Link>
    <Link href="/logs" passHref>
      <ListItem button component="a">
        <ListItemIcon>
          <TextBoxSearch />
        </ListItemIcon>
        <ListItemText primary="Logs" />
      </ListItem>
    </Link>
  </List>
);

const SideMenu = ({ showMobileSideMenu, onCloseMobileSideMenu }) => (
  <>
    <Hidden implementation="css" smDown>
      <Hidden smDown initialWidth="lg">
        <StyledDrawer
          open
          variant="persistent"
          anchor="left"
          width={300}
          PaperProps={{
            elevation: 2,
          }}
        >
          <LeftDrawerBox>
            <DrawerContent />
          </LeftDrawerBox>
        </StyledDrawer>
      </Hidden>
    </Hidden>
    <Hidden mdUp>
      <Drawer
        open={showMobileSideMenu}
        onClose={onCloseMobileSideMenu}
        variant="temporary"
        anchor="left"
        PaperProps={{ style: { minWidth: 200, maxWidth: "80%" } }}
      >
        <DrawerContent />
      </Drawer>
    </Hidden>
  </>
);

export default SideMenu;
