import React from 'react'
import DateTimeFormatter from '../helpers/DateTimeFormatter';

export const ExamItem = ({exam, onClick}) => {
  return (
    <div className="item llv" onClick={(e)=> onClick(exam._id)}>
        <p className="categoryPath itemDetails itemRow">{exam.degree + " / " + exam.course + " / " + exam.stream + " / " + exam.regulation + " / " + exam.semester + " / " + exam.paper.code}</p>
        <h3 className="title itemRow">{exam.name}</h3>
        <div className="examTime itemRow llh">
        <p className="itemDetails">{new DateTimeFormatter(exam.examStartingTime).toDate()}</p>
                            <p className="itemDetails">{new DateTimeFormatter(exam.examStartingTime).toTime() + " - " + new DateTimeFormatter(exam.examEndingTime).toTime()}</p>
        </div>
        <p className="itemDetails itemRow">{exam.paper.code + " - " + exam.paper.name}</p>
    </div>
  )
};