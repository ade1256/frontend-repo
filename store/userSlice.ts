import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = action.payload;
    },
    updateUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { updateUserStart, updateUserSuccess, updateUserFailure } =
  userSlice.actions;

export default userSlice.reducer;
