import React from 'react'

export const StudentItem = ({ student, onClick }) => {
    return (
        <div className="item llv" onClick={(e)=> onClick(student._id)}>
            <p className="categoryPath itemDetails itemRow">{student.degree + " / " + student.course + " / " + student.stream + " / " + student.regulation + " / " + student.semester + " / " + (student.isLateral ? "Lateral" : "Non-Lateral")}</p>
            <h3 className="title itemRow">{student.name}</h3>
            <p className="itemDetails itemRow">{student.univReg} - {student.univRoll}</p>
            <p className="itemDetails itemRow">{student.collegeId}</p>
        </div>
    )
};