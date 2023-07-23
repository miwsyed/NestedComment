import React, { useState } from "react";
import { useGlobalComments, useSetGlobalComments } from "./GlobalCommentStore";

const ShowComments = ({ comment, lexicalComments }) => {
  const setGlobalComments = useSetGlobalComments();
  const globalComments = useGlobalComments();
  const { value, hasComments, comments, id } = comment;
  const [nestedValue, setNestedValue] = useState("");
  const [replyClicked, setReplyClicked] = useState(false);
  const handleNestedOnChange = (e) => {
    const nestedInput = e.target.value;
    setNestedValue(nestedInput);
  };
  const handledNestedAddComment = () => {
    const payload = {
      value: nestedValue,
      hasParent: true,
      hasComments: false,
      id: lexicalComments.length,
      comments: [],
    };
    const clonedGlobalComments = JSON.parse(JSON.stringify(globalComments));
    const updatedGlobalComments = clonedGlobalComments.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          comments: [...item.comments, payload],
        };
      }
      return item;
    });
    setGlobalComments(updatedGlobalComments);
  };
  const handleReply = () => {
    setReplyClicked(!replyClicked);
  };
  const handleDelete = () => {};
  return (
    <div style={{ marginLeft: "5px" }}>
      <input value={value} disabled />
      <button onClick={handleReply}> Reply </button>
      <button> Delete </button>
      {replyClicked ? (
        <div style={{ marginLeft: "5px" }}>
          <input
            type="text"
            onChange={handleNestedOnChange}
            value={nestedValue}
            placeholder="enter reply"
          />
          <button onClick={handledNestedAddComment}>Comment</button>
        </div>
      ) : (
        <>{null}</>
      )}

      {hasComments ? (
        <div style={{ paddingInline: "5px" }}>
          {comments.map((nestedComment) => {
            const { id } = nestedComment;
            return (
              <React.Fragment key={id}>
                <ShowComments
                  comment={nestedComment}
                  lexicalComments={comments}
                />
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <>{null}</>
      )}
    </div>
  );
};

export default ShowComments;
