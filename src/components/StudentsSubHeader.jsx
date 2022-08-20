import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SiMicrosoftexcel } from 'react-icons/si';
import { FaFilter } from 'react-icons/fa';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md';

export const StudentsSubHeader = ({ filterOptions, dropdownFilterOptions, onChangeSearch, onChangeFilter, initFilters, selectedFilters, onSelectFilters }) => {
	const navigate = useNavigate();
	const [value, setValue] = React.useState('all');
	const [search, setSearch] = React.useState('');
	const [dropdownColapse, setDropdownColapse] = React.useState(true);
	const [filterExpand, setFilterExpand] = React.useState(false);
	const [selectedFiltersTmp, setSelectedFiltersTmp] = React.useState(selectedFilters);

	React.useEffect(() => {
		onChangeFilter(value);
	}, [value, onChangeFilter]);

	React.useEffect(() => {
		onChangeSearch(search);
	}, [search, onChangeSearch]);

	const setOnSelectFilter = (option, item, checked) => {
		if (checked) {
			setSelectedFiltersTmp({ ...selectedFiltersTmp, [option]: [...selectedFiltersTmp[option], item] });
		} else {
			setSelectedFiltersTmp({ ...selectedFiltersTmp, [option]: [...selectedFiltersTmp[option].filter((o) => o !== item)] });
		}
	}

	return (
		<header className='subHeader' id='studentsSubHeader'>
			<input type="text" name="search" className='search' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search students by name or roll...' autoComplete='off' />
			
			<div className="filterDropdown">
				<div className={dropdownColapse ? "filterSelected" : "filterSelected expand"} onClick={() => setDropdownColapse(!dropdownColapse)}>
					<span className="selectedFilter">{dropdownFilterOptions.find((o) => o.value === value).label}</span>
					<span className='divider'></span>
					{dropdownColapse ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
				</div>
				<ul className={dropdownColapse ? "filterItems colapse" : "filterItems"}>
					{dropdownFilterOptions.map((o) => <li key={o.value} className={o.value === value ? 'active' : ''} onClick={() => { setValue(o.value); setDropdownColapse(true) }}>{o.label}</li>)}
				</ul>
			</div>

			<div className="filterIconContainer menuIconContainer optionsContainer">
				<FaFilter className='menuIcon' onClick={(e) => setFilterExpand(!filterExpand)} />
				<span className={filterExpand ? "background" : ""} onClick={(e) => setFilterExpand(!filterExpand)}></span>
				<nav className={filterExpand ? "filterOptions options expand" : "filterOptions options"} >
					<div className="filterBasis">
						{Object.keys(filterOptions).map((opt) => (
							<div key={opt}>
								<div className="optionCategory llv">
									<h4>Filter by {opt}</h4>
									<ul className='optionItemList llh'>
										{filterOptions[opt].map((item) => (
											<li key={item} className="optionItem llh">
												<input type="checkbox" name={item.replace(' ', '')} id={item.replace(' ', '')} checked={selectedFiltersTmp[opt].includes(item)} onChange={(e) => setOnSelectFilter(opt, item, e.target.checked)} />
												<label htmlFor={item.replace(' ', '')}>{item}</label>
											</li>
										))}
									</ul>
								</div>
								<hr />
							</div>
						))}
					</div>
					<div className="filterButtons llh">
						<div className="negativeBtn" onClick={(e) => { onSelectFilters(initFilters); setFilterExpand(false); }}>Clear</div>
						<div className="positiveBtn" onClick={(e) => { onSelectFilters(selectedFiltersTmp); setFilterExpand(false); }}>Apply</div>
					</div>
				</nav>
			</div>
			<div className="menuIconContainer">
				<SiMicrosoftexcel className='menuIcon' onClick={(e)=> navigate('upload')} />
			</div>
		</header>
	)
}
