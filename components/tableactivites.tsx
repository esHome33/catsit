"use client";

import { Fab, List } from "@mui/material";
import Ligne from "./ligne";
import { Add } from "@mui/icons-material";
import { DataRowTransformed, Donnees } from "@/types/data";

type Props = {
    datas: Donnees;
};

const TableActivites = (props: Props) => {
    
    const stringToBool = (chaine: string) => {
        const retour: boolean[] = [];
        for (let index = 0; index < chaine.length; index++) {
            const element = chaine.charAt(index);
            if (element === "0")
                retour.push(false);
            else
                retour.push(true);
        }
        return retour;
    }

    const dataTransfomed:DataRowTransformed[] = props.datas.map((elt, index) => {
        const ch1 = elt.days_to_do;
        const ch2 = elt.days_done;
        const resu: DataRowTransformed = {
            id:elt.id,
            activite: elt.activite,
            days: stringToBool(ch1),
            done: stringToBool(ch2),
            photo: elt.photo
        }
        return resu;
    })

    return (<>
        <List>
            {
                dataTransfomed.map((val, index) => {
                    
                    return (<Ligne data={val} cle={index} />)
                })
            }
            
        </List>
        <Fab color="primary" aria-label="add" variant="extended"
            className="absolute bottom-4 left-4 bg-blue-300"
            onClick={(e) => {
                e.preventDefault();
                console.log("Add a new line in table");
            }}
        >
            <Add />
        </Fab>
    </>
    )
}

export default TableActivites;