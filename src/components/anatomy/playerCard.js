import React, {useContext, useState} from "react";
import { IconButton, Tooltip, Modal, Box, Typography } from "@mui/material";
import { PersonAdd, History } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { default as coreData } from "../../riotData/core/en_us/data/globals-en_us.json";
import "./playerCard.css";
import { UserContext } from "../../app";

//service
import message from "../../services/message";
import PlatformService from "../../services/platform";

const PlayerCard = ({deck_code, deck_id, factions, game_outcome, order_of_play, puuid, summoner, tag}) => {
    const userContext = useContext(UserContext);
    const [open, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      

    let mapper = {
        faction_Demacia_Name: "Demacia",
        faction_Ionia_Name: "Ionia",
        faction_Noxus_Name: "Noxus",
        faction_Freljord_Name: "Freljord",
        faction_Piltover_Name: "Piltover & Zaun",
        faction_ShadowIsles_Name: "Shadow Isles",
        faction_Bilgewater_Name: "Bilgewater",
        faction_BandleCity_Name: "Bandle City",
        faction_Shurima_Name: "Shurima",
        faction_MtTargon_Name: "Targon"
    }

    let factionImages = [];
    for(let faction of factions){
        let factionObj = coreData.regions.find(obj => obj.name === mapper[faction]);
        factionImages.push(factionObj.iconAbsolutePath)
    }


    //Add to Rivals
    const addRival = () => {
        userContext.user.runeterra.rivals.push({summoner, tag})
        
        if(userContext.user.isLoggedIn) {
            PlatformService.updateUser(userContext.user)
            .then(user => {
                userContext.dispatch({type:"set-user", payload: { ...user }})
                //update button state
            })
            .catch(err=> {

            })
        }else{
            userContext.dispatch({type:"set-user", payload: { ...userContext.user }})
            //Modal pop up for register
            setModalOpen(true);
        }

    }

    const SearchPlayer = (e) => {
        navigate(`/${summoner}/${tag}`, { replace: true})
    }

    const closeModal =() =>{
        setModalOpen(false);
    }


    return (
        <div>
            <Modal
                open={open}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {message.REGISTER_RIVAL}
                    </Typography>
                </Box>
            </Modal>
            <div className="playerCard">
                <div className="playerCard__summoner">{summoner} {tag}</div>
                <div className="playerCard__actions">
                    <Tooltip title="Add Rival">
                        <IconButton onClick={addRival} >
                            <PersonAdd fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="View Match History">
                        <IconButton onClick={SearchPlayer}>
                            <History fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </div>
                            
                <Link to={`/Deck/${deck_code}`} className="playerCard__deck" >
                {
                    factionImages.map((obj, index) => <img height={150} width={150} key={index} src={obj} />)
                }
                </Link>
            </div>
        </div>
    )

}

export default PlayerCard;