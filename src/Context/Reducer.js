/* eslint-disable */
import {
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT,
} from "../constants/Actions";
import {
  addNestedComment,
  editNestedComment,
  removeNestedComment,
} from "./ReducerHelperFunctions";

export const Reducer = (state, action) => {
  const { type, payLoad } = action;

  switch (type) {
    case ADD_COMMENT: {
      const { hasParent, parentID } = payLoad;
      if (hasParent) {
        return addNestedComment(state, parentID, payLoad);
      } else {
        return [...state, payLoad];
      }
    }
    case EDIT_COMMENT: {
      // Handle edit comment logic
      const { id, hasParent, value } = payLoad;
      if (!hasParent) {
        return state.map((comment) => {
          if (comment.id === id) {
            return {
              ...comment,
              value,
            };
          }
        });
      }
      return editNestedComment(state, id, hasParent, value);
    }
    case REMOVE_COMMENT: {
      // Handle remove comment logic
      const { id, hasParent } = payLoad;
      return removeNestedComment(state, id, hasParent);
    }
    default:
      return state;
  }
};

// Helper function to update nested comments
