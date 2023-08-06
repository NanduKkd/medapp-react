import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import QRCode from 'react-qr-code'
import { userActions, meetActions } from '../redux/actions'
import { generateKey, exportPublicKey } from '../utils/crypto'

function Home({ userLogout, user, goOnline, meet }) {
	useEffect(() => {
		goOnline()
		generateKey().then(keys => exportPublicKey(keys)).then(key => {
			console.log(key)
		})
	}, [])
	return meet.profile?(
		<Navigate to='/patient' replace />
	):(
		<div className="home-box">
			<div className="meet-box">
				{meet.connected?
					<>
						<QRCode size={400} viewBox="0 0 400 400" style={{margin: '2em'}} value={user.data.username} />
						{"This is your QR Code!"}
					</>
				:
					<>
						<div style={{height: '2em'}} />
						{meet.connecting?
							<div className='loader' />
						:
							"Disconnected, please refresh the page."
						}
					</>
				}
			</div>
			<div className="profile-box">
				<div className="profile-main">
					<div class="profile-dp">
						<img src={"https://asterhospitals.in"+user.data.dp} />
					</div>
					<div className="profile-content">
						<div className="profile-name">{user.data.name}</div>
						<div className="profile-designation">{user.data.designation}</div>
					</div>
				</div>
				<button className="danger-box" onClick={() => userLogout()}>Logout</button>
			</div>
		</div>
	)
}

export default connect(({user, meet}) => ({user, meet}), { ...userActions, ...meetActions })(Home)
