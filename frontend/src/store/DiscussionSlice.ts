import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Discussion, Task } from '../types.tsx'

interface DiscussionState {
    discussions: Discussion[];
}

const initialState: DiscussionState = {
    discussions: []
}

const DiscussionsSlice = createSlice({
    name: 'Discussion',
    initialState,
    reducers: {
        addDiscussion: (state, action: PayloadAction<Discussion>) => {
            state.discussions.push(action.payload);
        },
        updateDiscussion: (state, action: PayloadAction<Discussion>) => {
            const { id, title, description, creation_date, owner, members, files } = action.payload;
            const Discussion = state.discussions.find(discussions => discussions.id === id);
            if (Discussion) {
                Discussion.title = title;
                Discussion.description = description;
                Discussion.files = files;
            }
        },
        deleteDiscussion: (state, action: PayloadAction<number>) => {
            state.discussions = state.discussions.filter(discussions => discussions.id !== action.payload);
        },
        setDiscussion: (state, action: PayloadAction<Discussion[]>) => {
            state.discussions = action.payload
        }
    }
})

export const { addDiscussion, updateDiscussion, deleteDiscussion, setDiscussion } = DiscussionsSlice.actions

export default DiscussionsSlice.reducer