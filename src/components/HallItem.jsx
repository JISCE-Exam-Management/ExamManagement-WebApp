import React from 'react';

export const HallItem = ({ hall, onClick, selected }) => {
	return (
		<div className={selected ? "item fullWidth llv selected" : "item fullWidth llv"} onClick={onClick}>
			<h3 className="title itemRow">{hall.name}</h3>
			<p className="itemDetails itemRow">{hall.updatedBy ? [...Object.values(hall.candidates)].filter((value)=> value).length + ' of ' + Object.keys(hall.candidates).length + ' candidates are present.' : 'Attendance not updated yet.'}</p>
		</div>
	)
};