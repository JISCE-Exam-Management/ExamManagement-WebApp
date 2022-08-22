const BASE_URL = "https://exammanagement-server.herokuapp.com";
// const BASE_URL = "http://localhost:8000";

const API = {
    ALL_ADMINS: BASE_URL.concat("/admin/all"),
    ADMIN_BY_ID: BASE_URL.concat("/admin"),
    ADMIN_SIGNUP: BASE_URL.concat("/admin/signup"),
    ADMIN_LOGIN: BASE_URL.concat("/admin/login"),
    UPDATE_ADMIN: BASE_URL.concat("/admin/update"),
    DELETE_ADMIN: BASE_URL.concat("/admin/delete"),


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
    STUDENT_BY_ID: BASE_URL.concat("/students"),
    STUDENTS_IN: BASE_URL.concat("/students/in"),
    INSERT_STUDENTS: BASE_URL.concat("/students/insert"),
    UPSERT_STUDENTS: BASE_URL.concat("/students/upsert"),
    UPDATE_STUDENT: BASE_URL.concat("/students/update"),
    DELETE_STUDENT: BASE_URL.concat("/students/delete"),
    
    ALL_EXAMS: BASE_URL.concat("/exams/all"),
    UPCOMING_EXAMS: BASE_URL.concat("/exams/upcoming"),
    ONGOING_EXAMS: BASE_URL.concat("/exams/ongoing"),
    COMPLETED_EXAMS: BASE_URL.concat("/exams/completed"),
    EXAM_BY_ID: BASE_URL.concat("/exams"),
    EXAM_CANDIDATES: BASE_URL.concat("/exams/candidates"),
    INSERT_EXAMS: BASE_URL.concat("/exams/insert"),
    UPSERT_EXAMS: BASE_URL.concat("/exams/upsert"),
    UPDATE_EXAM: BASE_URL.concat("/exams/update"),
    DELETE_EXAM: BASE_URL.concat("/exams/delete"),
    ADD_HALL: BASE_URL.concat("/exams/hall/add"),
    UPDATE_HALL: BASE_URL.concat("/exams/hall/update"),
    DELETE_HALL: BASE_URL.concat("/exams/hall/delete"),

    ALL_USERS: BASE_URL.concat("/user/all"),
    USER_BY_ID: BASE_URL.concat("/user"),
    USER_SIGNUP: BASE_URL.concat("/user/signup"),
    USER_LOGIN: BASE_URL.concat("/user/login"),
    UPDATE_USER: BASE_URL.concat("/user/update"),
    DELETE_USER: BASE_URL.concat("/user/delete")
    
};

export default API;