const initState = {
  search: "",
  status: "All",
  priority: [],
};

const filterReducer = (state = initState, action) => {
  switch (action.type) {
    case "filters/searchFilterChange":
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
