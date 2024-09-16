import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 } from "uuid";

const useNoteStore = create(
    persist(
        (set) => ({
            notes: [{id: v4() , title: "London 2025", body: " Planning for my London travel next year"},
                {id: v4(), title: "York St John", body: " Welcome to school"},
                {id: v4(), title: "Digital Marketing", body: " Learn about photography in the first semester"},
                {id: v4(), title: "YouTuber", body: " New Camera FX30 with sigma 16 mm lens"}
            ],
            addNotes: (addNote) => set((state) => ({ notes: [...state.notes, 
                {id: v4(), title: addNote.title, body: addNote.body}]
            })),
        })
    )
)

export default useNoteStore;