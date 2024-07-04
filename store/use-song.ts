import create from 'zustand';
import { songsData } from '@/lib/sanity-data-type';

type Props = {
    song: songsData | null;
    updateSong: (newSong: songsData) => void;
    pause: boolean;
    togglePause: () => void;
    playNextSong: () => void;
    playPrevSong: () => void;
    songsList: songsData[];
    setSongsList: (songs: songsData[]) => void;
};

export const useSong = create<Props>((set, get) => ({
    song: null,
    updateSong: (newSong: songsData) => {
        set({ song: newSong, pause: false });
    },
    pause: false,
    togglePause: () => set((state) => ({ pause: !state.pause })),
    playNextSong: () => {
        const { song, songsList, updateSong } = get();
        if (song && songsList.length > 0) {
            const currentIndex = songsList.findIndex(s => s.currentSlug === song.currentSlug);
            const nextIndex = (currentIndex + 1) % songsList.length;
            updateSong(songsList[nextIndex]);
        }
    },
    playPrevSong: () => {
        const { song, songsList, updateSong } = get();
        if (song && songsList.length > 0) {
            const currentIndex = songsList.findIndex(s => s.currentSlug === song.currentSlug);
            const prevIndex = currentIndex === 0 ? songsList.length - 1 : currentIndex - 1;
            updateSong(songsList[prevIndex]);
        }
    },
    songsList: [],
    setSongsList: (songs: songsData[]) => set({ songsList: songs })
}));
