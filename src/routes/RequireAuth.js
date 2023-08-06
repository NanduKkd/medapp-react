import React from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

function RequireAuth({ user, children }) {
	return user.token? children: <Navigate to="/login" replace />
}

export default connect(({user}) => ({user}))(RequireAuth)
