// export const todoListSelector = (state) => {
//   const todoRemaining = state.todoList.filter((todo) => {
//     return todo.name.includes(state.filters.search);
//   });
//   return todoRemaining;
// };

// export const searchSelector = (state) => state.filters.search;

import { createSelector } from "reselect";

export const searchSelector = (state) => state.filters.search;
export const todoListSelector = (state) => state.todoList;

export const todoListRemainingSelector = createSelector(
  todoListSelector,
  searchSelector,
  (todoList, searchText) => {
    return todoList.filter((todo) => {
      return todo.name.includes(searchText);
    });
  }
);
