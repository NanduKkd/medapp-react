import React from 'react'
import { connect } from 'react-redux'

function Profile() {
	return (
		<div>Profile page</div>
	)
}

export default connect(({user}) => ({user}))(Profile)
