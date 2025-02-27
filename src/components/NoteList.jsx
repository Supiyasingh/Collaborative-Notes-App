import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNotes, deleteNote } from "../redux/actions";

const NotesList = () => {
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <div>
      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => dispatch(deleteNote(note.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
