import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar/navbar";
import Profile from "./component/profile/profile";
import Work from "./component/work/work";
import Project from "./component/project/project";
import Skill from "./component/skill/skill";
import Education from "./component/education/education";
import Contact from "./component/contact/contact";
// import Admin from "./component/pages/admin/admin";
import Login from "./Users/login";
import Register from "./Users/register";
import ContactAdmin from "./component/pages/admin/contactAdmin/contact";
import EducationAdmin from "./component/pages/admin/educationAdmin/education";
import ProjectAdmin from "./component/pages/admin/projectAdmin/project";
import SkillAdmin from "./component/pages/admin/skillAdmin/skill";
import UsersAdmin from "./component/pages/admin/usersAdmin/users";
import WorkAdmin from "./component/pages/admin/workAdmin/work";
import AddContact from "./component/pages/admin/contactAdmin/settingContact";
import AddEducation from "./component/pages/admin/educationAdmin/settingEducation";
import AddSkill from "./component/pages/admin/skillAdmin/settingSkill";
import AddUsers from "./component/pages/admin/usersAdmin/settingUsers";
import AddProject from "./component/pages/admin/projectAdmin/settingProject";
import AddWork from "./component/pages/admin/workAdmin/settingWork";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Profile />
              <Work />
              <Project />
              <Skill />
              <Education />
              <Contact />
            </>
          }
        />
        <Route path="/admin/contactAdmin" element={<ContactAdmin />} />
        <Route path="/admin/educationAdmin" element={<EducationAdmin />} />
        <Route path="/admin/projectAdmin" element={<ProjectAdmin />} />
        <Route path="/admin/skillAdmin" element={<SkillAdmin />} />
        <Route path="/admin/usersAdmin" element={<UsersAdmin />} />
        <Route path="/admin/workAdmin" element={<WorkAdmin />} />
        <Route path="/detail-contact" element={<AddContact />} />
        <Route path="/detail-education" element={<AddEducation />} />
        <Route path="/detail-skill" element={<AddSkill />} />
        <Route path="/detail-users" element={<AddUsers />} />
        <Route path="/detail-project" element={<AddProject />} />
        <Route path="/detail-work" element={<AddWork />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
