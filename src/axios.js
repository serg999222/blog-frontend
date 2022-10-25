import axios from "axios";


let instans = axios.create({
	baseURL: 'http://localhost:4444'
})


export default instans