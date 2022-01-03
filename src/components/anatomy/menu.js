import React, {useEffect, useState} from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";


const UserMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null)

    let navigate = useNavigate();
    useEffect(() => {

    }, [])

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const urlHandler = (e) => {
        navigate(`/${e.target.getAttribute('name')}`)
        handleClose();
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Dashboard
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem name="profile" onClick={urlHandler}>Profile</MenuItem>
          <MenuItem name="decks" onClick={urlHandler}>Decks</MenuItem>
          <MenuItem name="rivals" onClick={urlHandler}>Rivals</MenuItem>
          <MenuItem name="logout" onClick={urlHandler}>Logout</MenuItem>
        </Menu>
      </div>
    )

}

export default UserMenu;