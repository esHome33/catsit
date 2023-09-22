"use client";

import { Fab, List } from "@mui/material";
import Ligne from "./ligne";
import { Add } from "@mui/icons-material";
import { DataRow, DataRowTransformed, Donnees } from "@/types/data";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { MouseEventHandler, useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import DialogueSaisieAction from "./dialoguesaisieaction";

type Props = {
    datas: Donnees;
};


const TableActivites = (props: Props) => {

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
    const supabase = createClientComponentClient<Database>({ supabaseUrl, supabaseKey });

    const [dia_is_open, setDia_is_open] = useState<boolean>(false);

    
    const stringToBool = (chaine: string) => {
        const bol_vide = [false, false, false, false, false, false, false];
        if (!chaine) {
            console.error(' *** STRINGTOBOOL function : chaine est undefined ');
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
        const tr_datas_tmp = donnees.map((elt) => {
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
        const tr_datas = tr_datas_tmp.sort((elt1,elt2) => {
            return elt1.activite.charCodeAt(0) - elt2.activite.charCodeAt(0);
        })
        return tr_datas;
    }
    
    const refreshData = async () => {
        const { data: datas } = await supabase.from("actions").select();
        if (datas) {
            const tr = transform(datas);
            setDataTransfomed(tr);
        }
    }
    
    const dataTransfomedInitial: DataRowTransformed[] = transform(props.datas);
    const [dataTransfomed, setDataTransfomed] = useState<DataRowTransformed[]>(dataTransfomedInitial);

    const traiteEvent = (payload: RealtimePostgresChangesPayload<{
        [key: string]: any;
    }>) => {
        const row = payload.new as DataRow;
        switch (payload.eventType) {
            case "INSERT":
                const id_insere = payload.new.id;
                console.log(`INSERT TableActivite de id = ${id_insere}`);
                setDataTransfomed((dataTransfomed) => [...dataTransfomed, ...transform([row])]);
                refreshData();
                break;
            case "DELETE":
                const id_supprime = payload.old.id;
                console.log(`DELETE TableActivite de id = ${id_supprime}`);
                const nv_liste = dataTransfomed.filter((elt) => { return (elt.id !== id_supprime); });
                setDataTransfomed(nv_liste);
                refreshData();
                break;
            case "UPDATE":
                const id_modifie = payload.old.id;
                console.log(`UDPATE TableActivite de id = ${id_modifie}`);
                setDataTransfomed(dataTransfomed.map((elem) => {
                    if (elem.id === id_modifie) {
                        const newelt: DataRowTransformed = transform([payload.new as DataRow])[0];
                        return newelt;
                    } else {
                        return elem;
                    }
                }));
                refreshData();
                break;
            default:
                break;
        }
    }


    useEffect(() => {
        refreshData();
        const id = supabase.channel("maj_activites")
            .on('postgres_changes', { event: "*", schema: "public", table: "actions" }, (payload) => traiteEvent(payload))
            .subscribe();

        return () => {
            supabase.removeChannel(id);
        }
    }, []);

    
    const addNewTask: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        setDia_is_open(true);
    }

    const createNewAction = (action_name: string | null) => {
        setDia_is_open(false);
        if (action_name) {
            console.log(`réception du dialogue de ${action_name}`);
            // create a new action in the database
            supabase.from("actions").insert({
                days_done: "0000000",
                activite: action_name,
                days_to_do: "0000000"
            }).then(() => {
                console.log('value correctly inserted');
                refreshData();
            });
        } else {
            console.log("Annulation : aucune action créée !");
        }
    }


    return (<>
        <Fab color="primary" aria-label="add" variant="extended"
            className="fixed bottom-4 right-4 bg-blue-300"
            onClick={addNewTask}
        >
            <Add />
        </Fab>
        <List>
            {
                dataTransfomed.map((val, index) => {
                    //console.log(`lecture index ${index} => valeur = ${val}`);
                    return (<Ligne key={val.id} data={val} cle={index} refresh={refreshData} />)
                })
            }

        </List>
        <DialogueSaisieAction onOK={createNewAction} open={dia_is_open} />
    </>
    )
}

export default TableActivites;