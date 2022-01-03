import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../app";
import PlatformService from "../../services/platform";
import { TextField, Button, List, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { Send } from "@mui/icons-material";

/**
 * 
 *   Still need to kick back to home page if user is not logged in
 */

const RivalPage = () => {
    const initalTemplate = { summoner: "", tag: "" };
    const [formData, setFormData] = useState(initalTemplate);


    const userContext = useContext(UserContext);

    const onChangeHandler = (e) => {
        const name = e.target.getAttribute('name');
        setFormData({...formData, [name]:e.target.value});
    }

    const onSubmitHandler = (e) => {
        
        userContext.user.runeterra.rivals.push(formData);

        userContext.dispatch({ type:"set-user", payload:{ ...userContext.user } });

        PlatformService.updateUser(userContext.user)
        
        

       

        setFormData(initalTemplate);
    }


    return(
        <div>
            <div className="left">
                <ul>
                    {
                        userContext.user.runeterra.rivals.map((obj) => <li key={obj.summoner}><Link to={`/${obj.summoner}/${obj.tag}`}>{`${obj.summoner} ${obj.tag}`}</Link></li> )
                    }
                </ul>
            </div>
            <div className="right">
                <form>
                    <TextField label="Summoner" variant="standard" name="summoner" value={formData.summoner} onChange={onChangeHandler} ></TextField>
                    <TextField label="Tag" variant="standard" name="tag" value={formData.tag} onChange={onChangeHandler}  ></TextField>
                    <Button variant="contained" endIcon={<Send />} onClick={onSubmitHandler}>Add</Button>
                </form>
            </div>    
        </div>
    );
}

export default RivalPage;