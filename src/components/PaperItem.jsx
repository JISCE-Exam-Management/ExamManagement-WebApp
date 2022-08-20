import React from 'react';

export const PaperItem = ({ paper, regular }) => {
	return (
		<div className={regular ? "item fullWidth llv regular" : "item fullWidth backlog llv"}>
			<h3 className="title itemRow">{paper.name}</h3>
			<p className="itemDetails itemRow">{paper.code}</p>
		</div>
	)
};