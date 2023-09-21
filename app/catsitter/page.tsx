
import ListeActions from "@/components/listeactions";
import { getNomDay } from "@/lib/days";
import { Container, Typography } from "@mui/material";


const Page = () => {

    const auj = new Date;
    const nom = getNomDay(auj);

    return (
        <>
            <Container className="flex flex-col items-start">
                <div className="bg-[#f0a05a] mb-4 rounded-lg px-4 py-2">
                    <Typography variant="h6" fontWeight={"bold"} className="text-orange-50">PAGE CATSITTER</Typography>
                </div>
                <Typography variant="body1" className="text-blue-900">Nous sommes {nom} {auj.toLocaleDateString()}</Typography>
                <ListeActions jour={auj.getDay()} />
            </Container>
        </>
    )
}

export default Page;