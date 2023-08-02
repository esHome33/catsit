"use client";

import { Fab, List } from "@mui/material";
import Ligne from "./ligne";
import { Add } from "@mui/icons-material";


type Props = {}

const Mytable = (_props: Props) => {
    const b1 = [true, true, false, false, false, false, true];
    const b2 = [false, false, true, true, true, true, false];

    return (<>
        <List>
            <Ligne day={b1} acti="coudre" />
            <Ligne day={b2} acti="eplucher" />
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

export default Mytable;