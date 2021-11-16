import react, {useEffect} from "react";
import { useParams } from "react-router-dom";

const PlayerPage = ({summoner, tag}) => {
    let params = useParams();
    console.log(params);
    return <div>{params.summoner}/{params.tag}</div>
}

export default PlayerPage;