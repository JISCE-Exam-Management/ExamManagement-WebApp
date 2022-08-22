import React from 'react';
import { SiMicrosoftexcel } from 'react-icons/si';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md';

export const UsersSubHeader = ({onChangeSearch, onChangeFilter}) => {
	const filterOptions = [
		{ value: 'all', label: 'ALL Users' },
		{ value: 'verified', label: 'Verified Users' },
		{ value: 'unverified', label: 'Unverified Users' }
	];
	const [value, setValue] = React.useState('all');
	const [search, setSearch] = React.useState('');
	const [colapse, setColapse] = React.useState(true);

	React.useEffect(()=> {
		onChangeFilter(value);
	}, [value, onChangeFilter]);

	React.useEffect(()=> {
		onChangeSearch(search);
	}, [search, onChangeSearch]);

	return (
		<header className='subHeader' id='usersSubHeader'>
			<input type="text" name="search" className='search' value={search} onChange={(e)=> setSearch(e.target.value)} placeholder='Search users by name...' autoComplete='off' />
			<div className="filterDropdown  right-m0">
				<div className={colapse ? "filterSelected" : "filterSelected expand"} onClick={() => setColapse(!colapse)}>
					<span className="selectedFilter">{filterOptions.find((o)=> o.value === value).label}</span>
					<span className='divider'></span>
					{colapse ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
				</div>
				<ul className={colapse ? "filterItems colapse" : "filterItems"}>
					{filterOptions.map((o)=> <li key={o.value} onClick={() => { setValue(o.value); setColapse(true) }}>{o.label}</li>)}
				</ul>
			</div>
		</header>
	)
}
