import React from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../API';
import { StudentItem } from './StudentItem';
import { StudentsSubHeader } from './StudentsSubHeader';

export const Students = () => {
    const navigate = useNavigate();
    const [search, setSearch] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [students, setStudents] = React.useState([]);
    const [filteredStudents, setFilteredStudents] = React.useState([]);

    const dropdownFilterOptions = [
		{ value: 'all', label: 'ALL Students' },
		{ value: 'regular', label: 'Regular Students' },
		{ value: 'lateral', label: 'Lateral Students' }
	];

    const degrees = new Set();
    const courses = new Set();
    const streams = new Set();
    const regulations = new Set();
    const semesters = new Set();

    const initFilter = {
        degree: [],
        course: [],
        stream: [],
        regulation: [],
        semester: []
    }
    const [filterOptions, setFilterOptions] = React.useState(initFilter);
    const [selectedFilters, setSelectedFilters] = React.useState(initFilter);

    React.useEffect(() => {
        fetch(API.ALL_STUDENTS).then(async (res) => {
            if (res.ok) return res.json();
            throw new Error(await res.text());
        }).then((students) => {
            setStudents(students);
        }).catch((e) => alert(e.message));
    }, []);

    React.useEffect(() => {
        students.forEach((exam) => {
            degrees.add(exam.degree);
            courses.add(exam.course);
            streams.add(exam.stream);
            regulations.add(exam.regulation);
            semesters.add(exam.semester);
        });
        setFilterOptions({
            degree: Array.from(degrees).sort(),
            course: Array.from(courses).sort(),
            stream: Array.from(streams).sort(),
            regulation: Array.from(regulations).sort(),
            semester: Array.from(semesters).sort()
        });
    }, [students]);

    React.useEffect(() => {
        setFilteredStudents(students.filter((s)=> {
            let check = true;
            Object.entries(selectedFilters).forEach(([k, v])=> {
                if(v.length > 0 && !v.includes(s[k])) {
                    check = false;
                }
            });
            return check && ((category === 'all') || (category === 'regular' && !s.isLateral) || (category === 'lateral' && s.isLateral));
        }));
    }, [category, students, selectedFilters]);

    return (
        <section className='child withHeader'>
            <StudentsSubHeader onChangeSearch={setSearch} onChangeFilter={setCategory} dropdownFilterOptions={dropdownFilterOptions} initFilters={initFilter}  filterOptions={filterOptions} selectedFilters={selectedFilters} onSelectFilters={setSelectedFilters} />
            <div className="itemsContainer">
                {filteredStudents.filter((student) => student.name.toLowerCase().includes(search.toLowerCase()) || student.univRoll.toString().includes(search.toLowerCase())).map((student) => <StudentItem key={student._id} student={student} onClick={(id) => navigate(id)} />)}
            </div>
        </section>
    )
};