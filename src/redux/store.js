import { configureStore, combineReducers } from "@reduxjs/toolkit";
import postsSlise from './slises/posts'
import authSlice from './slises/auth'


const reducers = combineReducers({
	posts: postsSlise,
	auth: authSlice
})

const store = configureStore({
	reducer: reducers
})

window.store = store
export default store
