const reducer = (state = 123, action) => {
    switch (action.type) {
        case 'DATA_TYPE':
        return action.payload;
      default:
        return state;
    }
  };
  export default reducer;