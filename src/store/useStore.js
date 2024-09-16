import { create } from "zustand";
import { persist } from "zustand/middleware";

const useNoteStore = create(
    persist(
        (set) => ({
            notes: [],
        })
    )
)

export default useNoteStore;