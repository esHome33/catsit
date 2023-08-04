"use client";

import { Fab, List } from "@mui/material";
import Ligne from "./ligne";
import { Add } from "@mui/icons-material";
import { DataRow, DataRowTransformed, Donnees } from "@/types/data";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

type Props = {
    datas: Donnees;
};


const TableActivites = (props: Props) => {

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
    const supabase = createClientComponentClient<Database>({ supabaseUrl, supabaseKey });

    const traiteEvent = (payload: RealtimePostgresChangesPayload<{
        [key: string]: any;
    }>) => {
        const row = payload.new as DataRow;
        switch (payload.eventType) {
            case "INSERT":
                setDataTransfomed((dataTransfomed) => [...dataTransfomed, ...transform([row])]);
                break;
            case "DELETE":
                const id_supprime = payload.old.id;
                console.log('DELETE TableActivite de id = ' + id_supprime);
                const nv_liste = dataTransfomed.filter((elt) => { return (elt.id !== id_supprime); });
                setDataTransfomed(nv_liste);
                break;
            case "UPDATE":
                const id_modifie = payload.old.id;
                console.log('UDPATE TableActivite de id = ', id_modifie);
                setDataTransfomed(dataTransfomed.map((elem) => {
                    if (elem.id === id_modifie) {
                        const newelt: DataRowTransformed = transform([payload.new as DataRow])[0];
                        return newelt;
                    } else {
                        return elem;
                    }
                }));
                break;

        }
    }



    const stringToBool = (chaine: string) => {
        const bol_vide = [false, false, false, false, false, false, false];
        if (!chaine) {
            console.error(' *** chaine est undefined ');
            return bol_vide;
        }
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

    const transform = (donnees: Donnees) => {
        const tr_datas = donnees.map((elt) => {
            const ch1 = elt.days_to_do;
            const ch2 = elt.days_done;
            const resu: DataRowTransformed = {
                id: elt.id,
                activite: elt.activite,
                days: stringToBool(ch1),
                done: stringToBool(ch2),
                photo: elt.photo
            }
            return resu;
        });

        return tr_datas;
    }

    const dataTransfomedInitial: DataRowTransformed[] = transform(props.datas);
    const [dataTransfomed, setDataTransfomed] = useState<DataRowTransformed[]>(dataTransfomedInitial);

    useEffect(() => {
        const id = supabase.channel("maj_activites")
            .on('postgres_changes', { event: "*", schema: "public", table: "actions" }, (payload) => traiteEvent(payload))
            .subscribe();

        return () => {
            supabase.removeChannel(id);
        }
    }, []);

    useEffect(() => {
        console.log("TABLEACTIVITES : état modifié et réaffiché");
    }, [dataTransfomed]);


    return (<>
        <List>
            {
                dataTransfomed.map((val, index) => {
                    console.log('lecture ' + index + " valeur =" , val );
                    return (<Ligne key={index} data={val} cle={index} />)
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