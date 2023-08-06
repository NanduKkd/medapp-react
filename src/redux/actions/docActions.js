import actionTypes from '../actionTypes'
import axios from '../../utils/axios'

const loadDocs = () => {
	return async (dispatch, getState) => {
		dispatch({ type: actionTypes.DOC_LOADING, loading: true })
		try {
			const res = await axios.post('/v1/document/'+getState().meet.patient, {
				documents: getState().meet.documents,
			})
			if(res.status!==200) throw 'Status code '+res.status+' '+res.data.message
			dispatch({ type: actionTypes.DOC_LIST, list: res.data.list })
		} catch (error) {
			dispatch({ type: actionTypes.DOC_LOADING, loading: false })
		}
	}
}

export const docActions = {
	loadDocs
}
