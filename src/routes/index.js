import React, { useEffect } from 'react'
import {
	BrowserRouter,
	Routes,
	Route,
	Link
} from 'react-router-dom'
import { connect } from 'react-redux'
import RequireAuth from './RequireAuth'
import AuthRoute from './AuthRoute'
import Profile from '../pages/Profile'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Patient from '../pages/Patient'
import { userActions, appActions } from '../redux/actions'

function Router ({ userInit, appInit, user, app }) {
	useEffect(() => {
		appInit()
		userInit()
	}, [])
	return user.init && app.init?"Loading....": (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<RequireAuth>
							<Home />
						</RequireAuth>
					}
				/>
				<Route
					path='/patient'
					element={
						<RequireAuth>
							<Patient />
						</RequireAuth>
					}
				/>
				<Route
					path='/profile'
					element={
						<RequireAuth>
							<Profile />
						</RequireAuth>
					}
				/>
				<Route
					path="/login"
					element={
						<AuthRoute>
							<Login />
						</AuthRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default connect(({user, app}) => ({ user, app }), { ...appActions, ...userActions })(Router);
