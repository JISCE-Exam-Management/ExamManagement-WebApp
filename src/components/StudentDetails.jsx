import React from 'react';
import { useParams } from 'react-router-dom';
import API from '../API';
import { PaperItem } from './PaperItem';

export const StudentDetails = () => {
    const { id } = useParams();
    const [student, setStudent] = React.useState(null);

    React.useEffect(() => {
        fetch(API.STUDENT_BY_ID.concat('?student=', id)).then(async (res) => {
            if (res.ok) return res.json();
            throw new Error(await res.text());
        }).then((student) => {
            setStudent(student);
        }).catch((e) => alert(e.message));
    }, [id]);

    return (
        <section className='llh'>
            <div className="sidebar llv">
                <div className="item llv">
                    <p className="categoryPath itemDetails itemRow">{student ? student.degree + " / " + student.course + " / " + student.stream + " / " + student.regulation + " / " + student.semester + " / " + (student.isLateral ? "Lateral" : "Non-Lateral") : ""}</p>
                    <h3 className="title itemRow">{student ? student.name : ""}</h3>
                    <p className="itemDetails itemRow">{student ? student.email : ""}</p>
                    <p className="itemDetails itemRow">{student ? student.phone : ""}</p>
                    <p className="itemDetails itemRow">{student ? student.collegeId : ""}</p>
                    <p className="itemDetails itemRow">{student ? student.univReg : ""}</p>
                    <p className="itemDetails itemRow">{student ? student.univRoll : ""}</p>
                </div>
            </div>
            <div className="main llh">
                <div className="regularPapers llv">
                    <div className="top">
                        <h2>Regular Papers</h2>
                    </div>
                    <div className="itemsContainer fixed">
                        {student ? student.regularPapers.map((paper) => <PaperItem key={paper.code} paper={paper} regular={true} />) : "Fetching regular papers..."}
                    </div>
                </div>
                <div className="backlogPapers llv">
                    <div className="top">
                        <h2>Backlog Papers</h2>
                    </div>
                    <div className="itemsContainer fixed">
                        {student ? student.backlogPapers.map((paper) => <PaperItem key={paper.code} paper={paper} regular={false} />) : "Fetching backlog papers..."}
                    </div>
                </div>
            </div>
        </section>
    )
}
