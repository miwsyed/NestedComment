import { createContext, useContext, useEffect, useReducer } from "react";
import { Reducer } from "./Reducer";
import { defaultComments } from "../Helper/defaultComments";

const GlobalComments = createContext();
const AccessGlobalComments = createContext();

export const CommentsWrapper = ({ children }) => {
  const [comments, setComments] = useReducer(Reducer, defaultComments, () => {
    const persistedState = JSON.parse(localStorage.getItem("comments")) || [];
    return persistedState ?? [];
  });

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  return (
    <>
      <GlobalComments.Provider value={setComments}>
        <AccessGlobalComments.Provider value={comments}>
          {children}
        </AccessGlobalComments.Provider>
      </GlobalComments.Provider>
    </>
  );
};
export const SetGlobaComments = () => useContext(GlobalComments);
export const UseGlobaComments = () => useContext(AccessGlobalComments);
