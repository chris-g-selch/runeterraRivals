import React, {useEffect, useContext} from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import {Login, AccountCircle} from '@mui/icons-material';
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../app";
import "../../layeredBox.css";
import "./menu.css";


const UserMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const userContext = useContext(UserContext);
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
      <div id="menu" className="layeredBox">
        <div  className="layeredBox__head">
            {!userContext.user.isLoggedIn && <Link to="/login" ><button id="loginButton" className="menu-button"><Login/></button></Link>}
        </div>
        
        <div className="layeredBox__bone">
          <div className="layeredBox"> 
            <div className="layeredBox__head"></div>
            <div className="layeredBox__bone">
                <button name="profile" className="menu-button" onClick={urlHandler}><AccountCircle /></button>  
            </div>
            <div className="layeredBox__bone">
                <button name="decks" className="menu-button" onClick={urlHandler}>Decks</button>
            </div>
            <div className="layeredBox__bone">
                <button name="rivals" className="menu-button" onClick={urlHandler}>Rivals</button>
            </div>
            <div className="layeredBox__bone">
                <button name="logout" className="menu-button" onClick={urlHandler}>Logout</button>
            </div>
          </div>          
        </div>
      </div>       
    )

}

export default UserMenu;


   // const oldView  =<div>
    //                   <Button
    //                     id="basic-button"
    //                     aria-controls="basic-menu"
    //                     aria-haspopup="true"
    //                     aria-expanded={open ? 'true' : undefined}
    //                     onClick={handleClick}
    //                   >
    //                     Dashboard
    //                   </Button>
    //                   <Menu
    //                     id="basic-menu"
    //                     anchorEl={anchorEl}
    //                     open={open}
    //                     onClose={handleClose}
    //                     MenuListProps={{
    //                       'aria-labelledby': 'basic-button',
    //                     }}
    //                   >
    //                     <MenuItem name="profile" onClick={urlHandler}>Profile</MenuItem>
    //                     <MenuItem name="decks" onClick={urlHandler}>Decks</MenuItem>
    //                     <MenuItem name="rivals" onClick={urlHandler}>Rivals</MenuItem>
    //                     <MenuItem name="logout" onClick={urlHandler}>Logout</MenuItem>
    //                   </Menu>
    //                 </div>