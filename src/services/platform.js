import axios from "axios";
import Cookie from "../util/cookie";

let PlatformService =  {};
const serverUrl = "http://localhost:2000";


PlatformService.signIn = (username, password, redirectLink) => {

    return new Promise((resolve, reject) => {
        let call = axios({
            method: "post",
            url: `${serverUrl}/users/login`,
            responseType: "json",
            data: {
                username: username,
                password: password,
                redirectLink: redirectLink
            }
        })
        .then(response => {
            const token = response.data.token;
            const redirectLink = response.data.redirectLink;
            Cookie.setCookie("runeterra-token", token, 1);
            
            let user = response.data.user;
            user.isLoggedIn = true;
            resolve(user)
        })
        .catch(error => {
            reject(error)
        })
    })
}

PlatformService.userFromToken = (token) => {

    return new Promise ((resolve, reject) => {
        axios({
            method: "post",
            url: `${serverUrl}/users/token`,
            responseType: "json",
            headers: {
                "Authorization": token
            }
        })
        .then(response => {
            Cookie.setCookie("runeterra-token", token, 1);
            
            let user = response.data;
            user.isLoggedIn = true;
            resolve(user)
        })
        .catch(error => {
            reject(error)
        })
    })
}

PlatformService.updateUser = (user) => {
    return new Promise ((resolve, reject) => {
         //server stuff
         axios(
            {
                method: 'put',
                url:"http://localhost:2000/users",
                data: user
            }
        )
        .then(res => {        
            let token = res.data.token;
            let user = res.data.user;
            user.isLoggedIn = true;
            Cookie.setCookie("runeterra-token", token, 1);
            resolve(user);
        })
        .catch(err => { 
            console.log(err) ;
            reject(err);
        })

    })
}

PlatformService.getMatch = (matchCode, config) => {
    //Debug
    if (config !== undefined){
        
    }

    //Production Mode
    return new Promise((resolve, reject) => {
        axios({
            method:"GET",
            url:`http://localhost:2000/summoner/match/${matchCode}`
        })
        .then((res) => {
            console.log(res);
            console.log(res.data);
            switch(res.request.status){
                case 200:
                    resolve(res.data);

                case 429:
                    reject("trying");           
            }
        })
        .catch(err => {
            reject(err)
        })

    })
}

export default PlatformService;