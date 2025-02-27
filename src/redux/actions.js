import { database, auth, provider } from "../firebase/firebaseConfig";
import { ref, push, update, remove, get } from "firebase/database";
import { signInWithPopup, signOut } from "firebase/auth";

/** 🔹 Fetch Notes */
export const fetchNotes = () => async (dispatch) => {
  dispatch({ type: "FETCH_NOTES_REQUEST" });
  try {
    const snapshot = await get(ref(database, "notes"));
    const notes = snapshot.exists() ? snapshot.val() : {};
    dispatch({ type: "FETCH_NOTES_SUCCESS", payload: Object.entries(notes).map(([id, note]) => ({ id, ...note })) });
  } catch (error) {
    dispatch({ type: "FETCH_NOTES_FAILURE", payload: error.message });
  }
};

/** 🔹 Add Note */
export const addNote = (note) => async (dispatch) => {
  const newNoteRef = push(ref(database, "notes"), { ...note, timestamp: Date.now() });
  dispatch({ type: "ADD_NOTE", payload: { id: newNoteRef.key, ...note } });
};

/** 🔹 Update Note */
export const updateNote = (id, updatedData) => async (dispatch) => {
  await update(ref(database, `notes/${id}`), updatedData);
  dispatch({ type: "UPDATE_NOTE", payload: { id, updatedData } });
};

/** 🔹 Delete Note */
export const deleteNote = (id) => async (dispatch) => {
  await remove(ref(database, `notes/${id}`));
  dispatch({ type: "DELETE_NOTE", payload: id });
};

/** 🔹 Google Sign-In */
export const loginUser = () => async (dispatch) => {
  try {
    const result = await signInWithPopup(auth, provider);
    dispatch({ type: "LOGIN_SUCCESS", payload: result.user });
  } catch (error) {
    console.error(error);
  }
};

/** 🔹 Logout */
export const logoutUser = () => async (dispatch) => {
  await signOut(auth);
  dispatch({ type: "LOGOUT" });
};
