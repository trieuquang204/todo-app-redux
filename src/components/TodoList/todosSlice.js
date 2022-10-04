const initState = [
  { id: 1, name: "name1", completed: false, priority: "Medium" },
  { id: 2, name: "name2", completed: true, priority: "High" },
  { id: 3, name: "name3", completed: false, priority: "Low" },
];

const todoListReducer = (state = initState, action) => {
  console.log('action', action.payload)
  switch (action.type) {
    case "todoList/addTodo":
      return [...state, action.payload];
    case "todoList/toggleTodoStatus":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};

export default todoListReducer;
