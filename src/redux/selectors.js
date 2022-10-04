// export const todoListSelector = (state) => {
//   const todoRemaining = state.todoList.filter((todo) => {
//     return todo.name.includes(state.filters.search);
//   });
//   return todoRemaining;
// };

// export const searchSelector = (state) => state.filters.search;

import { createSelector } from "reselect";

export const searchSelector = (state) => state.filters.search;
export const filterStatusSelector = (state) => state.filters.status;
export const filterPrioritiesSelector = (state) => state.filters.priorities;
export const todoListSelector = (state) => state.todoList;

export const todoListRemainingSelector = createSelector(
  todoListSelector,
  filterStatusSelector,
  searchSelector,
  filterPrioritiesSelector,
  (todoList, status, searchText, priorities) => {
    return todoList.filter((todo) => {
      if (status === "All") {
        return priorities && priorities.length
          ? todo.name.includes(searchText) && priorities.includes(todo.priority)
          : todo.name.includes(searchText);
      }

      return (
        todo.name.includes(searchText) &&
        (status === "Completed" ? todo.completed : !todo.completed) &&
        (priorities && priorities.length ? priorities.includes(todo.priority) : true)
      );
    });
  }
);
