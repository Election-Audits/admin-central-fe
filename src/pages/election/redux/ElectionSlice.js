
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
    listLoading: false,
    isLoading: false,
    selectedElection: null,
    elections: [],
    errorMessage: '',
  };
  
  // Async thunks
  export const fetchAllElections = createAsyncThunk(
    'elections/fetchAll',
    async (_, thunkAPI) => {
      try {
        const response = await getAllElections();
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const selectElection = createAsyncThunk(
    'elections/select',
    async (electionId, thunkAPI) => {
      try {
        const response = await getElectionById(electionId);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const createNewElection = createAsyncThunk(
    'elections/create',
    async (electionDetails, thunkAPI) => {
      try {
        const response = await createElection(electionDetails);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const modifyElection = createAsyncThunk(
    'elections/update',
    async ({ electionId, electionDetails }, thunkAPI) => {
      try {
        const response = await updateElection(electionId, electionDetails);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const removeElection = createAsyncThunk(
    'elections/delete',
    async (electionId, thunkAPI) => {
      try {
        await deleteElection(electionId);
        return electionId;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const changeElectionStatus = createAsyncThunk(
    'elections/changeStatus',
    async ({ electionId, status }, thunkAPI) => {
      try {
        const response = await updateElectionStatus(electionId, status);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  // Slice
  const electionsSlice = createSlice({
    name: 'elections',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Fetch All
        .addCase(fetchAllElections.pending, (state) => {
          state.listLoading = true;
          state.errorMessage = '';
        })
        .addCase(fetchAllElections.fulfilled, (state, action) => {
          state.listLoading = false;
          state.elections = action.payload;
        })
        .addCase(fetchAllElections.rejected, (state, action) => {
          state.listLoading = false;
          state.errorMessage = action.payload;
        })
        // Select Election
        .addCase(selectElection.pending, (state) => {
          state.isLoading = true;
          state.errorMessage = '';
        })
        .addCase(selectElection.fulfilled, (state, action) => {
          state.isLoading = false;
          state.selectedElection = action.payload;
        })
        .addCase(selectElection.rejected, (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        })
        // Create Election
        .addCase(createNewElection.pending, (state) => {
          state.isLoading = true;
          state.errorMessage = '';
        })
        .addCase(createNewElection.fulfilled, (state, action) => {
          state.isLoading = false;
          state.elections.push(action.payload);
        })
        .addCase(createNewElection.rejected, (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        })
        // Update Election
        .addCase(modifyElection.pending, (state) => {
          state.isLoading = true;
          state.errorMessage = '';
        })
        .addCase(modifyElection.fulfilled, (state, action) => {
          state.isLoading = false;
          state.elections = state.elections.map((election) =>
            election.id === action.payload.id ? action.payload : election
          );
        })
        .addCase(modifyElection.rejected, (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        })
        // Delete Election
        .addCase(removeElection.pending, (state) => {
          state.isLoading = true;
          state.errorMessage = '';
        })
        .addCase(removeElection.fulfilled, (state, action) => {
          state.isLoading = false;
          state.elections = state.elections.filter((election) => election.id !== action.payload);
        })
        .addCase(removeElection.rejected, (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        })
        // Update Status
        .addCase(changeElectionStatus.pending, (state) => {
          state.isLoading = true;
          state.errorMessage = '';
        })
        .addCase(changeElectionStatus.fulfilled, (state, action) => {
          state.isLoading = false;
          const updatedElection = action.payload;
          state.elections = state.elections.map((election) =>
            election.id === updatedElection.id ? updatedElection : election
          );
        })
        .addCase(changeElectionStatus.rejected, (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        });
    },
  });
  
  export default electionsSlice.reducer;
  