"use client";

import { AppBar, Avatar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react'


const MyToolbar = () => {
    const router = useRouter();
    const goto = (where: string) => {
        router.push(where);
    };
    return (
        <AppBar>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => goto("/")}
                    >
                        <Avatar alt="Menu" src="/logo.png" />
                    </IconButton>
                    <Button
                        sx={{ mr: 2, backgroundColor: "green", color: "white" }}
                        onClick={() => goto("catsitter")}
                    >
                        <Typography>CatSitter</Typography>
                    </Button>
                    <Button
                        sx={{ mr: 2, backgroundColor: "blue", color: "white" }}
                        onClick={() => goto("owner")}
                    >
                        <Typography>Proprietaire</Typography>
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>

    )
}

export default MyToolbar;