import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    listLoading: false,
    isLoading: false,
    selectedPresidentialCandidate: null,
    candidates: [],    
    errorMessage: string,
}


export const getAllCandidates= createAsyncThunk(
    'candidates/getAll',
    async () => {
        try {
            const response = await fetch('https://api.example.com/candidates')
            const data = await response.json()
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const selectPresidentialCandidate = createAsyncThunk(
    'candidates/select',
    async (candidateId) => {
        try {
            const response = await fetch(`https://api.example.com/candidates/${candidateId}`)
            const data = await response.json()
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }   
    }
)


export const createPresidentialCandidate = createAsyncThunk(
    'candidates/create',
    async (candidate) => {
        try {
            const response = await fetch('https://api.example.com/candidates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(candidate),
            })
            const data = await response.json()
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const updatePresidentialCandidate = createAsyncThunk(
    'candidates/update',
    async (candidate) => {
        try {
            const response = await fetch(`https://api.example.com/candidates/${candidate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(candidate),
            })
            const data = await response.json()
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deletePresidentialCandidate = createThunk(
    'candidates/delete',
    async (candidateId) => {
        try {
            await fetch(`https://api.example.com/candidates/${candidateId}`, {
                method: 'DELETE',
            })
            return candidateId
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const updatePresidentialCandidateStatus = createThunk(
    'candidates/status',
    async (candidateId, status) => {
        try {
            const response = await fetch(`https://api.example.com/candidates/${candidateId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            })
            const data = await response.json()
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


const presidentialCandidatesSlice = createSlice({
    name: 'candidates',
    initialState,
    reducers: {},
    extraReducers: {

        [getAllCandidates.pending]: (state) => {
            state.listLoading = true
            state.isLoading = false
            state.errorMessage = ''
        },
        [getAllCandidates.fulfilled]: (state, action) => {
            state.listLoading = false
            state.candidates = action.payload
        },
        [getAllCandidates.rejected]: (state, action) => {
            state.listLoading = false
            state.errorMessage = action.payload.message
        },


        [selectPresidentialCandidate.pending]: (state) => {
            state.isLoading = true
            state.errorMessage = ''
        },
        [selectPresidentialCandidate.fulfilled]: (state, action) => {
            state.isLoading = false
            state.candidates = action.payload
        },
        [selectPresidentialCandidate.rejected]: (state, action) => {
            state.isLoading = false
            state.errorMessage = action.payload.message
        },


        [createPresidentialCandidate.pending]: (state) => {
            state.isLoading = true
            state.errorMessage = ''
        },
        [createPresidentialCandidate.fulfilled]: (state, action) => {
            state.isLoading = false
            state.candidates = action.payload
        },
        [createPresidentialCandidate.rejected]: (state, action) => {
            state.isLoading = false
            state.errorMessage = action.payload.message
        },

        [updatePresidentialCandidate.pending]: (state) => {
            state.isLoading = true
            state.errorMessage = ''
        },
        [updatePresidentialCandidate.fulfilled]: (state, action) => {
            state.isLoading = false
            state.candidates = action.payload
        },
        [updatePresidentialCandidate.rejected]: (state, action) => {
            state.isLoading = false
            state.errorMessage = action.payload.message
        },


        [deletePresidentialCandidate.pending]: (state) => {
            state.isLoading = true
            state.errorMessage = ''
        },
        [deletePresidentialCandidate.fulfilled]: (state, action) => {
            state.isLoading = false
            state.candidates = action.payload
        },
        [deletePresidentialCandidate.rejected]: (state, action) => {
            state.isLoading = false
            state.errorMessage = action.payload.message
        },


        [updatePresidentialCandidateStatus.pending]: (state) => {
            state.isLoading = true
            state.errorMessage = ''
        },
        [updatePresidentialCandidateStatus.fulfilled]: (state, action) => {
            state.isLoading = false
            state.candidates = action.payload
        },
        [updatePresidentialCandidateStatus.rejected]: (state, action) => {
            state.isLoading = false
            state.errorMessage = action.payload.message
        }
    }
    });

export const { } = presidentialCandidatesSlice.actions
