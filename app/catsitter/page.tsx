
import DateJour from "@/components/datejour";
import { Container, Typography } from "@mui/material";


const Page = () => {
    return (
        <>
            <Container className="flex flex-col items-start">
                <div className="bg-[#f0a05a] mb-4 rounded-lg px-4 py-2">
                    <Typography variant="h6" fontWeight={"bold"} className="text-orange-50">PAGE CATSITTER</Typography>
                </div>
                <DateJour />
            </Container>
        </>
    )
}

export default Page;