import React from "react";
import "./navbar.css";

const Navbar = ({children}) => {

    return(
        <header>
            {children}
        </header>
    );

}

export default Navbar;