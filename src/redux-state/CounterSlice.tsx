import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { count1: 0, count2: 0 },
  reducers: {
    increment1(state) {
      state.count1++;
    },
    increment2(state) {
      state.count2++;
    }
  }
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer }
})

export const { increment1, increment2 } = counterSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;