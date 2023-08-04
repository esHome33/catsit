"use client";

import { DataRow } from '@/types/data'
import { Database } from '@/types/supabase'
import { CheckBox } from '@mui/icons-material';
import { Button, Checkbox, List, ListItem, Typography } from '@mui/material';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react'

type Props = {
    jour: number;
}

const ListeActions = (props: Props) => {

    const jour = props.jour;

    const supabase = createClientComponentClient<Database>();

    const isForToday = (action: DataRow) => {
        // jour est le numéro de DIM LUN MAR MER JEU VEN SAM
        // or pour moi index=0 pour le LUN et 6 pour le DIM
        let jour_effectif = jour - 1;
        if (jour === 0) {
            jour_effectif = 6;
        }
        const j_action = action.days_to_do.charAt(jour_effectif)
        if (j_action === "0") {
            return false;
        } else
            return true;
    }

    const isDone = (action: DataRow) => {
        // jour est le numéro de DIM LUN MAR MER JEU VEN SAM
        // or pour moi index=0 pour le LUN et 6 pour le DIM
        let jour_effectif = jour - 1;
        if (jour === 0) {
            jour_effectif = 6;
        }
        const j_action = action.days_done.charAt(jour_effectif)
        if (j_action === "0") {
            return false;
        } else
            return true;
    }


    const [afficher, setAfficher] = useState<DataRow[]>([]);

    const traite_chgts = (payload: RealtimePostgresChangesPayload<{
        [key: string]: any;
    }>) => {
        const val = payload.eventType;
        switch (val) {
            case "UPDATE":
                const new_elt = payload.new as DataRow;
                setAfficher(afficher.map((elt) => {
                    if (elt.id === new_elt.id) {
                        return new_elt;
                    } else
                        return elt;
                }));
                break;
            case "DELETE":
                break;
            case "INSERT":
                break;
        }
    }

    useEffect(() => {
        const sup_get = async () => {
            const { data: data } = await supabase.from("actions").select();

            if (data) {
                setAfficher(data.filter((elt) => {
                    return isForToday(elt);
                }));

            } else {
                setAfficher([]);
            }
        };

        sup_get();
        const id = supabase.channel("catsitter-chan").on("postgres_changes", {
            event: "*", schema: "public", table: "actions"
        }, (payload) => traite_chgts(payload)).subscribe();

        return () => {
            supabase.removeChannel(id);
        }
    }, [, jour]);


    const action_changed = () => {

    }

    const checkChange = (_e: React.ChangeEvent<HTMLInputElement>,check:boolean, id:number) => {
        console.log('chek chg : checked =' + check + " pour id=" + id);
    }


    return (<>
        <div className='mt-4'>
            <List className='bg-yellow-50 rounded drop-shadow-md'>

                {afficher ? afficher.map((elt) => {
                    const done = isDone(elt);
                    return (
                        <ListItem secondaryAction={<Checkbox checked={done} onChange={(e,c)=>checkChange(e,c,elt.id)}/>}
                        >
                            <span className='mr-20'>
                                <Typography variant='body1'>
                                {elt.activite }

                                </Typography>
                            </span>
                        </ListItem>)
                }) : "Aucune donnée à afficher"}
            </List>
        </div>

    </>
    )
}

export default ListeActions;