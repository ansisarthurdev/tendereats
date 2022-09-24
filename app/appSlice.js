import { createSlice } from '@reduxjs/toolkit';

const initialState={
    preview: null,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setPreview: (state, action) => {
            state.preview = action.payload;
        }
    }
})

//dispatch
export const { setPreview } = appSlice.actions;

//selectors
export const selectPreview = (state) => state.app.preview;

export default appSlice.reducer;