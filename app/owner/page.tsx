

import Mytable from "@/components/mytable";
import { Container, Typography } from "@mui/material";


const Page = () => {



    return (
        <>
            <Container className="flex flex-col items-start">
                <div className="bg-[#f0ee5a] mb-4 rounded-lg p-2">
                    <Typography variant="h6" fontWeight={"bold"} className="text-orange-900">PAGE PROPRIETAIRE</Typography>
                </div>
                <Mytable />
            </Container>

        </>
    )
}

export default Page;