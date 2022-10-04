const initState = [
  { id: 1, name: "name1", completed: false, priority: "Medium" },
  { id: 2, name: "name2", completed: true, priority: "High" },
  { id: 3, name: "name3", completed: false, priority: "Low" },
];
  
  const todoListReducer = (state = initState, action) => {
    switch (action.type) {
      case "todoList/addTodo":
        return [...state, action.payload]
      default:
        return state;
    }
  }
  
  export default todoListReducer;
  