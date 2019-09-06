import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";

export default function NavBar(props) {
  return (
    <div className={props.classes.root}>
      <AppBar
        position="fixed"
        className={clsx(props.classes.appBar, {
          [props.classes.appBarShift]: props.open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
            className={clsx(
              props.classes.menuButton,
              props.open && props.classes.hide
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Central Bank, USA
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
