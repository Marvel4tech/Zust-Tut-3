import { useState } from "react"
import { BiNote } from "react-icons/bi"
import useNoteStore from "../store/useStore"
import { v4 } from "uuid"
import { BsTrash } from "react-icons/bs"
import { BiEdit } from "react-icons/bi"

const NoteApp = () => {
    const { notes, addNotes, deleteNote } = useNoteStore()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const handleAddNewNote = (e) => {
        e.preventDefault();
        const newNote = { id: v4(), title, body };
        addNotes(newNote);
        setTitle('');
        setBody('');
    }

    const handleDeleteNote = (id) => {
       deleteNote(id);
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
                        required
                    />
                    <textarea
                        placeholder=" Jot down your idea..."
                        className=" w-full px-5 bg-transparent border-b border-gray-400 outline-none resize-none mt-6 "
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                    <button type="submit" className=" hover:bg-green-600 transition-all duration-300 bg-green-500 px-6 py-2 rounded-md 
                    font-bold shadow-2xl shadow-black">
                        Save
                    </button>
                </form>
            </div>
            {notes.length > 0 ? (<div className=" border border-white p-5 ">
                <ul className=" break-words grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                    {notes.map((note) => (
                        <li key={note.id} className=" flex flex-col bg-blue-950 border border-blue-500 shadow-inner shadow-blue-500 h-52 p-4">
                            <div>
                                <h2 className=" text-lg font-bold mb-2">{note.title}</h2>
                                <p className=" ">{note.body}</p>
                            </div>
                            <span className=" mt-auto flex justify-between gap-2">
                                <button className=" flex items-center justify-center bg-slate-500 hover:bg-slate-600 rounded-sm
                                text-white flex-1">
                                    <BiEdit/>
                                </button>
                                <button className=" flex items-center justify-center bg-red-500 hover:bg-red-600 text-white 
                                py-2 flex-1 rounded-sm" onClick={() => handleDeleteNote(note.id)}>
                                    <BsTrash className=" " />
                                </button>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>) : (<p className=" text-center italic text-xl">List is Empty, Add New Note</p>) }
        </div>
    </div>
  )
}

export default NoteApp