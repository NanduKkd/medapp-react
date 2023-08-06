import actionTypes from '../actionTypes'
import { readUser, writeUser, deleteUser } from '../../utils/storage'
import axios from '../../utils/axios'

const userInit = () => {
	return async dispatch => {
		const { token, ...data } = readUser();
		console.log(token, data)
		if(token) {
			dispatch({ type: actionTypes.USER_DATA, data, token })
			axios.defaults.headers.common["Authorization"] = 'Bearer ' + token
			const response = await axios.get('/v1/profile')
			if(response.status===200)
				dispatch({ type: actionTypes.USER_DATA, data: response.data, token })
			else {
				console.log(response.data.message)
				axios.defaults.headers.common["Authorization"] = undefined;
				dispatch({ type: actionTypes.USER_LOGOUT })
			}
		} else
			dispatch({ type: actionTypes.USER_LOGOUT })
	}
}

const userLogin = (username, password) => {
	return async dispatch => {
		dispatch({ type: actionTypes.USER_LOADING, loading: true })
		const response = await axios.post('/v1/auth/login', { username, password })
		if(response.status===200) {
			const { token, ...data } = response.data;
			axios.defaults.headers.common["Authorization"] = 'Bearer ' + token
			writeUser({ token, ...data })
			dispatch({ type: actionTypes.USER_DATA, token, data })
		} else if(response.statue===404) {
			alert("Invalid credentials")
			dispatch({ type: actionTypes.USER_LOADING, loading: false })
			return response.data.message;
		} else {
			dispatch({ type: actionTypes.USER_LOADING, loading: false })
			return response.data.message;
		}
	}
}

const userLogout = () => {
	return async dispatch => {
		dispatch({ type: actionTypes.USER_LOADING, loading: true })
		axios.defaults.headers.common["Authorization"] = undefined
		deleteUser()
		dispatch({ type: actionTypes.USER_LOGOUT })
	}
}

export const userActions = {
	userInit,
	userLogin,
	userLogout
}
