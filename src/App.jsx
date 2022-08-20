import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Authentication } from "./components/Authentication";
import { Home } from "./components/Home";
import { Exams } from "./components/Exams";
import { Students } from "./components/Students";
import { Users } from "./components/Users";
import { ExamDetails } from "./components/ExamDetails";
import { StudentDetails } from "./components/StudentDetails";
import PrivateRoute from "./helpers/PrivateRoutes";
import { TYPE_EXAM, TYPE_STUDENT, UploadExcel } from "./components/UploadExcel";

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/authentication" element={<Authentication />} />

				<Route path="/" element={<PrivateRoute element={<Home />} />} >
					<Route path="/" element={<Navigate to="/exams" replace />} />
					<Route path="/exams" element={<PrivateRoute element={<Exams />} />} />
					<Route path="/exams/upload" element={<PrivateRoute element={<UploadExcel type={TYPE_EXAM} />} />} />
					<Route path="/exams/:id" element={<PrivateRoute element={<ExamDetails />} />} />
					<Route path="/students" element={<PrivateRoute element={<Students />} />} />
					<Route path="/students/upload" element={<PrivateRoute element={<UploadExcel type={TYPE_STUDENT} />} />} />
					<Route path="/students/:id" element={<PrivateRoute element={<StudentDetails />} />} />
					<Route path="/users" element={<PrivateRoute element={<Users />} />} />
					<Route path="*" element={<Navigate to="/exams" replace />} />
				</Route>

			</Routes>
		</BrowserRouter>
	);
};
