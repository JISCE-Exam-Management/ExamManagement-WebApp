import React from 'react'
import API from '../API';
import { UserItem } from './UserItem';
import { UsersSubHeader } from './UsersSubHeader';

export const Users = (props) => {
	const [search, setSearch] = React.useState('');
	const [category, setCategory] = React.useState('');
	const [users, setUsers] = React.useState([]);
	const [filteredUsers, setFilteredUsers] = React.useState([]);

	React.useEffect(() => {
		fetch(API.ALL_USERS).then(async (res) => {
			if (res.ok) return res.json();
			throw new Error(await res.text());
		}).then((users) => {
			setUsers(users);
		}).catch((e) => alert(e.message));
	}, []);

	React.useEffect(() => {
		if (category === 'verified') {
			setFilteredUsers(users.filter((u) => u.isVerified));
		} else if (category === 'unverified') {
			setFilteredUsers(users.filter((u) => !u.isVerified));
		} else {
			setFilteredUsers(users);
		}
	}, [category, users]);

	return (
		<section className='child withHeader'>
			<UsersSubHeader onChangeSearch={ setSearch } onChangeFilter={ setCategory } />
			<div className="itemsContainer">
                {filteredUsers.filter((user)=> user.name.toLowerCase().includes(search.toLowerCase())).map((user)=> <UserItem key={user._id} user={user}/>)}
            </div>
		</section>
	)
};
