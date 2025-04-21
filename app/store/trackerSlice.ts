import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TrackerState {
  checkpoints: string[];
  streak: number;
}

const initialState: TrackerState = {
  checkpoints: [],
  streak: 0,
};

const trackerSlice = createSlice({
  name: 'tracker',
  initialState,
  reducers: {
    addCheckpoint: (state, action: PayloadAction<string>) => {
      if (!state.checkpoints.includes(action.payload)) {
        state.checkpoints.push(action.payload);
        // Calculate streak
        const sortedDates = [...state.checkpoints].sort();
        let currentStreak = 1;

        for (let i = 1; i < sortedDates.length; i++) {
          const prevDate = new Date(sortedDates[i - 1]);
          const currentDate = new Date(sortedDates[i]);
          const diffDays = Math.floor(
            (currentDate.getTime() - prevDate.getTime()) /
              (1000 * 60 * 60 * 24),
          );

          if (diffDays === 1) {
            currentStreak++;
          } else {
            currentStreak = 1;
          }
        }

        state.streak = currentStreak;
      }
    },
  },
});

export const {addCheckpoint} = trackerSlice.actions;
export default trackerSlice.reducer;
