import axios from "axios";


let instans = axios.create({
	baseURL: 'http://195.189.227.87:4444'
})

instans.interceptors.request.use((config) => {
	config.headers.authorization = window.localStorage.getItem('token')
	return config
})

export default instans