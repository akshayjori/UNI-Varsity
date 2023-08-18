import { Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import "./App.css";
import "./css/common.css";
import "./css/bootstrap.css";
import store from "./store";
import AuthRoute from "./components/AuthRoute";
import IntroPage from "./components/IntroPage";
import Authenticator from "./components/Authenticator";
import CourseEnrollment from "./components/CourseEnrollment";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Admin from "./components/Admin";
import StudentManager from "./components/StudentManager";
import CoursePage from "./components/CoursePage";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Authenticator />
        <Navbar />
        <div className="my-container">
          <Routes>
            <Route path="/about" element={<IntroPage />} exact />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <AuthRoute>
                  <Home />
                </AuthRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthRoute>
                  <Profile />
                </AuthRoute>
              }
            />
            <Route
              path="/manage/students"
              element={
                <AuthRoute>
                  <Admin />
                  <StudentManager />
                  <Admin />
                </AuthRoute>
              }
            />
            <Route
              path="/courses/enroll"
              element={
                <AuthRoute>
                  <CourseEnrollment />
                </AuthRoute>
              }
            />
            <Route
              path="/courses/:courseName"
              element={
                <AuthRoute>
                  <CoursePage />
                </AuthRoute>
              }
            />

            {/* <Route
              path="admin/viewall"
              element={
                <Admin>
                  <AllEmployeesTable />
                </Admin>
              }
            />
            <Route
              path="admin/update/:empid"
              element={
                <Admin>
                  <EmployeeInfo reasonFor="update-emp" />
                </Admin>
              }
            />
            <Route
              path="/admin/profile"
              element={
                <Admin>
                  <EmployeeInfo reasonFor="update-self" />
                </Admin>
              }
            />
            <Route
              path="/register-new"
              element={
                <Admin>
                  <EmployeeInfo reasonFor="register" />
                </Admin>
              }
            />
            <Route
              path="view/:empid"
              element={
                <AuthRoute>
                  <EmployeeInfo reasonFor="view" />
                </AuthRoute>
              }
            />
            <Route
              path="update/:empid"
              element={
                <AuthRoute>
                  <EmployeeInfo reasonFor="update-self" />
                </AuthRoute>
              }
            /> */}
            <Route
              path="/unauthorized"
              element={<h1>You are not authorized to see this page</h1>}
            />
            <Route path="*" element={<h1>No page mapped for this url</h1>} />
          </Routes>
        </div>
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
