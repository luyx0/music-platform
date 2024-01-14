import React, {useState} from 'react';
import {ITrack} from "@/types/track";
import MainLayout from "@/layouts/MainLayout";
import {Button, Grid, TextField} from "@mui/material";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import axios from "axios";
import {useInput} from "@/hooks/useInput";

const TrackPage = ({serverTrack}:any) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter()
    const username = useInput('')
    const text = useInput('')


    const addComment = async () => {
        try{
            const response = await axios.post('http://localhost:5000/tracks/comment', {
                username: username.value,
                text: text.value,
                trackId: track._id
            })
            setTrack({...track, comments: [...track.comments, response.data]})
        }catch (e){
            console.log(e)
        }

    }

    return (
        <MainLayout
            title={"Music platform - " + track.name + " - " + track.artist}
            keywords={"Music, artists, tracks " + track.name + " , " + track.artist}
        >
            <Button
                variant={"outlined"}
                style={{fontSize: 32}}
                onClick={() => router.push("/tracks")}
            >
                At List
            </Button>
            <Grid container style={{margin : '20px 0'}}>
                <img src={'http://localhost:5000/' + track.picture} width={200} height={200}/>
                <div style={{marginLeft : '30'}}>
                    <h1>Track name - {track.name}</h1>
                    <h1>Artist - {track.artist}</h1>
                    <h1>Listens - {track.listens}</h1>
                </div>
            </Grid>
            <h1>Lyrics to the track</h1>
            <p>{track.text}</p>
            <h1>Comments</h1>
            <Grid container>

                <TextField
                    label="Your name"
                    {...username}
                    fullWidth
                />
                <TextField
                    label="Comment"
                    {...text}
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button onClick={addComment}>Send</Button>
            </Grid>

            <div>
                {track.comments.map(comment =>
                    <div>
                        <div>Author - {comment.username}</div>
                        <div>Comment - {comment.text}</div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    if (!params || !params.id) {
        return {
            notFound: true,
        };
    }

    const response = await axios.get('http://localhost:5000/tracks/' + params.id);

    return {
        props: {
            serverTrack: response.data,
        },
    };
};