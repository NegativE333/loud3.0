import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

type LyricLine = {
  time: number;
  text: string;
};

export const parseLRC = (lrc : string) : LyricLine[] => {
  const lines = lrc.split('\n');
    const lyrics: LyricLine[] = [];
  
    lines.forEach(line => {
      const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
      if (match) {
        const minutes = parseInt(match[1], 10);
        const seconds = parseFloat(match[2]);
        const text = match[3].trim();
        const time = minutes * 60 + seconds;
        lyrics.push({ time, text });
      }
    });
  
    return lyrics;
}