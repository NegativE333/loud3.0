"use client";

import React, { useState, useEffect } from 'react';

type LyricLine = {
    time: number;
    text: string;
};

interface LiveLyricsProps {
  lyrics: LyricLine[];
  currentTime: number;
}

const LiveLyrics: React.FC<LiveLyricsProps> = ({ lyrics, currentTime }) => {
  const [currentLine, setCurrentLine] = useState<string>('');

  useEffect(() => {
    const current = lyrics.find(line => line.time+1 >= currentTime);
    if (current) {
      setCurrentLine(current.text);
    }
  }, [currentTime, lyrics]);

  return (
    <p className="truncate text-center">
      {currentLine}
    </p>
  );
};

export default LiveLyrics;
