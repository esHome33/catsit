

import TableActivites from "@/components/tableactivites";
import { Donnees } from "@/types/data";
import { Container, Typography } from "@mui/material";



const Page = () => {

    const datas: Donnees = [
        {
            id: 1,
            activite: "croquettes",
            days: [true, true, false, false, false, false, true],
            done: [false, false, false, false, false, false, false],
            photo: ""
        },
        {
            id: 2,
            activite: "smilla",
            days: [true, true, true, true, true, true, true],
            done: [false, false, false, false, false, false, false],
            photo: ""
        }

    ]

    return (
        <>
            <Container className="flex flex-col items-start">
                <div className="bg-[#f0ee5a] mb-4 rounded-lg px-4 py-2">
                    <Typography variant="h6" fontWeight={"bold"} className="text-orange-900">PAGE PROPRIETAIRE</Typography>
                </div>
                <TableActivites datas={datas} />
            </Container>

        </>
    )
}

export default Page;