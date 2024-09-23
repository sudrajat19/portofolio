import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import MainLayout from "../adminLayout";

export default function AddProject() {
  const [newProject, setNewProject] = useState({
    id_project: null,
    id_users: "",
    nama_project: "",
    deskripsi_project: "",
    link_project: "",
  });
  const [showId, setShowId] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  let id, checkAdmin;
  if (!token) {
    navigate("/login");
  }

  if (token) {
    const decoded = jwtDecode(token);
    id = decoded.rows[0].id_users;
    checkAdmin = decoded.rows[0].role;
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tampil`);
        setShowId(response.data.values);
      } catch (error) {
        console.error("Ada kesalahan dalam mengambil data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const projectToEdit = localStorage.getItem("projectToEdit");
    if (projectToEdit) {
      setNewProject(JSON.parse(projectToEdit));
      localStorage.removeItem("projectToEdit");
    }
  }, []);
  console.log(showId)

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedProject = { ...newProject }
    if(checkAdmin === 1) {
      updatedProject = {
        ...updatedProject,
        id_users:id
      }
    }

    if (updatedProject.id_project) {
      axios
        .put("http://localhost:3000/ubahproject", updatedProject)
        .then(() => {
          toast.loading("Waiting...");
          toast.success("Project updated successfully", {
            duration: 4000,
          });
          navigate("/admin/projectAdmin");
        })
        .catch((error) => {
          console.error("Ada kesalahan dalam menyimpan data:", error);
          toast.error("Project update error");
        });
    } else {
      axios
        .post("http://localhost:3000/tambahproject", updatedProject)
        .then(() => {
          toast.loading("Waiting...");
          toast.success("Project added successfully");
          navigate("/admin/projectAdmin");
        })
        .catch((error) => {
          console.error("Error menambahkan project:", error);
          toast.error("Error adding project");
          console.log(newProject);
        });
    }
  };

  const handleCancel = () => {
    navigate("/admin/projectAdmin");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  return (
    <MainLayout>
      <div className="p-8 w-full">
        <h2 className="text-xl font-nunito">Pengelolaan Project</h2>
        <form className="mt-4 border p-8 grid gap-4" onSubmit={handleSubmit}>
          {checkAdmin === 1 ? (
            <div className="flex gap-4 mb-2">
              <label htmlFor="id_users" className="w-24">
                ID Users:
              </label>
              <input
                className="p-2 border rounded-lg border-slate-50 outline-none w-full h-8"
                id="id_users"
                placeholder="ID Users"
                name="id_users"
                type="text"
                value={id}
                onChange={handleChange}
                readOnly
              />
            </div>
          ) : (
            <div className="flex gap-4 mb-2">
              <label htmlFor="id_users" className="w-24">
                Id Users:
              </label>
              <select name="id_users" id="id_users">
                {showId.map((show, index) => (
                  <option key={index} value={show.id_users}>
                    {show.id_users}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex gap-4 mb-2">
            <label htmlFor="nama_project" className="w-24">
              Nama Project:
            </label>
            <input
              className="p-2 border rounded-lg border-secondary-10 w-full h-8"
              id="nama_project"
              placeholder="Nama Project"
              name="nama_project"
              type="text"
              value={newProject.nama_project}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-4 mb-2">
            <label htmlFor="deskripsi_project" className="w-24">
              Deskripsi Project:
            </label>
            <input
              className="p-2 border rounded-lg border-secondary-10 w-full h-8"
              id="deskripsi_project"
              placeholder="Deskripsi Project"
              type="text"
              name="deskripsi_project"
              value={newProject.deskripsi_project}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-4 mb-2">
            <label htmlFor="link_project" className="w-24">
              Link Project:
            </label>
            <input
              className="p-2 border rounded-lg border-secondary-10 w-full h-8"
              id="link_project"
              placeholder="Link Project"
              name="link_project"
              type="text"
              value={newProject.link_project}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-8 justify-end">
            <button
              type="submit"
              className="bg-secondary-10 p-2 w-[100px] rounded-md"
            >
              Simpan
            </button>
            <button
              type="button"
              className="bg-secondary-10 w-[100px] p-2 rounded-md"
              onClick={handleCancel}
            >
              Batal
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </MainLayout>
  );
}
