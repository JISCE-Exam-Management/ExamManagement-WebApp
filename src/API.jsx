const BASE_URL = "https://exammanagement-server.herokuapp.com";

const API = {

    ADMIN_SIGNUP: BASE_URL.concat("/admin/signup"),
    ADMIN_LOGIN: BASE_URL.concat("/admin/login"),
    
    ALL_DEGREES: BASE_URL.concat("/degrees/all"),
    DEGREE_BY_ID: BASE_URL.concat("/degrees"),
    ADD_DEGREE: BASE_URL.concat("/degrees/add/degree"),
    ADD_COURSE: BASE_URL.concat("/degrees/add/course"),
    ADD_STREAM: BASE_URL.concat("/degrees/add/stream"),
    ADD_REGULATION: BASE_URL.concat("/degrees/add/regulation"),
    ADD_SEMESTER: BASE_URL.concat("/degrees/add/semester"),
    ADD_PAPER: BASE_URL.concat("/degrees/add/paper"),
    UPDATE_DEGREE: BASE_URL.concat("/degrees/update"),
    DELETE_DEGREE: BASE_URL.concat("/degrees/delete"),
    
    ALL_STUDENTS: BASE_URL.concat("/students/all"),
    GET_STUDENT_BY_ID: BASE_URL.concat("/students"),
    ADD_SINGLE_STUDENT: BASE_URL.concat("/students/add/single"),
    ADD_MULTIPLE_STUDENTS: BASE_URL.concat("/students/add/multiple"),
    UPDATE_STUDENT: BASE_URL.concat("/students/update"),
    DELETE_STUDENT: BASE_URL.concat("/students/delete"),
    
    ALL_EXAMS: BASE_URL.concat("/exams/all"),
    ONGOING_EXAMS: BASE_URL.concat("/exams/ongoing"),
    GET_EXAM_BY_ID: BASE_URL.concat("/exams"),
    EXAM_CANDIDATES: BASE_URL.concat("/exams/candidates"),
    HALL_CANDIDATES: BASE_URL.concat("/exams/hall/candidates"),
    ADD_SINGLE_EXAM: BASE_URL.concat("/exams/add/single"),
    ADD_MULTIPLE_EXAMS: BASE_URL.concat("/exams/add/multiple"),
    ADD_HALL: BASE_URL.concat("/exams/add/hall"),
    UPDATE_HALL: BASE_URL.concat("/exams/update/hall"),
    UPDATE_EXAM: BASE_URL.concat("/exams/update"),
    DELETE_HALL: BASE_URL.concat("/exams/delete/hall"),
    DELETE_EXAM: BASE_URL.concat("/exams/delete"),
    
    ALL_USERS: BASE_URL.concat("/user/all"),
    USER_BY_ID: BASE_URL.concat("/user"),
    USER_SIGNUP: BASE_URL.concat("/user/signup"),
    USER_LOGIN: BASE_URL.concat("/user/login"),
    UPDATE_USER: BASE_URL.concat("/user/update"),
    DELETE_USER: BASE_URL.concat("/user/delete")
};

export default API;