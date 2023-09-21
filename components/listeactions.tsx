"use client";

import { filtrerDatas } from '@/lib/catsitterdata';
import { changeVal } from '@/lib/days';
import { DataRow } from '@/types/data'
import { Database } from '@/types/supabase'
import { Checkbox, List, ListItem, Typography } from '@mui/material';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react'

type Props = {
    jour: number;
}

const ListeActions = (props: Props) => {

    /**
     * numéro du jour dont on affiche les actions catsitter. Ce 
     * numéro est à 0 pour DIM, 1 pour LUN, 2 pour MAR ...  et 6 le SAM
     * Il faut le transformer pour qu'on puisse travailler avec 
     * les données stockées dans ma base de données.
     */
    const jour = props.jour;


    const [afficher, setAfficher] = useState<DataRow[]>([]);
    const [checks, setChecks] = useState<boolean[]>([]);
    const [indexes, setIndexes] = useState<number[]>([]);

    const traite_chgts = (payload: RealtimePostgresChangesPayload<{
        [key: string]: any;
    }>) => {
        const val = payload.eventType;
        switch (val) {
            case "UPDATE": {
                const new_elt = payload.new as DataRow;
                console.log(`Realtime UPDATE : ${JSON.stringify(new_elt)}`);
                const new_aff = afficher.map((elt) => {
                    if (elt.id === new_elt.id) {
                        const nw_datarow: DataRow = {
                            id: new_elt.id,
                            created_at: new_elt.created_at,
                            activite: new_elt.activite,
                            days_done: new_elt.days_done,
                            days_to_do: new_elt.days_to_do,
                            photo: new_elt.photo
                        }
                        return nw_datarow;
                    } else
                        return elt;
                });
                console.log('Afficher', afficher);
                console.log('new_aff = ', new_aff);
                setAfficher(new_aff);
            }
                break;
            case "DELETE":
                break;
            case "INSERT":
                break;
        }
    };

    useEffect(() => {
        const supabase = createClientComponentClient<Database>();
        const sup_get = async () => {
            const { data: data } = await supabase.from("actions").select();

            if (data) {
                const dic = filtrerDatas(data, jour);
                setAfficher(dic.actions);
                setChecks(dic.checks);
                setIndexes(dic.indexs);

            } else {
                setAfficher([]);
                setChecks([]);
                setIndexes([]);
            }
        };

        sup_get();
        // subscribe to DB changes
        const id = supabase.channel("catsitter-chan").on("postgres_changes", {
            event: "*", schema: "public", table: "actions"
        }, (payload) => traite_chgts(payload)).subscribe();

        return () => {
            supabase.removeChannel(id);
        }
    }, []);



    const checkChange = async (_e: React.ChangeEvent<HTMLInputElement>, check: boolean, id: number, dones: string) => {
        const ou_est_id = indexes.findIndex((val) => {
            return (val === id);
        });

        console.log('chek chg : checked =' + check + " pour id=" + id + " avec jour = " + jour + " id est à " + ou_est_id + " idxs " + JSON.stringify(indexes));

        if (ou_est_id >= 0) {
            // change Checks
            const old_val = checks[ou_est_id];
            if (old_val !== check) {
                const new_table: boolean[] = [];
                checks.forEach((elt, idx) => {
                    if (idx === ou_est_id) {
                        new_table.push(!elt);
                    } else {
                        new_table.push(elt);
                    }
                });
                //console.log(`chgt de valeur ${old_val} par ${check} => old_table = ${checks} & new_table = ${new_table}`);
                setChecks(new_table);

                //setAfficher([]);

                // update database
                // try {
                //     const hd = new Headers();
                //     const data = {
                //         id: id,
                //         dones: dones,
                //         jour: jour
                //     };
                //     const rqi: RequestInit = {
                //         method: "POST",
                //         body: JSON.stringify(data),
                //         headers: hd
                //     }
                //     const req = new Request("/api", rqi);
                //     const rep = await (await fetch(req)).json();
                //     console.log(`POST effectué ${JSON.stringify(rep)}`);

                // } catch (error) {
                //     console.log("Erreur lors de l'appel fetch /api");
                // }

                const supabase = createClientComponentClient<Database>();
                const new_value = changeVal(afficher[ou_est_id].days_done, jour);
                const { data, error } = await supabase.from("actions").update({ days_done: new_value }).eq("id", id).select();
                
                if (error) {
                    console.log(`Err UPDATE : ${error.message}`);
                } 
            } else {
                console.log("la valeur est la même !");
            }
        } else {
            console.log(`id (${id}) non trouvé dans ${indexes}`);
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
                                onChange={(e, c) => checkChange(e, c, elt.id, elt.days_done)}
                                value={checks[index]}
                            />}
                            key={elt.id}
                        >
                            <span className='mr-20'>
                                <Typography variant='body1'>
                                    {elt.activite}
                                </Typography>
                            </span>
                        </ListItem>)
                }) : (
                        <Typography className='text-center font-bold mx-4'>Aucune donnée à afficher</Typography>
                    )}
            </List>
        </div>

    </>
    )
}

export default ListeActions;