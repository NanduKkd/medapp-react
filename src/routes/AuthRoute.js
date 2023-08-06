import React from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

function RequireAuth({ user, children }) {
	return user.token? <Navigate to="/" replace /> :children
}

export default connect(({user}) => ({user}))(RequireAuth)
