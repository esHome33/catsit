

import TableActivites from "@/components/tableactivites";
import { Donnees } from "@/types/data";
import { Database } from "@/types/supabase";
import { Container, Typography } from "@mui/material";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


const Page = async () => {
    const ckstore = cookies();
    const supabase = createServerComponentClient<Database>({ cookies: () => ckstore });
    const { data: data } = await supabase.from("actions").select();
    const donnees = data as Donnees;
    

    return (
        <>
            <Container className="flex flex-col items-start">
                <div className="bg-[#f0ee5a] mb-4 rounded-lg px-4 py-2">
                    <Typography variant="h6" fontWeight={"bold"} className="text-orange-900">PAGE PROPRIETAIRE</Typography>
                </div>
                <TableActivites datas={donnees} />
            </Container>

        </>
    )
}

export default Page;