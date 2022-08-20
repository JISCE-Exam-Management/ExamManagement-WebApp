import React from 'react';
import API from '../API';
import { useNavigate } from 'react-router-dom';
import { ExamItem } from './ExamItem';
import { ExamsSubHeader } from './ExamsSubHeader';

export const Exams = () => {
    const navigate = useNavigate();
    const [search, setSearch] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [exams, setExams] = React.useState([]);
    const [filteredExams, setFilteredExams] = React.useState([]);

    const dropdownFilterOptions = [
        { value: 'all', label: 'ALL Exams' },
        { value: 'ongoing', label: 'Ongoing Exams' },
        { value: 'upcoming', label: 'Upcoming Exams' },
        { value: 'completed', label: 'Completed Exams' }
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
        fetch(API.ALL_EXAMS).then(async (res) => {
            if (res.ok) return res.json();
            throw new Error(await res.text());
        }).then((exams) => {
            setExams(exams);
        }).catch((e) => alert(e.message));
    }, []);

    React.useEffect(() => {
        exams.forEach((exam) => {
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
    }, [exams]);

    React.useEffect(() => {
        const currentTime = Date.now();
        setFilteredExams(exams.filter((e)=> {
            let check = true;
            Object.entries(selectedFilters).forEach(([k, v])=> {
                if(v.length > 0 && !v.includes(e[k])) {
                    check = false;
                }
            });
            return check && ((category === 'all') || (category === 'upcoming' && e.examStartingTime > currentTime) || (category === 'ongoing' && e.examStartingTime <= currentTime && e.examEndingTime >= currentTime) || (category === 'completed' && e.examEndingTime < currentTime));
        }));
    }, [category, exams, selectedFilters]);

    return (
        <section className='child withHeader'>
            <ExamsSubHeader onChangeSearch={setSearch} onChangeFilter={setCategory} dropdownFilterOptions={dropdownFilterOptions} initFilters={initFilter}  filterOptions={filterOptions} selectedFilters={selectedFilters} onSelectFilters={setSelectedFilters} />
            <div className="itemsContainer">
                {filteredExams.filter((exam) => exam.name.toLowerCase().includes(search.toLowerCase())).map((exam) => <ExamItem key={exam._id} exam={exam} onClick={(id) => navigate(id)} />)}
            </div>
        </section>
    )
};
