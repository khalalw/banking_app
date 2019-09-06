import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import SyncIcon from "@material-ui/icons/Sync";
import SwapIcon from "@material-ui/icons/SwapHoriz";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  links: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none"
    }
  }
}));

export default function SideDrawer(props) {
  const drawerIcons = [<SwapIcon />, <SyncIcon />];
  const routes = ["/", "/transfer-activity"];
  const styles = useStyles();

  return (
    <Drawer
      className={props.classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.open}
      classes={{
        paper: props.classes.drawerPaper
      }}
    >
      <div className={props.classes.drawerHeader}>
        <IconButton onClick={props.handleDrawerClose}>
          {props.theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {["Transactions", "Transfer Activity"].map((text, index) => (
          <NavLink to={routes[index]} className={styles.links}>
            <ListItem button key={text} selected={false}>
              <ListItemIcon>{drawerIcons[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
}
