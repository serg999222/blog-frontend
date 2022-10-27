import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'


const initialState = {
	data: null,
	status: 'loading'
}


export const getAuthData = createAsyncThunk('auth/getAuthData', async (params) => {
	let { data } = await axios.post('/auth/login', params)
	return data
})

export const getAuthMe = createAsyncThunk('auth/getAuthMe', async () => {
	let { data } = await axios.get('/auth/me')
	return data
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
	let { data } = await axios.post('/auth/register', params)
	return data
})

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null
		}
	},
	extraReducers: {
		[getAuthData.pending]: (state) => {
			state.status = 'loading'
			state.data = null
		},

		[getAuthData.fulfilled]: (state, action) => {
			state.status = 'loaded'
			state.data = action.payload
		},

		[getAuthData.rejected]: (state) => {
			state.status = 'error'
			state.data = null

		},
		[getAuthMe.pending]: (state) => {
			state.status = 'loading'
			state.data = null
		},

		[getAuthMe.fulfilled]: (state, action) => {
			state.status = 'loaded'
			state.data = action.payload
		},

		[getAuthMe.rejected]: (state) => {
			state.status = 'error'
			state.data = null

		},
		[fetchRegister.pending]: (state) => {
			state.status = 'loading'
			state.data = null
		},

		[fetchRegister.fulfilled]: (state, action) => {
			state.status = 'loaded'
			state.data = action.payload
		},

		[fetchRegister.rejected]: (state) => {
			state.status = 'error'
			state.data = null
		},
	}
})


export const selectIsAuth = state => Boolean(state.auth.data)

export default authSlice.reducer
export const { logout } = authSlice.actions
