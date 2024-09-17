import { useState } from "react"
import { BiNote } from "react-icons/bi"
import useNoteStore from "../store/useStore"
import { v4 } from "uuid"
import { BsTrash } from "react-icons/bs"
import { BiEdit } from "react-icons/bi"
import { FaTimes } from "react-icons/fa"


const NoteApp = () => {
    const { notes, addNotes, deleteNote, editNote } = useNoteStore()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [editingNote, setEditingNote] = useState(null)

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

    const handleModal = (note) => {
        setOpenModal(!openModal)
        setEditingNote(note)
    }

    const handleEditNote = (id, title, body) => {
        editingNote(id, title, body)
    }

  return (
    <div className=" max-w-6xl mx-auto relative">
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
                        <li key={note.id} className=" flex flex-col bg-blue-950 border border-blue-500 shadow-inner shadow-blue-500 h-52 
                        p-4">
                            <div>
                                <h2 className=" text-lg font-bold mb-2">{note.title}</h2>
                                <p className=" ">{note.body}</p>
                            </div>
                            <span className=" mt-auto flex justify-between gap-2">
                                <button className=" flex items-center justify-center bg-slate-500 hover:bg-slate-600 rounded-sm
                                text-white flex-1" onClick={handleModal}>
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
        {openModal && <Modal setOpenModal={setOpenModal} editingNote={editingNote} handleEditNote={handleEditNote} /> }
    </div>
  )
}

export default NoteApp


const Modal = ({ setOpenModal, editingNote, handleEditNote }) => {
    const [title, setTitle] = useState()
    const [body, setBody] = useState()

    return (
        <div className=" bg-blue-800/80 fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center">
            <div className=" bg-white w-full h-2/3 md:w-3/4 md:h-2/3 lg:w-2/3 rounded-md shadow-lg shadow-blue-950 p-10">
                <div className=" flex flex-col">
                    <button onClick={() => setOpenModal(false)} className=" self-end">
                        <FaTimes className=" text-black text-4xl p-2 border border-black rounded-full" />
                    </button>
                    <form className=" mt-10">
                        <input
                            className=" text-black w-full px-5 pb-2 bg-transparent border-b border-gray-400 outline-none"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            className=" text-black w-full px-5 py-2 bg-transparent border border-gray-400 outline-none resize-none h-52 
                            mt-6 "
                            required
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </form>
                    <div className=" mt-5 space-x-2">
                        <button onClick={() => setOpenModal(false)} className=" text-black">Cancel</button>
                        <button className=" bg-green-500 hover:bg-green-600 py-1 px-3 font-semibold rounded-md">Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}