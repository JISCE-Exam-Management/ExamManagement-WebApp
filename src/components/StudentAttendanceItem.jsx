import React from 'react';

export const StudentAttendanceItem = ({ candidates, student, ongoing }) => {
    const id = student._id;
    const [attendance, setAttendance] = React.useState(candidates[id]);
    
    React.useEffect(() => {
        if (candidates.hasOwnProperty(id)) candidates[id] = attendance;
    }, [attendance, candidates, id]);

    return (
        <div className="item fullWidth studentAttendance llh">
            <div className="llv">
                <p className="categoryPath itemDetails itemRow">{student.degree + " / " + student.course + " / " + student.stream + " / " + student.regulation + " / " + student.semester + " / " + (student.isLateral ? "Lateral" : "Non-Lateral")}</p>
                <h3 className="title itemRow">{student.name}</h3>
                <p className="itemDetails itemRow">{student.univReg}</p>
                <p className="itemDetails itemRow">{student.univRoll}</p>
            </div>
            <div className="attendanceArea">
                <div className="radioButton">
                    <input type="radio" name={id} id="present" value={true} checked={attendance === true} disabled={ !ongoing } onChange={(e) => { setAttendance(JSON.parse(e.target.value)) }} />
                    <span>Present</span>
                </div>
                <div className="radioButton">
                    <input type="radio" name={id} id="absent" value={false} checked={attendance === false} disabled={ !ongoing } onChange={(e) => { setAttendance(JSON.parse(e.target.value)) }} />
                    <span>Absent</span>
                </div>
            </div>
        </div>
    )
};