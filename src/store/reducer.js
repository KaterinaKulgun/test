const reducer = (state = {type:'',text:''}, action) => {
    switch (action.type) {
        case 'DATA_TYPE':
        return {...state,text:action.payload};
        case 'FORMAT_TYPE':
        return {...state,type:action.payload};
      default:
        return state;
    }
  };
  export default reducer;