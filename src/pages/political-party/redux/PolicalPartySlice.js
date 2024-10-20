
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apiRequest from './PoliticalPartyCrud';


const initialState = {
    listLoading: false,
    isLoading: false,
    selectedPoliticalParty: null,
    parties: [],
    errorMessage: '',
  };
  
  // Async thunks
  export const fetchAllParties = createAsyncThunk(
    'parties/fetchAll',
    async (_, thunkAPI) => {
      try {
        const response = await apiRequest.getAllPoliticalParties();
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const selectPoliticalParty = createAsyncThunk(
    'parties/select',
    async (partyId, thunkAPI) => {
      try {
        const response = await apiRequest.getPoliticalPartyById(partyId);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const createNewParty = createAsyncThunk(
    'parties/create',
    async (partyDetails, thunkAPI) => {
      try {
        const response = await apiRequest.createPoliticalParty(partyDetails);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const modifyParty = createAsyncThunk(
    'parties/update',
    async ({ partyId, partyDetails }, thunkAPI) => {
      try {
        const response = await apiRequest.updatePoliticalParty(partyId, partyDetails);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const removeParty = createAsyncThunk(
    'parties/delete',
    async (partyId, thunkAPI) => {
      try {
        await apiRequest.deletePoliticalParty(partyId);
        return partyId;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const changePartyStatus = createAsyncThunk(
    'parties/changeStatus',
    async ({ partyId, status }, thunkAPI) => {
      try {
        const response = await updatePoliticalPartyStatus(partyId, status);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  // Slice
  const politicalPartiesSlice = createSlice({
    name: 'parties',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Fetch All
        .addCase(fetchAllParties.pending, (state) => {
          state.listLoading = true;
          state.errorMessage = '';
        })
        .addCase(fetchAllParties.fulfilled, (state, action) => {
          state.listLoading = false;
          state.parties = action.payload;
        })
        .addCase(fetchAllParties.rejected, (state, action) => {
          state.listLoading = false;
          state.errorMessage = action.payload;
        })
        // Select Party
        .addCase(selectPoliticalParty.pending, (state) => {
          state.isLoading = true;
          state.errorMessage = '';
        })
        .addCase(selectPoliticalParty.fulfilled, (state, action) => {
          state.isLoading = false;
          state.selectedPoliticalParty = action.payload;
        })
        .addCase(selectPoliticalParty.rejected, (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        })
        // Create Party
        .addCase(createNewParty.pending, (state) => {
          state.isLoading = true;
          state.errorMessage = '';
        })
        .addCase(createNewParty.fulfilled, (state, action) => {
          state.isLoading = false;
          state.parties.push(action.payload);
        })
        .addCase(createNewParty.rejected, (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        })
        // Update Party
        .addCase(modifyParty.pending, (state) => {
          state.isLoading = true;
          state.errorMessage = '';
        })
        .addCase(modifyParty.fulfilled, (state, action) => {
          state.isLoading = false;
          state.parties = state.parties.map((party) =>
            party.id === action.payload.id ? action.payload : party
          );
        })
        .addCase(modifyParty.rejected, (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        })
        // Delete Party
        .addCase(removeParty.pending, (state) => {
          state.isLoading = true;
          state.errorMessage = '';
        })
        .addCase(removeParty.fulfilled, (state, action) => {
          state.isLoading = false;
          state.parties = state.parties.filter((party) => party.id !== action.payload);
        })
        .addCase(removeParty.rejected, (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        })
        // Update Status
        .addCase(changePartyStatus.pending, (state) => {
          state.isLoading = true;
          state.errorMessage = '';
        })
        .addCase(changePartyStatus.fulfilled, (state, action) => {
          state.isLoading = false;
          const updatedParty = action.payload;
          state.parties = state.parties.map((party) =>
            party.id === updatedParty.id ? updatedParty : party
          );
        })
        .addCase(changePartyStatus.rejected, (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        });
    },
  });
  
  export default politicalPartiesSlice.reducer;