import React, { useState } from 'react';
import { ITrack } from "@/types/track";
import { Card, Grid } from '@mui/material';
import styles from '../styles/TrackItem.module.scss';
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import { useActions } from "@/hooks/useActions";
import axios from 'axios';

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
    onDelete: (trackId: string) => void;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false, onDelete }) => {
    const router = useRouter();
    const { playTrack, pauseTrack, setActiveTrack } = useActions();
    const [isDeleting, setIsDeleting] = useState(false);

    const play = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setActiveTrack(track);
        playTrack();
    }

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        try {
            setIsDeleting(true);
            await axios.delete(`http://localhost:5000/tracks/${track._id}`);
            onDelete(track._id);
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton onClick={play}>
                {active
                    ? <Pause />
                    : <PlayArrow />
                }
            </IconButton>
            <img width={70} height={70} src={'http://localhost:5000/' + track.picture} />
            <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
                <div>{track.name}</div>
                <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
            </Grid>
            <IconButton
                onClick={handleDelete}
                style={{ margin: "auto" }}
                disabled={isDeleting}
            >
                <Delete />
            </IconButton>
        </Card>
    );
};

export default TrackItem;