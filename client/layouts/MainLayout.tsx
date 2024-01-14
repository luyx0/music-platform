import React, { ReactNode } from 'react';
import Navbar from "@/components/Navbar";
import {Container} from "@mui/material";
import Player from "@/components/Player";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {reducer} from "@/store/reducers";
import Head from "next/head";

interface MainLayoutProps {
    title?:string;
    description?:string;
    keywords?:string;
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description, keywords }) => {
    const store = configureStore({reducer});
    return (
        <Provider store={store}>
            <Head>
                <title>{title || 'Music platform'}</title>
                <meta name="description" content={`Music platform. Tracks.` + description}/>
                <meta name="robots" content="index, follow"/>
                <meta name="keywords" content={keywords || "Music platform, Tracks, Artist"}/>
            </Head>
            <Navbar />
            <Container style={{ margin: '90px 0' }}>
                {children}
            </Container>
            <Player/>
        </Provider>
    );

};


export default MainLayout;