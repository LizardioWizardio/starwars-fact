import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Fact {
    id: number;
    fact: string;
}

interface FactsState {
    facts: Fact[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: FactsState = {
    facts: [],
    status: 'idle',
    error: null,
};

export const fetchFacts = createAsyncThunk('facts/fetchFacts', async (count: number) => {
    const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=star+wars&limit=${count}`);
    return response.data.result.map((fact: any, index: number) => {
        return {
            id: fact.id,
            fact: fact.value,
        };
    });
});

const factsSlice = createSlice({
    name: 'facts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchFacts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFacts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.facts = action.payload;
            })
            .addCase(fetchFacts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },
});

export default factsSlice.reducer;
