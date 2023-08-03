"use client";


import { DataRow } from '@/types/data';
import { Button, Checkbox, ListItem, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'

type Props = {
    data: DataRow;
    cle: number;
}


const Ligne = (props: Props) => {
    let initial_acti = props.data.activite;
    let init_days = props.data.days;
    const [activite, setActivite] = useState(initial_acti);
    const [btnLabel, setBtnLabel] = useState<string>("Edit");
    const [c_lundi, setC_lundi] = useState<boolean>(props.data.days[0]);
    const [c_mardi, setC_mardi] = useState<boolean>(props.data.days[1]);
    const [c_mercredi, setC_mercredi] = useState<boolean>(props.data.days[2]);
    const [c_jeudi, setC_jeudi] = useState<boolean>(props.data.days[3]);
    const [c_vendredi, setC_vendredi] = useState<boolean>(props.data.days[4]);
    const [c_samedi, setC_samedi] = useState<boolean>(props.data.days[5]);
    const [c_dimanche, setC_dimanche] = useState<boolean>(props.data.days[6]);


    const check_days_changed = (just_changed: number) => {
        const ref0 = init_days[0];
        const ref1 = init_days[1];
        const ref2 = init_days[2];
        const ref3 = init_days[3];
        const ref4 = init_days[4];
        const ref5 = init_days[5];
        const ref6 = init_days[6];


        let actual0 = c_lundi;
        let actual1 = c_mardi;
        let actual2 = c_mercredi;
        let actual3 = c_jeudi;
        let actual4 = c_vendredi;
        let actual5 = c_samedi;
        let actual6 = c_dimanche;

        switch (just_changed) {
            case 0:
                actual0 = !actual0;
                break;
            case 1:
                actual1 = !actual1;
                break;
            case 2:
                actual2 = !actual2;
                break;
            case 3:
                actual3 = !actual3;
                break;
            case 4:
                actual4 = !actual4;
                break;
            case 5:
                actual5 = !actual5;
                break;
            case 6:
                actual6 = !actual6;
                break;
            default:
                break;
        }

        if (actual0 === ref0
            && actual1 === ref1
            && actual2 === ref2
            && actual3 === ref3
            && actual4 === ref4
            && actual5 === ref5
            && actual6 === ref6
        ) {
            return true;
        } else {
            return false;
        }
    }

    const change_jour = (e: React.ChangeEvent<HTMLInputElement>, jour: number) => {
        const chgEditSave = (num: number) => {
            if (check_days_changed(num)) {
                setBtnLabel("Edit");
            } else {
                setBtnLabel("Save");
            }
        };
        const new_val = Boolean(e.target.checked);
        if (jour >= 0 && jour < 7) {
            switch (jour) {
                case 0:
                    setC_lundi(new_val);
                    chgEditSave(0);
                    break;
                case 1:
                    setC_mardi(new_val);
                    chgEditSave(1);
                    break;
                case 2:
                    setC_mercredi(new_val);
                    chgEditSave(2);
                    break;
                case 3:
                    setC_jeudi(new_val);
                    chgEditSave(3);
                    break;
                case 4:
                    setC_vendredi(new_val);
                    chgEditSave(4);
                    break;
                case 5:
                    setC_samedi(new_val);
                    chgEditSave(5);
                    break;
                case 6:
                    setC_dimanche(new_val);
                    chgEditSave(6);
                    break;
                default:
                    break;
            }
        }
    }

    const saveNewData = () => {
        let bool = "";

        if (c_lundi) {
            bool += "1"
        } else {
            bool += "0"
        }
        if (c_mardi) {
            bool += "1"
        } else {
            bool += "0"
        }
        if (c_mercredi) {
            bool += "1"
        } else {
            bool += "0"
        }
        if (c_jeudi) {
            bool += "1"
        } else {
            bool += "0"
        }
        if (c_vendredi) {
            bool += "1"
        } else {
            bool += "0"
        }
        if (c_samedi) {
            bool += "1"
        } else {
            bool += "0"
        }
        if (c_dimanche) {
            bool += "1"
        } else {
            bool += "0"
        }
        console.log("acti = " + activite + " jours " + bool);
        changeInitValues(bool, activite);
        setBtnLabel("Edit");
    }

    const changeInitValues = (jours: string, acti: string) => {
        init_days[0] = jours.charAt(0) === "0" ? false : true;
        init_days[1] = jours.charAt(1) === "0" ? false : true;
        init_days[2] = jours.charAt(2) === "0" ? false : true;
        init_days[3] = jours.charAt(3) === "0" ? false : true;
        init_days[4] = jours.charAt(4) === "0" ? false : true;
        init_days[5] = jours.charAt(5) === "0" ? false : true;
        init_days[6] = jours.charAt(6) === "0" ? false : true;
        initial_acti = acti;
    }

    const resetData = () => {
        setC_lundi(init_days[0]);
        setC_mardi(init_days[1]);
        setC_mercredi(init_days[2]);
        setC_jeudi(init_days[3]);
        setC_vendredi(init_days[4]);
        setC_samedi(init_days[5]);
        setC_dimanche(init_days[6]);
        setActivite(initial_acti);
        setBtnLabel("Edit");
    }

    return (
        <>
            <ListItem className="border border-red-400 rounded-lg mb-2 flex flex-col sm:flex-row items-center" key={props.cle} >
                <TextField label="activité" size='small' className='my-2 mr-4 min-w-min bg-orange-100'
                    InputProps={{ readOnly: false }}
                    value={activite}
                    onChange={(val) => {
                        val.preventDefault();
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
                {(btnLabel === "Edit") ? null : <div className='flex flex-row mt-3'>
                    <Button variant='outlined' className='ml-4'
                        onClick={saveNewData}
                    >{btnLabel}</Button>
                    <Button variant='outlined' className='ml-4'
                        onClick={resetData}
                    >{"Reset"}</Button>

                </div>
                }
            </ListItem>
        </>
    )
}

export default Ligne;