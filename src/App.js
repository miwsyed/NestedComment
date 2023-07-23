import { useState } from "react";
import "./styles.css";
import { SetGlobaComments, UseGlobaComments } from "./Context/CommentsWrapper";
import { ADD_COMMENT } from "./constants/Actions";
import Comments from "./components/Comments";

export default function App() {
  const [value, setValue] = useState("");
  const dispatch = SetGlobaComments();
  const globalComments = UseGlobaComments();
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };
  const handleAddTopComment = () => {
    if (value.length < 1) return;
    const payLoad = {
      id: new Date().getTime(),
      value,
      hasParent: false,
      hasNestedComments: false,
      comments: [],
    };
    dispatch({ type: ADD_COMMENT, payLoad });
    setValue("");
  };

  return (
    <div className="App">
      <input
        type="text"
        value={value}
        placeholder="add comment"
        onChange={handleOnChange}
        onKeyDown={(e) => e.key === "Enter" && handleAddTopComment()}
      />
      <button onClick={handleAddTopComment}>Comment</button>
      {globalComments?.length > 0 ? (
        <>
          {globalComments.map((comment) => {
            const id = comment.id;
            return (
              <div key={id}>
                <Comments comment={comment} />{" "}
              </div>
            );
          })}
        </>
      ) : (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <h2>Add some comments</h2>
        </div>
      )}
    </div>
  );
}
