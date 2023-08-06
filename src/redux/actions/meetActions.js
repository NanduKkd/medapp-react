import {connectSocket} from '../../utils/socket'
import axios from '../../utils/axios'
import actionTypes from '../actionTypes'
import { generateKey, exportPublicKey } from '../../utils/crypto'

const goOnline = () => {
	return async (dispatch, getState) => {
		const username = getState().user.data.username;
		if(getState().meet.connected) return;
		const ws = connectSocket();
		ws.onopen = () => {
			dispatch({ type: actionTypes.MEET_LINE, connected: true, ws })
			generateKey().then(keys => {
				exportPublicKey(keys).then(publicKey => {
					ws.send(JSON.stringify({username, type: 'doctor_connect', auth: 'Bearer '+getState().user.token, publicKey}))
					ws.onmessage = async(msg) => {
						msg = JSON.parse(msg.data)
						if(msg.type==='patient_connect') {
							if(getState().meet.patient) ws.send(JSON.stringify({ type: 'patient_connect_busy', auth: 'Bearer '+getState().user.token }))
							ws.send(JSON.stringify({type: 'patient_connect_accept', auth: 'Bearer '+getState().user.token, patient: msg.patient}))
							const res = await axios.get('/v1/patient/'+msg.patient);
							if(res.status===404) {
								alert("Connecting with patient failed due to unknown reasons.")
							} else {
								dispatch({ type: actionTypes.MEET_CONNECT, meeting: msg.meeting, patient: msg.patient, profile: res.data })
							}
						} else if(msg.type==='patient_connect_close') {
							dispatch({ type: actionTypes.MEET_CONNECT })
						} else if(msg.type==='patient_share') {
							if(msg.patient===getState().meet.patient)
								dispatch({type: actionTypes.MEET_DOCS, documents: msg.documents})
						} else if(msg.type==='patient_connect_create') {
							dispatch({ type: actionTypes.MEET_CREATE, meeting: msg.meeting })
						} else {
							console.log('UNKNOWN MESSAGE', msg)
						}
					}
				})
			})
		}
		ws.onclose = () => {
			dispatch({ type: actionTypes.MEET_LINE, connected: false })
		}
		ws.onerror = e => {
			console.error(e)
		}
	}
}

const closeMeet = () => {
	return async (dispatch, getState) => {
		getState().meet.ws.send(JSON.stringify({ type: 'patient_connect_close', auth: 'Bearer '+getState().user.token, patient: getState().meet.patient }))
		dispatch({ type: actionTypes.MEET_CONNECT })
	}
}

export const meetActions = {
	goOnline,
	closeMeet,
}
