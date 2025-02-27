const initialState = {
    notes: [],
    loading: false,
    error: null
  };
  
  export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_NOTES_REQUEST":
        return { ...state, loading: true };
      case "FETCH_NOTES_SUCCESS":
        return { ...state, notes: action.payload, loading: false };
      case "FETCH_NOTES_FAILURE":
        return { ...state, error: action.payload, loading: false };
      case "ADD_NOTE":
        return { ...state, notes: [...state.notes, action.payload] };
      case "UPDATE_NOTE":
        return {
          ...state,
          notes: state.notes.map((note) =>
            note.id === action.payload.id ? { ...note, ...action.payload.updatedData } : note
          )
        };
      case "DELETE_NOTE":
        return { ...state, notes: state.notes.filter((note) => note.id !== action.payload) };
      default:
        return state;
    }
  };
  