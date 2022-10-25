import { configureStore, combineReducers } from "@reduxjs/toolkit";
import postsSlise from './slises/posts'


const reducers = combineReducers({
	posts: postsSlise
})

const store = configureStore({
	reducer: reducers
})

window.store = store
export default store
