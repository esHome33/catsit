"use client";

import { Fab, List } from "@mui/material";
import Ligne from "./ligne";
import { Add } from "@mui/icons-material";
import { Donnees } from "@/types/data";

type Props = {
    datas: Donnees;
};

const TableActivites = (props: Props) => {
    

    return (<>
        <List>
            {
                props.datas.map((val, index) => {
                    
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