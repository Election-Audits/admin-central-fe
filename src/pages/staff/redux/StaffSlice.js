
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    listLoading: false,
    isLoading: false,
    selectedStaff: null,
    staffList: [],
    errorMessage: '',
  };
  
  // Async thunks
  export const fetchAllStaff = createAsyncThunk(
    'staff/fetchAll',
    async (_, thunkAPI) => {
      try {
        const response = await getAllStaff();
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const selectStaff = createAsyncThunk(
    'staff/select',
    async (staffId, thunkAPI) => {
      try {
        const response = await getStaffById(staffId);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const createNewStaff = createAsyncThunk(
    'staff/create',
    async (staffDetails, thunkAPI) => {
      try {
        const response = await createStaff(staffDetails);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const modifyStaff = createAsyncThunk(
    'staff/update',
    async ({ staffId, staffDetails }, thunkAPI) => {
      try {
        const response = await updateStaff(staffId, staffDetails);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const removeStaff = createAsyncThunk(
    'staff/delete',
    async (staffId, thunkAPI) => {
      try {
        await deleteStaff(staffId);
        return staffId;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const changeStaffStatus = createAsyncThunk(
    'staff/changeStatus',
    async ({ staffId, status }, thunkAPI) => {
      try {
        const response = await updateStaffStatus(staffId, status);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  // Slice
  const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Fetch All Staff
        .addCase(fetchAllStaff.pending, (state) => {
          state.listLoading = true;
          state.errorMessage = '';
        })
        .addCase(fetchAllStaff.fulfilled, (state, action) => {
          state.listLoading = false;
          state.staffList = action.payload;
        })
        .addCase(fetchAllStaff.rejected, (state, action) => {
          state.listLoading = false;
          state.errorMessage = action.payload;
        })
        // Select Staff
        .addCase(selectStaff.pending, (state) => {
          state.isLoading = true;
          state.errorMessage = '';
        })
        .addCase(selectStaff.fulfilled, (state, action) => {
          state.isLoading = false;
          state.selectedStaff = action.payload;
        })
        .addCase(selectStaff.rejected, (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        })
        // Create New Staff
        .addCase(createNewStaff.pending, (state) => {
          state.isLoading = true;
          state.errorMessage = '';
        })
        .addCase(createNewStaff.fulfilled, (state, action) => {
          state.isLoading = false;
          state.staffList.push(action.payload);
        })
        .addCase(createNewStaff.rejected, (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        })
        // Update Staff
        .addCase(modifyStaff.pending, (state) => {
          state.isLoading = true;
          state.errorMessage = '';
        })
        .addCase(modifyStaff.fulfilled, (state, action) => {
          state.isLoading = false;
          state.staffList = state.staffList.map((staff) =>
            staff.id === action.payload.id ? action.payload : staff
          );
        })
        .addCase(modifyStaff.rejected, (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        })
        // Delete Staff
        .addCase(removeStaff.pending, (state) => {
          state.isLoading = true;
          state.errorMessage = '';
        })
        .addCase(removeStaff.fulfilled, (state, action) => {
          state.isLoading = false;
          state.staffList = state.staffList.filter((staff) => staff.id !== action.payload);
        })
        .addCase(removeStaff.rejected, (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        })
        // Update Staff Status
        .addCase(changeStaffStatus.pending, (state) => {
          state.isLoading = true;
          state.errorMessage = '';
        })
        .addCase(changeStaffStatus.fulfilled, (state, action) => {
          state.isLoading = false;
          const updatedStaff = action.payload;
          state.staffList = state.staffList.map((staff) =>
            staff.id === updatedStaff.id ? updatedStaff : staff
          );
        })
        .addCase(changeStaffStatus.rejected, (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        });
    },
  });
  
  export default staffSlice.reducer;
  