import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 } from "uuid";

const useNoteStore = create(
    persist(
        (set) => ({
            notes: [],
            addNotes: (addNote) => set((state) => ({ notes: [...state.notes, 
                {id: v4(), title: addNote.title, body: addNote.body}]
            })),
            deleteNote: (id) => set((state) => ({
                notes: state.notes.filter((note) => note.id !== id)
            })),
        })
    )
)

export default useNoteStore;

//deleteNote: (id) => set((state) => ({ notes: state.notes.filter((
   // note
    //) => note.id !== id)})),