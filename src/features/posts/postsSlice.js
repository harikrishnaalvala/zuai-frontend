import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  selectedPost: null,
};

export const counterSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    handleOpenModal: (state) => {
      state.isModalOpen = true;
    },

    handleCloseModal: (state) => {
      state.isModalOpen = false;
      state.selectedPost = null;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
      state.isModalOpen = true;
    },
  },
});

export const { handleOpenModal, handleCloseModal, setSelectedPost } =
  counterSlice.actions;

export default counterSlice.reducer;
