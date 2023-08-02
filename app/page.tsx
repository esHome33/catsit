
"use client";
import { Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {


  const router = useRouter();


  return (
    <Container className="text-center flex flex-col items-center">
      <Typography variant="body2">Cat Sitter Webapp</Typography>
      <Image alt="Mon beau Chat Catsitter" src="/intro.png" width={"389"} height={"600"}/>
      <Typography variant="body2" className="justify-items-center">
        Photo de <Link href="https://unsplash.com/fr/@madhatterzone?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Manja Vitolic</Link> sur <Link href="https://unsplash.com/fr/photos/04_qbR719GU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash</Link>
      </Typography>

    </Container>
  );
}
