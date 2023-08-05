
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
      <Image alt="Mon beau Chat Mathilda" src="/intro.jpg" width={"406"} height={"500"} priority={true} />
      <Typography variant="body2" className="justify-items-center">
        Photo de <Link href="https://github.com/XNxa/">
          Xavier</Link> sur IPhone 😉
      </Typography>

    </Container>
  );
}
