import {createSlice} from '@reduxjs/toolkit';

export type Activity = {
  id: string;
  title: string;
  done: boolean;
};

export type InitialState = {
  status: 'idle' | 'loading' | 'complete';
  entities: Activity[];
};

const initialState: InitialState = {
  status: 'idle',
  entities: [
    {
      id: '1',
      title: 'Morning Walk',
      done: false,
    },
    {
      id: '2',
      title: 'Read Book',
      done: false,
    },
    {
      id: '3',
      title: 'Excercise',
      done: false,
    },
  ],
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    activitiesAdded(state, action) {
      const activities = action.payload;
      state.entities.push(activities);
    },
    activitiesToggled(state, action) {
      const activitiesId = action.payload;
      const activities = state.entities.find(e => e.id === activitiesId);
      if (activities) {
        activities.done = !activities.done;
      }
    },
    completedActivitiessCleared(state) {
      state.entities = state.entities.filter(activities => !activities.done);
    },
    deleteActivities(state, action) {
      const activitiesId = action.payload;
      state.entities = state.entities.filter(
        activities => activities.id !== activitiesId,
      );
    },
    resetActivities(state) {
      state.status = 'idle';
      state.entities = [...initialState.entities]; // Reset to the predefined activities
    },
  },
});

export const {
  activitiesAdded,
  activitiesToggled,
  completedActivitiessCleared,
  deleteActivities,
  resetActivities,
} = activitiesSlice.actions;

export default activitiesSlice.reducer;
