import React from 'react';

export const StudentSelectionItem = ({student, selected, onSelectCandidate}) => {
    const id = student._id;

    return (
        <label htmlFor={id} className={selected ? "item fullWidth studentSelect selected llh" : "item fullWidth studentSelect llh"}>
            <input type='checkbox' checked={selected} id={id} name={id} onChange={(e) => onSelectCandidate(id, e.target.checked)}/>
            <div className="llv">
                <p className="categoryPath itemDetails itemRow">{student.degree + " / " + student.course + " / " + student.stream + " / " + student.regulation + " / " + student.semester + " / " + (student.isLateral ? "Lateral" : "Non-Lateral")}</p>
                <h3 className="title itemRow">{student.name}</h3>
                <p className="itemDetails itemRow">{student.univReg} - {student.univRoll}</p>
            </div>
        </label>
    )
};