import React, {useEffect, useRef} from 'react';
import IconButton from "@mui/material/IconButton";
import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";
import styles from '@/styles/Player.module.scss'
import {Grid} from "@mui/material";
import TrackProgress from "@/components/TrackProgress";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";


const Player = () => {
    const {pause, volume, active, duration, currentTime} = useTypedSelector(state => state.player)
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setActiveTrack, setDuration} = useActions()
    const audio = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audio.current) {
            audio.current = new Audio();
        }else{
            setAudio()
            play()
        }
        audio.current?.addEventListener('ended', pauseTrack);
    }, [active]);

    const setAudio = () => {
        if(active  && audio.current){
            audio.current.src = 'http://localhost:5000/' + active.audio
            audio.current.volume = volume / 100;
            audio.current.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.current?.duration || 0))
            }
            audio.current.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.current?.currentTime || 0 ))
            }
        }
    }

    const play = () => {
        if (pause) {
            playTrack();
            audio.current?.play();
        } else {
            pauseTrack();
            audio.current?.pause();
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audio.current) {
            audio.current.volume = Number(e.target.value) / 100;
            setVolume(Number(e.target.value));
        }
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audio.current) {
            audio.current.currentTime = Number(e.target.value);
            setCurrentTime(Number(e.target.value));
        }
    }

    if(!active){
        return null
    }

    return (
        <div className={styles.player}>
            <IconButton onClick={play}>
                {pause
                    ? <PlayArrow />
                    : <Pause />
                }
            </IconButton>
            <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
                <div>{active?.name}</div>
                <div style={{ fontSize: 12, color: 'gray' }}>{active?.artist}</div>
            </Grid>
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
            <VolumeUp style={{ marginLeft: 'auto' }} />
            <TrackProgress left={volume} right={100} onChange={changeVolume} />
        </div>
    );
};

export default Player;