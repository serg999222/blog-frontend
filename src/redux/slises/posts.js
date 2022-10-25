import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const getPosts = createAsyncThunk('posts/getPosts', async (dispatch) => {
	let { data } = await axios.get('/posts')
	return data
})

export const getTags = createAsyncThunk('posts/getTags', async (dispatch) => {
	let { data } = await axios.get('/tags')
	return data
})

const initialState = {
	posts: {
		items: [],
		status: 'loading',
	},
	tags: {
		items: [],
		status: 'loading',
	}
}

const postsSlise = createSlice({
	name: 'posts',
	initialState,
	redusers: {

	},
	extraReducers: {
		[getPosts.pending]: (state) => {
			state.posts.items = []
			state.posts.status = 'loading'
		},
		[getPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload
			state.posts.status = 'loaded'
		},
		[getPosts.rejected]: (state) => {
			state.posts.items = []
			state.posts.status = 'error'
		},
		[getTags.pending]: (state) => {
			state.tags.items = []
			state.tags.status = 'loading'
		},
		[getTags.fulfilled]: (state, action) => {
			state.tags.items = action.payload
			state.tags.status = 'loaded'
		},
		[getTags.rejected]: (state) => {
			state.tags.items = []
			state.tags.status = 'error'
		},
	}
})








export default postsSlise.reducer
// export const { setChengePostsIsloading } = postsSlise.actions
