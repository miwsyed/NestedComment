import { useState } from "react";
import {
  ADD_COMMENT,
  REMOVE_COMMENT,
  EDIT_COMMENT,
} from "../constants/Actions";
import { SetGlobaComments } from "../Context/CommentsWrapper";
const Comments = ({ comment }) => {
  const dispatch = SetGlobaComments();
  const [nestedValue, setNestedValue] = useState("");
  const [replyMode, setReplyMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const {
    value = "",
    hasNestedComments = false,
    comments = [],
    id = 0,
    hasParent = false,
  } = comment;
  const [editValue, setEditValue] = useState(value);

  const handleReply = () => {
    setReplyMode(true);
    setNestedValue("");
  };
  const handleDelete = () => {
    const payLoad = {
      id: hasParent ? comment.parentID : comment.id,
      hasParent,
    };
    dispatch({ type: REMOVE_COMMENT, payLoad });
  };

  const handleNestedOnChange = (e) => {
    const input = e.target.value;
    setNestedValue(input);
  };

  // handler to add nested comment
  const handleComment = () => {
    if (nestedValue.length < 1) return;
    const payLoad = {
      value: nestedValue,
      parentID: id,
      id: new Date().getTime(),
      hasParent: true,
      hasNestedComments: false,
      comments: [],
    };
    dispatch({ type: ADD_COMMENT, payLoad });
    setReplyMode(false);
  };
  const handleCancel = () => {
    setReplyMode(false);
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  // Save comment handler in case of editing a comment
  const saveComment = () => {
    if (editValue.length < 1 || editValue === value) return;
    const payLoad = {
      value: editValue,
      parentID: id,
      id: comment.id,
      hasParent,
      hasNestedComments,
      comments,
    };
    dispatch({ type: EDIT_COMMENT, payLoad });
    setEditMode(false);
  };

  return (
    <div style={{ paddingLeft: "15px" }}>
      <div>
        <input
          disabled={!editMode}
          onChange={(e) => setEditValue(e.target.value)}
          style={{ width: "200px" }}
          value={editValue}
          type="text"
        />
        {editMode && (
          <>
            <button onClick={saveComment}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        )}
        {replyMode && (
          <div>
            <input
              type="text"
              value={nestedValue}
              onChange={handleNestedOnChange}
            />
            <button onClick={handleComment}> Comment</button>
            <button onClick={handleCancel}>Canel</button>
          </div>
        )}
        {!replyMode && !editMode && (
          <>
            {" "}
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleReply}>Reply</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
      {hasNestedComments && (
        <>
          {comments.map((nestedComment, index) => {
            return (
              <div key={index}>
                <Comments comment={nestedComment} />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Comments;
