import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 } from "uuid";

const useNoteStore = create(
    persist(
        (set) => ({
            notes: [],
            currentNote: null,
            addNotes: (addNote) => set((state) => ({ notes: [...state.notes, 
                {id: v4(), 
                 title: addNote.title, 
                 body: addNote.body,
                 createdAt: new Date().toLocaleDateString(),
                }]
            })),
            deleteNote: (id) => set((state) => ({
                notes: state.notes.filter((note) => note.id !== id)
            })),
            editNote: (id, updatedNote) => set((state) => ({
                notes: state.notes.map((note) => note.id === id ? {...note, ...updatedNote} : note)
            })),
            setCurrentNote: (note) => set({ currentNote: note })
        })
    )
)

export default useNoteStore;

//editNote: (id, title, body) => set((state) => ({
    //notes: state.notes.map((note) => note.id === id ? {id, title, body} : note)
//})),