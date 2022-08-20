import React from 'react'
import API from "../API";
import {StudentSelectionItem} from "./StudentSelectionItem";

export const ExamDetailsAddHall = ({exam, onHallAdded}) => {
    const init = {
        name: "",
        candidates: {},
    }
    const [candidates, setCandidates] = React.useState(null);
    const [searchCandidates, setSearchCandidates] = React.useState('');
    const [hall, setHall] = React.useState(init);


    React.useEffect(() => {
        fetch(API.EXAM_CANDIDATES.concat('?exam=', exam._id)).then(async (res) => {
            if (res.ok) return res.json();
            throw new Error(await res.text());
        }).then((candidates) => {
            setCandidates(candidates);
        }).catch((e) => alert(e.message));
    }, [exam]);

    const onSelectCandidate = (id, selected)=> {
        const candidates = hall.candidates;
        if (selected) {
            candidates[id] = null;
            setHall({...hall, candidates: candidates})
        } else {
            delete candidates[id];
            setHall({...hall, candidates: candidates})
        }
    }

    const addNewHall = ()=> {
        if (!hall.name.trim()) {
            alert("Hall name is required!");
        } else if (Object.keys(hall.candidates).length === 0) {
            alert("Please select candidates!");
        } else {
            fetch(API.ADD_HALL.concat('?exam=', exam._id), {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(hall)
            }).then(async (res) => {
                if (res.ok) return res.json();
                throw new Error(await res.text());
            }).then((e) => {
                onHallAdded(e);
            }).catch((e) => alert(e.message));
        }
    }

    return (
        <>
            <div className="halls llv">
                <div className="top llv">
                    <h2 className='itemRow'>Enter Hall Details</h2>
                </div>
                	<div className="hallRegistration">
                        <div className="hallDetails llv">
                            <input className="textBox itemRow" type="text" name="name" placeholder="Enter Hall Name" value={hall.name} onChange={(e) => setHall({...hall, name: e.target.value})} />
                            <button className={"positiveBtn itemRow"} onClick={addNewHall}>Add Hall</button>
                        </div>
                    </div>
            </div>
            <div className="candidates llv">
                <div className="top llv">
                    <h2 className='itemRow'>Select Candidates</h2>
                    <input type="text" name="search" className='search itemRow' value={searchCandidates}
                           onChange={(e) => setSearchCandidates(e.target.value)}
                           placeholder='Search candidates by name or roll...' autoComplete='off'/>
                    <p className="itemDetails count itemRow">{candidates ? "Total " + Object.keys(hall.candidates).length + " of " + candidates.length + " candidates are selected." : "Fetching suitable candidates..."}</p>
                </div>
                <div className="itemsContainer fixed">
                    {candidates ? candidates.filter((candidate) => candidate.name.toLowerCase().includes(searchCandidates.toLowerCase()) || candidate.univRoll.toString().includes(searchCandidates.toLowerCase())).map((student) =>
                        <StudentSelectionItem key={student._id} student={student} selected={hall.candidates.hasOwnProperty(student._id)} onSelectCandidate={onSelectCandidate} />) : ""}
                </div>
            </div>
        </>
    )
}
