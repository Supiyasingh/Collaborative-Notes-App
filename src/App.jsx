import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from "./redux/actions";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NoteList";
import "./App.css"; 
import "./index.css"; 
const App = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div>
      {user ? (
        <>
          <button onClick={() => dispatch(logoutUser())}>Logout</button>
          <NoteForm />
          <NotesList />
        </>
      ) : (
        <button onClick={() => dispatch(loginUser())}>Sign in with Google</button>
      )}
    </div>
  );
};

export default App;
