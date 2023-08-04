
import ListeActions from "@/components/listeactions";
import { Container, Typography } from "@mui/material";


const Page = () => {

    const auj = new Date;
    
    const getNomDay = () => {
        const day = auj.getDay();
        if (day === 1) {
            return "Lundi";
        }
        if (day === 2) {
            return "Mardi";
        }
        if (day === 3) {
            return "Mercredi";
        }
        if (day === 4) {
            return "Jeudi";
        }
        if (day === 5) {
            return "Vendredi";
        }
        if (day === 6) {
            return "Samedi";
        }
        if (day === 0) {
            return "Dimanche";
        }
        return "jour_" + day;
    }

    const today = getNomDay();

    return (
        <>
            <Container className="flex flex-col items-start">
                <div className="bg-[#f0a05a] mb-4 rounded-lg px-4 py-2">
                    <Typography variant="h6" fontWeight={"bold"} className="text-orange-50">PAGE CATSITTER</Typography>
                </div>
                <div>
                    <Typography variant="body1">Nous sommes {today} ({auj.toLocaleDateString()})</Typography>
                </div> 
                <ListeActions jour={new Date("08/07/2023").getDay()} />
            </Container>

        </>
    )
}

export default Page;