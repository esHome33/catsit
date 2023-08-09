"use client";

import { changeBool, getBoolean } from '@/lib/days';
import { DataRow } from '@/types/data'
import { Database } from '@/types/supabase'
import { Checkbox, List, ListItem, Typography, tabClasses } from '@mui/material';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react'

type Props = {
    jour: number;
}

const ListeActions = (props: Props) => {

    const jour = props.jour;



    const isForToday = (action: DataRow) => {
        // jour est le numéro de DIM LUN MAR MER JEU VEN SAM
        // or pour moi index=0 pour le LUN et 6 pour le DIM
        let jour_effectif = jour - 1;
        if (jour === 0) {
            jour_effectif = 6;
        }
        const j_action = action.days_to_do.charAt(jour_effectif)
        return (j_action !== "0")
    }

    const isDone = (action: DataRow) => {
        // jour est le numéro de DIM LUN MAR MER JEU VEN SAM
        // or pour moi index=0 pour le LUN et 6 pour le DIM
        let jour_effectif = jour - 1;
        if (jour === 0) {
            jour_effectif = 6;
        }
        const j_action = action.days_done.charAt(jour_effectif)
        return (j_action !== "0")
    }


    const [afficher, setAfficher] = useState<DataRow[]>([]);
    const [checks, setChecks] = useState<boolean[]>([]);
    const [indexes, setIndexes] = useState<number[]>([]);

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
        const supabase = createClientComponentClient<Database>();
        const sup_get = async () => {
            const { data: data } = await supabase.from("actions").select();

            if (data) {
                const les_checks: boolean[] = [];
                const les_indexs: number[] = [];
                setAfficher(data.filter((elt) => {
                    const selectionner = isForToday(elt);
                    if (selectionner) {
                        const val = getBoolean(jour, elt.days_done);
                        les_checks.push(val);
                        les_indexs.push(elt.id);
                    }
                    return selectionner;
                }));

                setChecks(les_checks);
                setIndexes(les_indexs);

            } else {
                setAfficher([]);
                setChecks([]);
                setIndexes([]);
            }
        };

        sup_get();
        const id = supabase.channel("catsitter-chan").on("postgres_changes", {
            event: "*", schema: "public", table: "actions"
        }, (payload) => traite_chgts(payload)).subscribe();

        return () => {
            supabase.removeChannel(id);
        }
    }, []);


    const action_changed = () => {

    }

    const checkChange = (_e: React.ChangeEvent<HTMLInputElement>, check: boolean, id: number) => {
        const ou_est_id = indexes.findIndex((val) => {
            return (val === id);
        });
        
        //console.log('chek chg : checked =' + check + " pour id=" + id + " avec jour = " + jour + " id est à " + ou_est_id + " idxs " + JSON.stringify(indexes));

        if (ou_est_id >= 0) {
            const old_val = checks[ou_est_id];
            if (old_val !== check) {
                console.log(`chgt de valeur ${old_val} par ${check}  table = ${checks}`);
                const new_table: boolean[] = [];
                checks.forEach((elt, idx) => {
                    if (idx === ou_est_id) {
                        new_table.push(!elt);
                    } else {
                        new_table.push(elt);
                    }
                });
                console.log(`nouvelle table = ${new_table}`);
                setChecks(new_table);
            } else {
                console.log(`la valeur est la même !`);
            }
        } else {
            console.log(` id non trouvé (${id}) dans ${indexes}`);
        }
    }


    return (<>
        <div className='mt-4 drop-shadow'>
            <List className='bg-yellow-50 text-blue-900 rounded drop-shadow-md'>

                {afficher ? afficher.map((elt, index) => {
                    
                    return (
                        <ListItem
                            secondaryAction={<Checkbox
                                checked={checks[index]}
                                onChange={(e, c) => checkChange(e, c, elt.id)}
                                value={checks[index]}
                            />}
                            key={index}
                        >
                            <span className='mr-20'>
                                <Typography variant='body1'>
                                    {elt.activite}
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