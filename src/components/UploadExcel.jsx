import React from 'react';
import { SiMicrosoftexcel } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import API from '../API';
import ExcelHandler from '../helpers/ExcelHandler';
import { ExamItem } from './ExamItem';
import { StudentItem } from './StudentItem';

export const TYPE_EXAM = 0;
export const TYPE_STUDENT = 1;

export const UploadExcel = ({ type }) => {
    const navigate = useNavigate();
    const [file, setFile] = React.useState(null);
    const [tmpFile, setTmpFile] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        if (tmpFile) {
            if (type === TYPE_EXAM) {
                new ExcelHandler().readExams(tmpFile)
                    .then((exams) => {
                        setFile(tmpFile);
                        setItems(exams);
                    }).catch((e) => {
                        setTmpFile(null);
                        alert(e.message);
                    });
            } else {
                new ExcelHandler().readStudents(tmpFile)
                    .then((students) => {
                        setFile(tmpFile);
                        setItems(students);
                    }).catch((e) => {
                        setTmpFile(null);
                        alert(e.message);
                    });
            }
        } else {
            setFile(null);
            setItems([]);
        }
    }, [tmpFile, type]);

    const uploadBulk = () => {
        setUploading(true);
        const url = (type === TYPE_EXAM) ? API.INSERT_EXAMS : API.UPSERT_STUDENTS;
        const name = (type === TYPE_EXAM) ? "exams" : "students";
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ [name]: items })
        }).then(async (res) => {
            if (res.ok) return res.json();
            throw new Error(await res.text());
        }).then((res) => {
            navigate(-1);
        }).catch((e) => {
            setUploading(false);
            alert(e.message);
        });
    }

    return (
        <section>
            <div className="uploadFile">
                <label htmlFor="excel" className='llv'>
                    <input type="file" name="excel" id="excel" accept='.xlsx,.xls' onChange={(e) => setTmpFile(e.target.files[0])} />
                    <SiMicrosoftexcel />
                    <span>{file ? file.name : type === TYPE_EXAM ? "Upload or drag excel file here containing exams" : "Upload or drag excel file here containing students"}</span>
                </label>
                {file ? <div className="details llh">
                    <p>This file contains {items.length} {type === TYPE_EXAM ? 'exams' : 'students'}</p>
                    {uploading ? "Uploading data..." :
                        <div className="buttons llh">
                            <div className="negativeBtn" onClick={(e) => setTmpFile(null)}>Clear</div>
                            <div className="positiveBtn" onClick={uploadBulk}>Upload</div>
                        </div>
                    }
                </div> : ""}
            </div>
            <div className="showData">
                <div className="itemsContainer">
                    {items.map((item, i) => type === TYPE_EXAM ? <ExamItem key={i} exam={item} /> : <StudentItem key={i} student={item} />)}
                </div>
            </div>
        </section>
    )
}
