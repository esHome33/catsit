
import { Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  const index = getRandomInt(6);
  const nom_image = (index === 0) ? '/intro.jpg' : `/intro${index}.jpg`;

  return (
    <Container className="text-center flex flex-col items-center">
      <Typography variant="body2">Cat Sitter Webapp</Typography>
      <Image alt="ma belle petite Mathilda" src={nom_image} width={'300'} height={"400"} priority />
      <Typography variant="body2" className="justify-items-center">
        Photo de <Link href="https://github.com/XNxa/" className="underline text-blue-700">
          Xavier</Link> sur IPhone 😉
      </Typography>
    </Container>
  );
}
