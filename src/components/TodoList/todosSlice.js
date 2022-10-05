// const initState = [
//   { id: 1, name: "name1", completed: false, priority: "Medium" },
//   { id: 2, name: "name2", completed: true, priority: "High" },
//   { id: 3, name: "name3", completed: false, priority: "Low" },
// ];

// const todoListReducer = (state = initState, action) => {
//   console.log('action', action.payload)
//   switch (action.type) {
//     case "todoList/addTodo":
//       return [...state, action.payload];
//     case "todoList/toggleTodoStatus":
//       return state.map((todo) =>
//         todo.id === action.payload
//           ? { ...todo, completed: !todo.completed }
//           : todo
//       );
//     default:
//       return state;
//   }
// };

// export default todoListReducer;

// Redux toolkit
import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todoList",
  initialState: [
    { id: 1, name: "name1", completed: false, priority: "Medium" },
    { id: 2, name: "name2", completed: true, priority: "High" },
    { id: 3, name: "name3", completed: false, priority: "Medium" },
  ],
  reducers: {
    // Mỗi một function sẽ tạo một action creator
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    toggleTodoStatus: (state, action) => {
      // const currentTodo = state.filter((todo) => todo.id === action.payload);
      // Note: filter return array với object [{abc: 'text'}]
      // Mong muốn trả về chỉ object tìm đc => find 
      const currentTodo = state.find((todo) => todo.id === action.payload);
      if(currentTodo) {
        currentTodo.completed = !currentTodo.completed;
      }
    },
  },
});

export default todosSlice;

// Thunk action creators: Là một function trả về một thunk action
// export function addTodos(todo) {  //Thunk action creator
//   return function addTodosThunk(dispatch, getState) { // la thunk action - la mot function
//     todo.name = 'Quang updated';
//     todo.completed = true;
//     dispatch(todosSlice.actions.addTodo(todo));
//     console.log('getState', getState());
//   }
// }