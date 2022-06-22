import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
// import { fetchUsers } from "../src/features/ActionCreater";
// import { userSlice } from "../src/features/UserSlice";
import PostContainer from "./components/PostContainer";
import "./App.css";

function App() {
  // const dispatch = useAppDispatch();
  // const { users, isLoading, error } = useAppSelector(
  //   (state) => state.userReducer
  // );

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, []);

  return (
    <div className="App">
      {/* {isLoading && <h1>Heil Hitler!</h1>}
      {error && <h1>{error}</h1>}
      {JSON.stringify(users, null, 2)} */}
      <PostContainer />
    </div>
  );
}

export default App;
