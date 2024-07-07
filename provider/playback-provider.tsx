import { songsData } from '@/lib/sanity-data-type';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PlaybackContextType {
    isPlaying: boolean;
    togglePlayPause: () => void;
    currentSong: songsData | null;
    setCurrentSong: (song: songsData | null) => void;
}

const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

export const PlaybackProvider = ({ children }: { children: ReactNode }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState<songsData | null>(null);

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    return (
        <PlaybackContext.Provider value={{ isPlaying, togglePlayPause, currentSong, setCurrentSong }}>
            {children}
        </PlaybackContext.Provider>
    );
};

export const usePlayback = () => {
    const context = useContext(PlaybackContext);
    if (context === undefined) {
        throw new Error('usePlayback must be used within a PlaybackProvider');
    }
    return context;
};
