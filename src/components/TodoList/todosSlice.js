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
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todoList",
  // initialState: [
  //   { id: 1, name: "name1", completed: false, priority: "Medium" },
  //   { id: 2, name: "name2", completed: true, priority: "High" },
  //   { id: 3, name: "name3", completed: false, priority: "Medium" },
  // ],
  initialState: {
    status: 'idle',
    todos: []
  },
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
  extraReducers: builder => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.status = 'loading';
    }).addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.status = 'idle';
    }).addCase(addNewTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    }).addCase(updateTodo.fulfilled, (state, action) => {
      let currentTodo = state.todos.find((todo) => todo.id === action.payload);
      currentTodo = action.payload;
    })
  }
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

// Đoạn code bất đồng bộ, lấy dữ liệu từ server thành công 
export const fetchTodos = createAsyncThunk('/todos/fetchTodos', async () => {
  const res = await fetch('/api/todos');
  const data = await res.json();
  // console.log('data', data)
  return data.todos;
})

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (newTodo) => {
  const res = await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify(newTodo)
  })
  const data = await res.json();
  // console.log('res', data)
  return data.todos;
})

export const updateTodo = createAsyncThunk('todos/updateTodo', async (updated) => {
  const res = await fetch('/api/updateTodo', {
    method: 'POST',
    body: JSON.stringify(updated)
  })
  const data = await res.json();
  return data.todos;
})