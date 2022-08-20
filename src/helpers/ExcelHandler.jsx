import * as XLSX from 'xlsx';
import API from '../API';

export default class ExcelHandler {
    readStudents = (file) => {
        return new Promise((resolve, reject) => {
            const students = [];
            file.arrayBuffer().then((data) => {
                const wb = XLSX.read(data);
                const ws = wb.Sheets[wb.SheetNames[0]];
                const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
                try {
                    for (let i = 1; i < rows.length; i++) {
                        const row = rows[i];
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
                    }
                    resolve(students);
                } catch (e) {
                    reject(new Error("This file doesn't contains a valid schema for students!"));
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
                const rows = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false });
                try {
                    for (let i = 1; i < rows.length; i++) {
                        const row = rows[i];
                        exams.push({
                            name: row[0],
                            paper: JSON.parse(row[1]),
                            degree: row[2],
                            course: row[3],
                            stream: row[4],
                            regulation: row[5],
                            semester: row[6],
                            examStartingTime: new Date(row[7] + " " + row[8]).getTime(),
                            examEndingTime: new Date(row[7] + " " + row[9]).getTime(),
                            attendanceStartingTime: new Date(row[7] + " " + row[10]).getTime(),
                            attendanceEndingTime: new Date(row[7] + " " + row[11]).getTime(),
                            halls: []
                        });
                    }
                    resolve(exams);
                } catch (e) {
                    reject(new Error("This file doesn't contains a valid schema for exams!"));
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ students: Object.keys(hall.candidates) })
            }).then(async (res) => {
                if (res.ok) return res.json();
                throw new Error(await res.text());
            }));
        });

        Promise.all(promises).then((result) => {
            const wb = XLSX.utils.book_new();
            result.forEach((res, i) => {
                const hall = exam.halls[i];
                const candidates = [];
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
                        "Attendance": (hall.candidates[student._id] === true)
                    });
                })
                const ws = XLSX.utils.json_to_sheet(candidates);
                ws['!cols'] = [
                    {wch: 20},
                    {wch: 30},
                    {wch: 15},
                    {wch: 15},
                    {wch: 17},
                    {wch: 20},
                    {wch: 10},
                    {wch: 10},
                    {wch: 10},
                ]
                XLSX.utils.book_append_sheet(wb, ws, hall.name);
            });
            XLSX.writeFile(wb, exam.name.replace(' ', '_').concat('.xlsx'));
        }).catch((e) => {
            throw e;
        });
    }
}