import React from 'react';
import { GoVerified } from 'react-icons/go';
import API from '../API';

export const UserItem = ({ user }) => {
	const[isVerified, setVerified] = React.useState(false);

	React.useEffect(()=> {
		setVerified(user.isVerified);
	}, [user]);

	const verifyUser = () => {
		fetch(API.UPDATE_USER.concat('?user=', user._id), {
			method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ isVerified: true })
		}).then(async (res) => {
			if (res.ok) return res.json();
			throw new Error(await res.text());
		}).then((u) => {
			user = u;
			setVerified(user.isVerified);
		}).catch((e) => alert(e.message));
	};

	return (
		<div className="item llh">
			<div className="userDetails llv">
				<h3 className="title itemRow">{user.name}</h3>
				<p className="itemDetails itemRow">{user.email}</p>
			</div>
			<div className="verification llv">
				{isVerified ? <GoVerified className='verifiedIcon' /> : <span className="verifyBtn" onClick={verifyUser}>Verify</span>}
			</div>
		</div>
	)
};