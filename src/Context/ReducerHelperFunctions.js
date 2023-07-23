export const addNestedComment = (lexicalComments, parentID, newComment) => {
  return lexicalComments.map((comment) => {
    if (comment.id === parentID) {
      return {
        ...comment,
        hasNestedComments: true,
        comments: [...comment.comments, newComment],
      };
    } else if (comment.hasNestedComments) {
      return {
        ...comment,
        comments: addNestedComment(comment.comments, parentID, newComment),
      };
    }
    return comment;
  });
};

export const removeNestedComment = (lexicalComments, commentID, hasParent) => {
  if (!hasParent)
    return lexicalComments.filter((comment) => comment.id !== commentID);
  return lexicalComments.map((comment) => {
    if (comment.id === commentID) {
      return {
        ...comment,
        hasNestedComments: false,
        comments: [],
      };
    } else if (comment.hasNestedComments) {
      return {
        ...comment,
        comments: removeNestedComment(comment.comments, commentID, hasParent),
      };
    }
    return comment;
  });
};

export const editNestedComment = (
  lexicalComments,
  commentID,
  hasParent,
  value
) => {
  return lexicalComments.map((comment) => {
    if (comment.id === commentID) {
      return {
        ...comment,
        value,
      };
    } else if (comment.hasNestedComments) {
      return {
        ...comment,
        comments: editNestedComment(
          comment.comments,
          commentID,
          hasParent,
          value
        ),
      };
    }
    return comment;
  });
};
