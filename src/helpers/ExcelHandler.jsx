import * as XLSX from 'xlsx';
import moment from 'moment';
import API from '../API';

export default class ExcelHandler {
    readStudents = (file) => {
        return new Promise((resolve, reject) => {
            const students = [];
            file.arrayBuffer().then((data) => {
                const wb = XLSX.read(data);
                const ws = wb.Sheets[wb.SheetNames[0]];
                const rows = XLSX.utils.sheet_to_json(ws, {header: 1, raw: false});
                for (let i = 1; i < rows.length; i++) {
                    const row = rows[i];
                    try {
                        students.push({
                            _id: row[4],
                            name: row[0],
                            email: row[1],
                            phone: row[2],
                            collegeId: row[3],
                            univRoll: parseInt(row[4]),
                            univReg: parseInt(row[5]),
                            admissionYear: parseInt(row[6]),
                            isLateral: JSON.parse(row[7]),
                            degree: row[8],
                            course: row[9],
                            stream: row[10],
                            regulation: row[11],
                            semester: row[12],
                            regularPapers: JSON.parse(row[13]),
                            backlogPapers: row[14] ? JSON.parse(row[14]) : []
                        });
                    } catch (e) {
                        console.log(e);
                    }
                }
                if (students.length === 0) {
                    reject(new Error("This file doesn't contains a valid schema for students! Please structure the file properly."));
                } else {
                    resolve(students);
                }
            }).catch((e) => {
                reject(e);
            });
        })
    };

    readExams = (file) => {
        return new Promise((resolve, reject) => {
            const exams = [];
            file.arrayBuffer().then((data) => {
                const wb = XLSX.read(data);
                const ws = wb.Sheets[wb.SheetNames[0]];
                const rows = XLSX.utils.sheet_to_json(ws, {header: 1, raw: false});
                for (let i = 1; i < rows.length; i++) {
                    const row = rows[i];
                    try {
                        exams.push({
                            name: row[0],
                            paper: JSON.parse(row[1]),
                            degree: row[2],
                            course: row[3],
                            stream: row[4],
                            regulation: row[5],
                            semester: row[6],
                            examStartingTime: moment(row[7] + " " + row[8], "YYYY-MM-DD hh:mm a").valueOf(),
                            examEndingTime: moment(row[7] + " " + row[9], "YYYY-MM-DD hh:mm a").valueOf(),
                            attendanceStartingTime: moment(row[7] + " " + row[10], "YYYY-MM-DD hh:mm a").valueOf(),
                            attendanceEndingTime: moment(row[7] + " " + row[11], "YYYY-MM-DD hh:mm a").valueOf(),
                            halls: []
                        });
                    } catch (e) {
                        console.log(e);
                    }
                }
                if (exams.length === 0) {
                    reject(new Error("This file doesn't contains any valid exam! Please structure the file properly."));
                } else {
                    resolve(exams);
                }
            }).catch((e) => {
                reject(e);
            });
        });
    };

    exportAttendances(exam) {
        const promises = [];
        exam.halls.forEach((hall) => {
            promises.push(fetch(API.STUDENTS_IN, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({students: Object.keys(hall.candidates)})
            }).then(async (res) => {
                if (res.ok) return res.json();
                throw new Error(await res.text());
            }));
        });

        const usersPromise = [];
        usersPromise.push(fetch(API.ALL_USERS).then(async (res) => {
            if (res.ok) return res.json();
            throw new Error(await res.text());
        }));
        usersPromise.push(fetch(API.ALL_ADMINS).then(async (res) => {
            if (res.ok) return res.json();
            throw new Error(await res.text());
        }));

        Promise.all(promises).then((result) => {
            Promise.all(usersPromise).then((usersRes)=> {
                const users = [...usersRes[0], ...usersRes[1]];
                const wb = XLSX.utils.book_new();
                const candidates = [];
                console.log("Result: ",result);
                result.forEach((res, i) => {
                    console.log("Res: ",res);
                    const hall = exam.halls[i];
                    res.forEach((student) => {
                        candidates.push({
                            "Name": student.name,
                            "Email": student.email,
                            "Phone": student.phone,
                            "College ID": student.collegeId,
                            "University Roll": student.univRoll.toString(),
                            "University Registration": student.univReg.toString(),
                            "Admission Year": student.admissionYear.toString(),
                            "Is Lateral": student.isLateral,
                            "Attendance": (hall.candidates[student._id] === true),
                            "Hall Name": hall.name,
                            "Updated By": users.find((u)=> u._id === hall.updatedBy).name,
                            "Updated Time": moment(hall.updatedTime).format("YYYY-MM-DD hh:mm a"),
                        });
                    })
                });
                const ws = XLSX.utils.json_to_sheet(candidates);
                ws['!cols'] = [
                    {wch: 30},
                    {wch: 50},
                    {wch: 15},
                    {wch: 15},
                    {wch: 17},
                    {wch: 20},
                    {wch: 10},
                    {wch: 10},
                    {wch: 15},
                    {wch: 15},
                    {wch: 30},
                    {wch: 30},
                ]
                XLSX.utils.book_append_sheet(wb, ws, exam.name);
                XLSX.writeFile(wb, exam.name.replace(' ', '_').concat('.xlsx'));
            })
        }).catch((e) => {
            throw e;
        });
    }
}