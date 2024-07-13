// store/src/reducers/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';

// Placeholder reducer
const placeholderReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Combine all reducers
const rootReducer = combineReducers({
  placeholder: placeholderReducer,
  // Add other reducers here
});

export default rootReducer;