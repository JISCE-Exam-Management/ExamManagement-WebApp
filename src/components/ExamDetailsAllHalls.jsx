import React from 'react';
import API from '../API';
import {HallItem} from './HallItem';
import {StudentAttendanceItem} from './StudentAttendanceItem';

export const ExamDetailsAllHalls = ({exam}) => {
    const ME = JSON.parse(sessionStorage.getItem("ME"));
    const currentTime = Date.now()
    const [selectedHall, setSelectedHall] = React.useState(null);
    const [candidates, setCandidates] = React.useState(null);
    const [searchHalls, setSearchHalls] = React.useState('');
    const [searchCandidates, setSearchCandidates] = React.useState('');
    const [updating, setUpdating] = React.useState(false);

    React.useEffect(() => {
        setCandidates(null);
        if (selectedHall && Object.keys(selectedHall.candidates).length > 0) {
            fetch(API.STUDENTS_IN, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({students: Object.keys(selectedHall.candidates)})
            }).then(async (res) => {
                if (res.ok) return res.json();
                throw new Error(await res.text());
            }).then((candidates) => {
                setCandidates(candidates);
            }).catch((e) => alert(e.message));
        }
    }, [selectedHall]);

    React.useEffect(() => {
        if (exam && !selectedHall && exam.halls.length > 0) {
            setSelectedHall(exam.halls[0]);
        }
    }, [exam, selectedHall]);

    const submitAttendance = () => {
        setUpdating(true);
        setSelectedHall({...selectedHall, updatedBy: ME._id});
        setSelectedHall({...selectedHall, updatedTime: Date.now()});
        fetch(API.UPDATE_HALL.concat("?exam=", exam._id), {
            method: "PATCH", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(selectedHall)
        }).then(async (res) => {
            if (res.ok) return res.json();
            throw new Error(await res.text());
        }).then((newExam) => {
            alert("Attendance updated successfully.");
            exam = newExam;
            setUpdating(false);
        }).catch((e) => {
            alert(e.message);
            setUpdating(false);
        });
    }

    return (<>
        <div className="halls llv">
            <div className="top llv">
                <h2 className='itemRow'>Assigned Halls</h2>
                <input type="text" name="search" className='search itemRow' value={searchHalls}
                       onChange={(e) => setSearchHalls(e.target.value)} placeholder='Search halls by name...'
                       autoComplete='off'/>
                <p className="itemDetails count itemRow">{exam ? "Total " + exam.halls.length + " halls are assigned." : "Fetching halls..."}</p>
            </div>
            <div className="itemsContainer fixed">
                {exam ? exam.halls.filter((hall) => hall.name.toLowerCase().includes(searchHalls.toLowerCase())).map((hall) =>
                    <HallItem key={hall._id} hall={hall} selected={selectedHall && selectedHall._id === hall._id}
                              onClick={(e) => {
                                  setSelectedHall(hall)
                              }}/>) : ""}
            </div>
        </div>
        <div className="candidates llv">
            <div className="top llv">
                <h2 className='itemRow'>Assigned Candidates</h2>
                <input type="text" name="search" className='search itemRow' value={searchCandidates}
                       onChange={(e) => setSearchCandidates(e.target.value)}
                       placeholder='Search candidates by name or roll...' autoComplete='off'/>
                <div className="itemRow llh">
                    <p className="itemDetails count">{candidates ? "Total " + candidates.length + " candidates are assigned." : "Fetching Candidates..."}</p>
                    {!updating && selectedHall && (exam.examStartingTime <= currentTime && exam.examEndingTime >= currentTime) ?
                        <button className="positiveBtn" id="attendanceSubmitButton"
                                onClick={submitAttendance}>Submit Attendance</button> : ""}
                </div>
            </div>
            <div className="itemsContainer fixed">
                {candidates ? candidates.filter((candidate) => candidate.name.toLowerCase().includes(searchCandidates.toLowerCase()) || candidate.univRoll.toString().includes(searchCandidates.toLowerCase())).map((candidate) =>
                    <StudentAttendanceItem key={candidate._id} candidates={selectedHall.candidates}
                                           student={candidate}
                                           ongoing={exam.examStartingTime <= currentTime && exam.examEndingTime >= currentTime}/>) : ""}
            </div>
        </div>
    </>)
}
