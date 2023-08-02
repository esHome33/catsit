"use client";


import { Button, Checkbox, ListItem, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'

type Props = {
    day: boolean[];
    acti: string;
}


const Ligne = (props: Props) => {
    const initial_acti = props.acti;
    const [activite, setActivite] = useState(initial_acti);
    const [btnLabel, setBtnLabel] = useState<string>("Edit");
    const [c_lundi, setC_lundi] = useState<boolean>(props.day[0]);
    const [c_mardi, setC_mardi] = useState<boolean>(props.day[1]);
    const [c_mercredi, setC_mercredi] = useState<boolean>(props.day[2]);
    const [c_jeudi, setC_jeudi] = useState<boolean>(props.day[3]);
    const [c_vendredi, setC_vendredi] = useState<boolean>(props.day[4]);
    const [c_samedi, setC_samedi] = useState<boolean>(props.day[5]);
    const [c_dimanche, setC_dimanche] = useState<boolean>(props.day[6]);

    const change_jour = (e: React.ChangeEvent<HTMLInputElement>, jour: number) => {
        const new_val = Boolean(e.target.value);
        e.preventDefault();

        if (jour >= 0 && jour < 7) {
            switch (jour) {
                case 0:
                    setC_lundi(new_val);
                    break;
                case 1:
                    setC_mardi(new_val);
                    break;
                case 2:
                    setC_mercredi(new_val);
                    break;
                case 3:
                    setC_jeudi(new_val);
                    break;
                case 4:
                    setC_vendredi(new_val);
                    break;
                case 5:
                    setC_samedi(new_val);
                    break;
                case 6:
                    setC_dimanche(new_val);
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <>
            <ListItem className="bg-slate-300">
                <TextField label="activité" size='small' className='mr-4'
                    InputProps={{ readOnly: false }}
                    value={activite}
                    onChange={(val) => {
                        const new_acti = val.target.value;
                        if (new_acti === initial_acti) {
                            setBtnLabel("Edit");
                            setActivite(initial_acti);
                        } else {
                            setActivite(new_acti);
                            setBtnLabel("Save");
                        }
                    }}
                />
                <div className='flex flex-col'>
                    <div className='flex flex-row space-x-2'>
                        <Typography variant='body2' className='w-6'>Lun</Typography>
                        <Typography variant='body2' className='w-6'>Mar</Typography>
                        <Typography variant='body2' className='w-6'>Mer</Typography>
                        <Typography variant='body2' className='w-6'>Jeu</Typography>
                        <Typography variant='body2' className='w-6'>Ven</Typography>
                        <Typography variant='body2' className='w-6'>Sam</Typography>
                        <Typography variant='body2' className='w-6'>Dim</Typography>
                    </div>
                    <div className='flex flex-row space-x-2'>
                        <Checkbox className='w-6' checked={c_lundi}
                            onChange={(e) => {
                                change_jour(e, 0);
                            }}
                        />
                        <Checkbox className='w-6' checked={c_mardi} onChange={(e) => {
                            change_jour(e, 1);
                        }}
                        />
                        <Checkbox className='w-6' checked={c_mercredi} onChange={(e) => {
                            change_jour(e, 2);
                        }}
                        />
                        <Checkbox className='w-6' checked={c_jeudi} onChange={(e) => {
                            change_jour(e, 3);
                        }}
                        />
                        <Checkbox className='w-6' checked={c_vendredi} onChange={(e) => {
                            change_jour(e, 4);
                        }}
                        />
                        <Checkbox className='w-6' checked={c_samedi} onChange={(e) => {
                            change_jour(e, 5);
                        }}
                        />
                        <Checkbox className='w-6' checked={c_dimanche} onChange={(e) => {
                            change_jour(e, 6);
                        }}
                        />
                    </div>
                </div>
                {(btnLabel === "Edit") ? null :
                    <Button variant='outlined' className='ml-4'>{btnLabel}</Button>
                }
            </ListItem>
        </>
    )
}

export default Ligne;