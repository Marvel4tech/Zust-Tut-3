import { create } from "zustand";
import { persist } from "zustand/middleware";

const useNoteStore = create(
    persist(
        (set) => ({
            notes: [{id:1, title: "London 2025", body: " Planning for my London travel next year"},
                {id:2, title: "York St Johh", body: " Welcome to school"},
                {id:3, title: "Digital Marketing", body: " Learn about photography in the first semester"},
                {id:4, title: "YouTuber", body: " New Camera FX30 with sigma 16 mm lens"}
            ],
            addNotes: (addNote) => set((state) => ({ notes: [...state.notes,
                {id:state.notes.length+1, title: addNote.title, body: addNote.body}]
            })),
        })
    )
)

export default useNoteStore;

//addNote: (note) => set((state) => ({ notes: [...state.notes,
//{id:state.notes.length+1, title: note.title, body: note.body}]
//})),