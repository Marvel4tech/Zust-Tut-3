import { useState } from "react"
import { BiNote } from "react-icons/bi"
import useNoteStore from "../store/useStore"

const NoteApp = () => {
    const { notes, addNotes } = useNoteStore()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const handleAddNewNote = (e) => {
        e.preventDefault()
        
    }

  return (
    <div className=" max-w-6xl mx-auto">
        <div className=" flex flex-col space-y-10">
            <div className=" flex justify-between">
                <h2 className=" text-xl font-bold">NoteApp + Zustand/middleware</h2>
                <BiNote className=" text-4xl" />
            </div>
            <div className=" mt-2 mb-4">
                <form className="" onSubmit={handleAddNewNote}>
                    <input
                        placeholder=" What's your note title?"
                        className=" w-full px-5 pb-2 bg-transparent border-b border-gray-400 outline-none"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder=" Jot down your idea..."
                        className=" w-full px-5 bg-transparent border-b border-gray-400 outline-none resize-none mt-6 "
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <button type="submit" className=" hover:bg-green-600 transition-all duration-300 bg-green-500 px-6 py-2 rounded-md 
                    font-bold shadow-2xl shadow-black">
                        Save
                    </button>
                </form>
            </div>
            <div className=" border border-white p-5 ">
                <ul className=" break-words grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                    {notes.map((note) => (
                        <li key={note.id} className=" bg-blue-950 border border-blue-500 shadow-inner shadow-blue-500 h-52 p-4">
                            <h2 className=" text-lg font-bold mb-2">{note.title}</h2>
                            <h2 className=" ">{note.body}</h2>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default NoteApp