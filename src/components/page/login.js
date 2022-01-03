import React, { useContext, useState } from "react";
import { TextField, Button } from "@mui/material";
import { Send } from "@mui/icons-material";
import PlatformService from "../../services/platform";
import { UserContext } from "../../app";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const gClientId = "918516123726-akqu3nl61k15kv1g2ctkdhkmgkm23rl4.apps.googleusercontent.com";
    const redirect = "http://localhost:2000/users/google";
    const initialData = { username: "", password: " "};
    const [formData, setFormData] = useState(initialData);
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    const url = "http://localhost:2000/users/login";


    const handleClick = (e) => {
        PlatformService.signIn(formData.username, formData.password,"some link")
        .then(user => {
            console.log(user);
            userContext.dispatch({type:"set-user", payload:user})
            navigate("/");
        })
        .catch(err => { 
            //Error things
            console.log(err)

            userContext.dispatch({type:"set-user", payload: initialData })
        })
    }

    const onChangeHandler = (e) => {
        let name = e.target.getAttribute("name");
        setFormData({ ...formData, [name] : e.target.value});
    }

    return (
        <div>
             <a href={`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirect}&client_id=${gClientId}&response_type=code&prompt=consent&access_type=offline&scope=https://www.googleapis.com/auth/userinfo.email`}>
                LOGIN WITH GOOGLE
            </a>
            <form>
                <TextField label="Username" name="username" variant="standard" onChange={onChangeHandler} value={formData.username} />
                <TextField label="Password" name="password" variant="standard" onChange={onChangeHandler} value={formData.password} type="password" />
                <Button variant="contained" endIcon={<Send />}  onClick={handleClick}>Submit</Button>
            </form>
        </div>
    )

}
export default LoginPage;