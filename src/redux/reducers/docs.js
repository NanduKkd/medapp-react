import actionTypes from '../actionTypes'

const initialState = {
	loading: false,
	list: [],
}

export default function docs(state=initialState, action) {
	switch( action.type ) {
		case actionTypes.DOC_LOADING:
			return {...state, loading: action.loading}
		case actionTypes.DOC_LIST:
			return {...state, loading: false, list: action.list}
		case actionTypes.MEET_CONNECT:
			return {...state, loading: false, list: []}
		default:
			return state
	}
}
