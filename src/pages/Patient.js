import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { meetActions, docActions } from '../redux/actions'
import Datestamp from '../utils/datestamp'

function Patient({ profile, closeMeet, loadDocs, docs, documents }) {
	useEffect(() => {
		if(documents) loadDocs()
	}, [documents])
	return profile?(
		<div className='outer row'>
			<div className="patient-documents" style={{color: '#fff'}}>
				{docs?
					docs.list.map(i => (
						<div className="doc-outer">
							{/*<img className="doc-image" src={"http://localhost:3000/files/thumbnails/"+i.filename+'.jpg'} />*/}
							<img className="doc-image" src={require('../assets/file.png')} style={{filter: 'inverse(1)'}} />
							<div className="doc-content">
								<a href={"http://localhost:3000/files/"+i.filename} target="_blank"><div class="doc-name">{i.name}</div></a>
							</div>
						</div>
					))
				:
					<div>
						Documents not shared
					</div>
				}
			</div>
			<div className="patient-profile-outer">
				<div className="patient-profile">
					<div className="patient-title">Patient Profile</div>
					<hr />
					<div className="patient-field">
						<div className="patient-field-name">Name</div>
						<div className="patient-field-value">{profile.name}</div>
					</div>
					<div className="patient-field">
						<div className="patient-field-name">Gender</div>
						<div className="patient-field-value">{profile.gender}</div>
					</div>
					<div className="patient-field">
						<div className="patient-field-name">Age</div>
						<div className="patient-field-value">{new Datestamp(profile.dob).age()}</div>
					</div>
					<button className="danger-box" onClick={closeMeet}>Close Meet</button>
				</div>
			</div>
		</div>
	):(
		<Navigate to='/' replace />
	)
}

export default connect(({meet, docs}) => ({ ...meet, docs }), { ...meetActions, ...docActions })(Patient)
