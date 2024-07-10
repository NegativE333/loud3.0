import { create } from "zustand";

type Props = {
    isExpanded: boolean;
    setExpanded: () => void;
}

export const useExpand = create<Props>((set, get) => ({
    isExpanded: false,
    setExpanded: () => set((state) => ({isExpanded : !state.isExpanded}))
})) 