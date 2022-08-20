import React from 'react';
import {useParams} from 'react-router-dom';
import API from '../API';
import {ExamItem} from './ExamItem';
import ExcelHandler from '../helpers/ExcelHandler';
import {ExamDetailsAllHalls} from './ExamDetailsAllHalls';
import {ExamDetailsAddHall} from "./ExamDetailsAddHall";

export const ExamDetails = () => {
    const currentTime = Date.now()
    const {id} = useParams();
    const [exam, setExam] = React.useState(null);
    const [child, setChild] = React.useState(0);


    React.useEffect(() => {
        fetch(API.EXAM_BY_ID.concat('?exam=', id)).then(async (res) => {
            if (res.ok) return res.json();
            throw new Error(await res.text());
        }).then((exam) => {
            setExam(exam);
        }).catch((e) => alert(e.message));
    }, [id]);

    React.useEffect(()=> {
        setChild(0);
    }, [exam]);

    const exportAttendance = () => {
        try {
            new ExcelHandler().exportAttendances(exam)
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <section className='llh'>
            <div className="sidebar llv">
                {exam ? <ExamItem exam={exam}/> : ""}
                <hr/>
                {exam && child === 0 && currentTime < exam.examStartingTime ?
                    <div className='sidebarButtons' onClick={(e) => setChild(1)}>Add New Hall</div>
                    :
                    <div className='sidebarButtons' onClick={(e) => setChild(0)}>Discard New Hall</div>}
                {exam && currentTime > exam.examEndingTime ?
                    <div className='sidebarButtons' onClick={exportAttendance}>Download Attendance</div> : ""}
            </div>
            <div className="main llh">
                {child === 0 ? <ExamDetailsAllHalls exam={exam}/> : <ExamDetailsAddHall exam={exam} onHallAdded={(exam)=> setExam(exam)}/>}
            </div>
        </section>
    );
};