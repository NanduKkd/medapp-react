import actionTypes from '../actionTypes'

const initialState = {
	connecting: true,
	connected: false,
	profile: null,
	patient: null,
	meeting: null,
	documents: null,
	ws: null
}

export default function meet (state=initialState, action) {
	switch(action.type) {
		case actionTypes.MEET_LINE:
			return { ...state, connecting: false, connected: action.connected, ws: action.ws }
		case actionTypes.MEET_CONNECT:
			return { ...state, profile: action.profile, patient: action.patient, meeting: action.meeting, documents: null }
		case actionTypes.MEET_DOCS:
			return { ...state, documents: action.documents }
		case actionTypes.MEET_CREATE:
			return { ...state, meeting: action.meeting }
		default:
			return state
	}
}
