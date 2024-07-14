import { create } from "zustand";

type Props = {
    search: string;
    setSearch: (s: string) => void;
}

export const useSearch = create<Props>((set, get) => ({
    search: "",
    setSearch: (s: string) => set({search: s})
})) 