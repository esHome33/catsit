"use client";

import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ListeActions from './listeactions';

type Props = {}

const DateJour = (props: Props) => {
    const [today, setToday] = useState(new Date);
    const [nomjour, setNomjour] = useState("");

    const getNomDay = (une_date: Date) => {
        const day = une_date.getDay();
        if (day === 1) {
            return "lundi";
        }
        if (day === 2) {
            return "mardi";
        }
        if (day === 3) {
            return "mercredi";
        }
        if (day === 4) {
            return "jeudi";
        }
        if (day === 5) {
            return "vendredi";
        }
        if (day === 6) {
            return "samedi";
        }
        if (day === 0) {
            return "Dimanche";
        }
        return "jour_" + day;
    }



    useEffect(() => {
        const auj = new Date;
        const nom = getNomDay(auj);
        setNomjour(nom);
        setToday(auj);
    }, []);

    return (
        <div>
            <div>
                <Typography variant="body1" className="text-blue-900">Nous sommes {nomjour} {today.toLocaleDateString()}</Typography>
            </div>
            <ListeActions jour={today.getDay()} />
        </div>
    )
}

export default DateJour;