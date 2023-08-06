import React, { useState } from 'react'
import { connect } from 'react-redux'
import { userActions } from '../redux/actions'
import './Login.css'

function Login ({ userLogin, user }) {
	const [ username, setUsername ] = useState('')
	const [ password, setPassword ] = useState('')
	return (
		<div className='outer'>
			<div className="login-box">
				<div className="label">Hello Doctor!</div>
				<input placeholder='username' onInput={e => setUsername(e.target.value)} />
				<input type="password" placeholder='password' onInput={(e) => setPassword(e.target.value)} />
				<button className="success-box" onClick={() => userLogin(username, password).then(e => console.log(e))}>Login</button>
				{user.loading && <div className="loader" />}
			</div>
		</div>
	)
}

export default connect(({user}) => ({user}), userActions)(Login)
