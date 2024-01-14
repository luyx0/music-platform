import React, { useState } from 'react';
import { ITrack } from "@/types/track";
import { Box, Grid } from "@mui/material";
import TrackItem from "@/components/TrackItem";

interface TrackListProps {
    tracks: ITrack[];
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
    const [trackList, setTrackList] = useState(tracks);

    const handleDelete = (trackId: string) => {
        setTrackList(prevTracks => prevTracks.filter(track => track._id !== trackId));
    }

    return (
        <Grid container direction="column">
            <Box p={2}>
                {trackList.map(track =>
                    <TrackItem
                        key={track._id}
                        track={track}
                        onDelete={handleDelete}
                    />
                )}
            </Box>
        </Grid>
    );
};

export default TrackList;