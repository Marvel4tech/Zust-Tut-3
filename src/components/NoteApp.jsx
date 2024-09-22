import { useState } from "react"
import { BiNote } from "react-icons/bi"
import useNoteStore from "../store/useStore"
import { v4 } from "uuid"
import { BsTrash } from "react-icons/bs"
import { BiEdit } from "react-icons/bi"
import { FaTimes } from "react-icons/fa"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.bubble.css';
import DOMPurify from "dompurify"

const NoteApp = () => {
    const { notes, addNotes, deleteNote, editNote, setCurrentNote } = useNoteStore()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null)
    const [openPostModal, setOpenPostModal] = useState(false)

    // Handle functions
    const handleAddNewNote = (e) => {
        e.preventDefault();
        const newNote = { id: v4(),
                          title, 
                          body, 
                        };
        addNotes(newNote);
        setTitle('');
        setBody('');
    }

    const handleDeleteNote = (id) => {
       deleteNote(id);
    }

    const handleModal = (note) => {
        setOpenModal(!openModal)
        setSelectedNote(note)
    }

    const handlePostModal = (note) => {
        setCurrentNote(note)
        setOpenPostModal(!openPostModal)
    }

    // Custom details for React Quills Text Editor - font, size, color, bg-color, and align options
    const fontOptions = [
        { label: 'Sans Serif', value: 'sans-serif'},
        { label: 'Serif', value: 'serif'},
        { label: 'Monospace', value: 'monospace'},
        { label: 'Courier New', value: 'Courier New'},
    ]

    const sizeOptions = [
        { label: 'Small', value: 'small' },
        { label: 'Normal', value: 'false' },
        { label: 'Large', value: 'large' },
        { label: 'Huge', value: 'huge' },
    ]

    const colorOptions = [
        { label: 'Red', value: 'red' },
        { label: 'Green', value: 'green' },
        { label: 'Blue', value: 'blue' },
        { label: 'Yellow', value: 'yellow' },
        { label: 'Custom', value: '#000000' }
    ]

    const backgroundColorOptions = [
        { label: 'White', value: 'white' },
        { label: 'Black', value: 'black' },
        { label: 'Red', value: 'red' },
        { label: 'Green', value: 'green' },
        { label: 'Blue', value: 'blue' },
        { label: 'Yellow', value: 'yellow' },
        { label: 'Transparent', value: 'transparent'},
        { label: 'Custom', value: '#ffffff' }
    ]

    const alignOptions = [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
        { label: 'Justify', value: 'justify' },
    ]

    // Toolbar configurations
    const modules = {
        toolbar: [
            [{ 'font': fontOptions.map(font => font.value) }, {'size': sizeOptions.map(size => size.value) }],
            [{ 'header': '1' }, { 'header': '2' }, { 'header': [3, 4, 5, 6] }, {'header': false }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': colorOptions.map(color => color.value) }, { 'background': backgroundColorOptions
                .map(backgroundColor => backgroundColor.value) }
            ],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'align': alignOptions.map(align => align.value) }],
            ['link', 'image'],
            ['clean'],
        ],
    };

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
                    <ReactQuill
                        theme="bubble"
                        modules={modules}
                        placeholder=" Jot down your idea..."
                        value={body}
                        onChange={setBody}
                        required
                        className=" border-b border-gray-400 mb-3 mt-6 text-white"
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
                        <li key={note.id} className=" flex flex-col bg-white dark:bg-blue-950 border border-blue-500 shadow-inner
                        shadow-blue-500 min-h-52 p-4">
                            <div onClick={() => handlePostModal(note)} >
                                <h2 className=" text-lg font-bold mb-3">{note.title}</h2>
                                {note.body && <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.body.slice(0, 200)) }} className=" mb-[6px]" /> }
                                <div className=" flex mb-6 justify-between">
                                    <span className=" text-xs bg-green-700 px-1 py-1 cursor-pointer">Read more</span>
                                    <p className=" text-gray-400 px-1 py-1 text-xs italic">{note.createdAt}</p>
                                </div>
                            </div>
                            <span className=" mt-auto flex justify-between gap-2">
                                <button className=" flex items-center justify-center bg-slate-500 hover:bg-slate-600 rounded-sm
                                text-white flex-1" onClick={() => handleModal(note)}>
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
            </div>) : (<p className=" text-center italic text-xl">List is Empty, Add Note</p>) }
        </div> 
        {openModal && 
            <Modal setOpenModal={setOpenModal} 
                    note={selectedNote} 
                    onSave={(updatedNote) => editNote(selectedNote.id, updatedNote)} 
            /> 
        }
        {openPostModal && <PostModal setOpenPostModal={setOpenPostModal} />}
    </div>
  )
}

export default NoteApp


const Modal = ({ setOpenModal, note, onSave }) => {
    const [title, setTitle] = useState(note.title);
    const [body, setBody] = useState(note.body);

    const handleUpdate = () => {
        onSave({title, body})
        setOpenModal(false)
    }

    // Custom details for React Quills Text Editor - font, size, color, bg-color, and align options
    const fontOptions = [
        { label: 'Sans Serif', value: 'sans-serif'},
        { label: 'Serif', value: 'serif'},
        { label: 'Monospace', value: 'monospace'},
        { label: 'Courier New', value: 'Courier New'},
    ]

    const sizeOptions = [
        { label: 'Small', value: 'small' },
        { label: 'Normal', value: 'false' },
        { label: 'Large', value: 'large' },
        { label: 'Huge', value: 'huge' },
    ]

    const colorOptions = [
        { label: 'Red', value: 'red' },
        { label: 'Green', value: 'green' },
        { label: 'Blue', value: 'blue' },
        { label: 'Yellow', value: 'yellow' },
        { label: 'Custom', value: '#000000' }
    ]

    const backgroundColorOptions = [
        { label: 'White', value: 'white' },
        { label: 'Black', value: 'black' },
        { label: 'Red', value: 'red' },
        { label: 'Green', value: 'green' },
        { label: 'Blue', value: 'blue' },
        { label: 'Yellow', value: 'yellow' },
        { label: 'Transparent', value: 'transparent'},
        { label: 'Custom', value: '#ffffff' }
    ]

    const alignOptions = [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
        { label: 'Justify', value: 'justify' },
    ]

    // Toolbar configurations
    const modules = {
        toolbar: [
            [{ 'font': fontOptions.map(font => font.value) }, {'size': sizeOptions.map(size => size.value) }],
            [{ 'header': '1' }, { 'header': '2' }, { 'header': [3, 4, 5, 6] }, {'header': false }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': colorOptions.map(color => color.value) }, { 'background': backgroundColorOptions
                .map(backgroundColor => backgroundColor.value) }
            ],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'align': alignOptions.map(align => align.value) }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    return (
        <div className=" bg-blue-800/80 fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center">
            <div className=" bg-white w-full h-2/3 md:w-3/4 md:h-2/3 lg:w-2/3 rounded-md shadow-lg shadow-blue-950 px-10 py-5">
                <div className=" flex flex-col">
                    <button onClick={() => setOpenModal(false)} className=" self-end">
                        <FaTimes className=" text-black text-2xl p-1 border border-black rounded-full" />
                    </button>
                    <form className=" mt-10">
                        <input
                            className=" text-black w-full px-5 pb-2 bg-transparent border-b border-gray-400 outline-none"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <ReactQuill
                            theme="bubble"
                            modules={modules}
                            placeholder=" Jot down your idea..."
                            value={body}
                            onChange={setBody}
                            required
                            className=" text-black w-full px-5 py-2 bg-transparent border border-gray-400 outline-none resize-none h-52 
                            mt-6 "
                        />
                        {/*<textarea
                            className=" text-black w-full px-5 py-2 bg-transparent border border-gray-400 outline-none resize-none h-52 
                            mt-6 "
                            required
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />*/}
                    </form>
                    <div className=" mt-5 space-x-2">
                        <button onClick={() => setOpenModal(false)} className=" text-black">Cancel</button>
                        <button onClick={handleUpdate} className=" bg-green-500 hover:bg-green-600 py-1 px-3 font-semibold rounded-md">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


const PostModal = ({ setOpenPostModal }) => {
    const { currentNote } = useNoteStore()

    const sanitizedBody = DOMPurify.sanitize(currentNote.body);

    return(
        <div className=" bg-blue-800/80 fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center">
            <div className=" bg-white w-full h-[66%] md:w-3/4 lg:w-2/3 rounded-md shadow-lg shadow-blue-950 px-10 py-5 overflow-y-scroll">
                <div className=" flex flex-col">
                    <button onClick={() => setOpenPostModal(false)} className=" self-end">
                        <FaTimes className=" text-black text-2xl p-1 border border-black rounded-full mb-10" />
                    </button>
                    <h2 className=" text-black text-3xl font-bold mb-5">{currentNote.title}</h2>
                    <p dangerouslySetInnerHTML={{__html: sanitizedBody}} className=" text-black" />
                </div>
            </div>
        </div>
    )
}