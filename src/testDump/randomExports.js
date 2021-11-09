//Chart helper
export const colorFactionMapper = {
    Ionia: "#000",
    PiltoverZaun: "#ccc",
    Noxus: "#f00",
    Freljord: "#34cceb",
    Demacia: "#fcdb47"
}

export const factionLabelTextMapper = {
    Ionia: "Ionia",
    Noxus: "Noxus",
    PiltoverZaun: "Piltover & Zaun",
    Freljord: "Freljord",
    Demacia: "Demacia"
}


export const buildChartData = (deck) => {
    const flatMana = { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0 };
    let data = {};
    for ( let obj of deck ) {
        
        //Create Region
        if (data[obj.details.regionRef] === undefined)
            data[obj.details.regionRef] = { count: 0, keywords:{}, rarities:{}, landmarks: 0, spells: {count: 0, speeds:{}} , units:{ count: 0, types: { normal: 0 } } , manaCost:{...flatMana} };

        //update card count    
        data[obj.details.regionRef]["count"] += obj.count; 

        //Mana
        if(obj.details.cost > 10){
            data[obj.details.regionRef].manaCost["11"] += obj.count;    
        }else{
            data[obj.details.regionRef].manaCost[obj.details.cost] += obj.count;
        }

        

        //Rarites
        if(data[obj.details.regionRef].rarities[obj.details.rarityRef] === undefined)
            data[obj.details.regionRef].rarities[obj.details.rarityRef] = 0

        data[obj.details.regionRef].rarities[obj.details.rarityRef] += obj.count;

        //units
        if(obj.details.type === "Unit"){
            data[obj.details.regionRef].units.count += obj.count;

            if(obj.details.subtype === ""){
                data[obj.details.regionRef].units.types.normal += obj.count
            }else{
                if(data[obj.details.regionRef].units.types[obj.details.subtype] === undefined)
                    data[obj.details.regionRef].units.types[obj.details.subtype] = 0;

                data[obj.details.regionRef].units.types[obj.details.subtype] += obj.count;
            }
        }

        //spells
        if(obj.details.type === "Spell"){
            data[obj.details.regionRef].spells.count += obj.count;

            if(data[obj.details.regionRef].spells.speeds[obj.details.spellSpeedRef] === undefined)
                data[obj.details.regionRef].spells.speeds[obj.details.spellSpeedRef] = 0;

            data[obj.details.regionRef].spells.speeds[obj.details.spellSpeedRef] += obj.count;
        }

        //landmarks
        if(obj.details.type === "Landmark"){
            data[obj.details.regionRef].landmarks += obj.count;
        }

        //keywords
        if(obj.details.keywordRefs.length > 0){
            let keywordKey = "";
            for(let i = 0; i < obj.details.keywordRefs.length; i++ ){
                //one
                if(obj.details.keywordRefs.length == 1){
                    keywordKey = obj.details.keywordRefs[i];
                    continue;    
                }

                //last
                if(i === obj.details.keywordRefs.length -1){
                    keywordKey += obj.details.keywordRefs[i];
                    continue;
                }

                //first/middle
                keywordKey += obj.details.keywordRefs[i] + " ";
            }

            if(data[obj.details.regionRef].keywords[keywordKey] === undefined)
                data[obj.details.regionRef].keywords[keywordKey] = 0;

            data[obj.details.regionRef].keywords[keywordKey] += obj.count;
        }



    }
    return data;
}


/***
 * Deck filters 
 */
