import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Authentication} from "./components/Authentication";
import {Home} from "./components/Home";
import PrivateRoute from "./helpers/PrivateRoutes";
export const App = (props) => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/authentication" element={<Authentication />}/>
				<Route path="/" element={
					<PrivateRoute>
						<Home />
					</PrivateRoute>
				}/>
			</Routes>
		</BrowserRouter>
	);
};
