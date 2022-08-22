import React from 'react'
import moment from 'moment';

export const ExamItem = ({exam, onClick}) => {
  return (
    <div className="item llv" onClick={(e)=> onClick(exam._id)}>
        <p className="categoryPath itemDetails itemRow">{exam.degree + " / " + exam.course + " / " + exam.stream + " / " + exam.regulation + " / " + exam.semester + " / " + exam.paper.code}</p>
        <h3 className="title itemRow">{exam.name}</h3>
        <div className="examTime itemRow llh">
        <p className="itemDetails">{moment(exam.examStartingTime).format('MMMM DD, YYYY')}</p>
                            <p className="itemDetails">{moment(exam.examStartingTime).format('hh:mm a') + " - " + moment(exam.examEndingTime).format('hh:mm a')}</p>
        </div>
        <p className="itemDetails itemRow">{exam.paper.code + " - " + exam.paper.name}</p>
    </div>
  )
};