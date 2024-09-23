import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import MainLayout from "../adminLayout";

export default function AddSkill() {
  const [newSkill, setNewSkill] = useState({
    id_skill: null,
    id_users: "",
    nama_skill: "",
    gambar: null,
    gambarUrl: null,
    tingkat_kemahiran: "",
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
    const skillToEdit = localStorage.getItem("skillToEdit");
    if (skillToEdit) {
      const parsedSkill = JSON.parse(skillToEdit);
      setNewSkill({
        ...parsedSkill,
        gambarUrl: `http://localhost:3000/${parsedSkill.gambar}`,
      });
      localStorage.removeItem("skillToEdit");
    }
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    checkAdmin === 1 ? formData.append('id_users', id) : formData.append("id_users", newSkill.id_users);
    formData.append("nama_skill", newSkill.nama_skill);
    formData.append("tingkat_kemahiran", newSkill.tingkat_kemahiran);

    if (newSkill.gambar) {
      formData.append("gambar", newSkill.gambar);
    } else {
      formData.append("gambarUrl", newSkill.gambarUrl);
    }

    if (newSkill.id_skill) {
      formData.append("id_skill", newSkill.id_skill);
      axios
        .put("http://localhost:3000/ubahskill", formData)
        .then(() => {
          toast.success("Skill updated successfully", {
            duration: 4000,
          });
          navigate("/admin/skillAdmin");
        })
        .catch((error) => {
          console.error("Ada kesalahan dalam menyimpan data:", error);
          toast.error("Skill update error");
        });
    } else {
      axios
        .post("http://localhost:3000/tambahskill", formData)
        .then(() => {
          toast.success("Skill added successfully");
          navigate("/admin/skillAdmin");
        })
        .catch((error) => {
          console.error("Error menambahkan skill:", error);
          toast.error("Error adding skill");
        });
    }
  };

  const handleCancel = () => {
    navigate("/admin/skillAdmin");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar") {
      const file = files[0];
      setNewSkill({
        ...newSkill,
        [name]: file,
        gambarUrl: URL.createObjectURL(file),
      });
    } else {
      setNewSkill({ ...newSkill, [name]: value });
    }
  };

  return (
    <MainLayout>
      <div className="p-8 w-full">
        <h2 className="text-xl font-nunito">Detail Skill</h2>
        <form className="mt-4 border p-8 grid gap-4" onSubmit={handleSubmit}>
          {checkAdmin === 1 ? (
            <div className="flex gap-4 mb-2">
              <label htmlFor="id_users" className="w-24">
                ID Users:
              </label>
              <input
                className="p-2 border rounded-lg border-slate-50 outline-none w-full h-8"
                id="id_users"
                name="id_users"
                type="number"
                placeholder="ID users"
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
            <label htmlFor="nama_skill" className="w-24">
              Nama Skill:
            </label>
            <input
              className="p-2 border rounded-lg border-secondary-10 w-full h-8"
              placeholder="Nama Skill"
              id="nama_skill"
              name="nama_skill"
              type="text"
              value={newSkill.nama_skill}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-4 mb-2">
            <label htmlFor="gambar" className="w-24">
              Gambar:
            </label>
            <input
              className="w-full h-8"
              id="gambar"
              name="gambar"
              type="file"
              onChange={handleChange}
            />
          </div>
          {newSkill.gambarUrl && (
            <div className="flex gap-4 mb-2">
              <label className="w-24">Preview:</label>
              <img src={newSkill.gambarUrl} className="mx-auto " />
            </div>
          )}
          <div className="flex gap-4 mb-2">
            <label htmlFor="tingkat_kemahiran" className="w-24">
              Tingkat Kemahiran:
            </label>
            <input
              className="p-2 border rounded-lg border-secondary-10 w-full h-8"
              placeholder="Tingkat Kemahiran"
              id="tingkat_kemahiran"
              type="text"
              name="tingkat_kemahiran"
              value={newSkill.tingkat_kemahiran}
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
        <Toaster
          toastOptions={{
            style: {
              zIndex: 9999,
            },
          }}
        />
      </div>
    </MainLayout>
  );
}
