import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import MainLayout from "../adminLayout";

export default function AddEducation() {
  const [newEducation, setNewEducation] = useState({
    id_education: null,
    id_users: null,
    jenis_sekolah: "",
    nama_sekolah: "",
    jurusan: "",
    tahun_mulai: "",
    tahun_akhir: "",
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
    const educationToEdit = localStorage.getItem("educationToEdit");
    if (educationToEdit) {
      setNewEducation(JSON.parse(educationToEdit));
      localStorage.removeItem("educationToEdit");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedEducation = { ...newEducation };
  
    if (checkAdmin === 1) {
      updatedEducation = {
        ...updatedEducation,
        id_users: id,
      };
    }
  
    try {
      if (updatedEducation.id_education) {
        await axios.put("http://localhost:3000/ubaheducation", updatedEducation);
        navigate("/admin/educationAdmin");
        toast.success("Pendidikan berhasil diupdate!", {
          duration: 5000,
        });
      } else {
        await axios.post("http://localhost:3000/tambaheducation", updatedEducation);
        navigate("/admin/educationAdmin");
      }
    } catch (error) {
      console.error("Error adding/updating education:", error);
      toast.error("Error adding/updating education");
    }
  
  };
  

  const handleCancel = () => {
    navigate("/admin/educationAdmin");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEducation({ ...newEducation, [name]: value });
  };

  return (
    <MainLayout>
      <main className="p-8 font-nunito w-full">
        <h2 className="text-xl font-bold">Detail Education</h2>
        <form className="mt-4 border p-8 grid gap-4" onSubmit={handleSubmit}>
          {checkAdmin === 1 ? (
            <div className="flex gap-4 mb-2">
              <label htmlFor="id_users" className="w-24">
                Id Users:
              </label>
              <input
                type="number"
                className="p-2 border rounded-lg border-slate-50 outline-none w-full h-8"
                id="id_users"
                name="id_users"
                value={id}
                onChange={handleChange}
                required
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
            <label htmlFor="jenis_sekolah" className="w-24">
              Jenis_sekolah:
            </label>
            <input
              type="text"
              className="border rounded-lg border-secondary-10 w-full h-8"
              id="jenis_sekolah"
              name="jenis_sekolah"
              value={newEducation.jenis_sekolah}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4 mb-2">
            <label htmlFor="nama_sekolah" className="w-24">
              Nama_sekolah:
            </label>
            <input
              className="p-2 border rounded-lg border-secondary-10 w-full h-8"
              type="text"
              id="nama_sekolah"
              name="nama_sekolah"
              value={newEducation.nama_sekolah}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-4 mb-2">
            <label htmlFor="jurusan" className="w-24">
              Jurusan:
            </label>
            <input
              className="p-2 border rounded-lg border-secondary-10 w-full h-8"
              type="text"
              id="jurusan"
              name="jurusan"
              value={newEducation.jurusan}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4 mb-2">
            <label htmlFor="tahun_mulai" className="w-24">
              Tahun_mulai:
            </label>
            <input
              className="p-2 border rounded-lg border-secondary-10 w-full h-8"
              type="number"
              id="tahun_mulai"
              name="tahun_mulai"
              value={newEducation.tahun_mulai}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-4 mb-2">
            <label htmlFor="tahun_akhir" className="w-24">
              Tahun_akhir:
            </label>
            <input
              className="p-2 border rounded-lg border-secondary-10 w-full h-8"
              type="number"
              id="tahun_akhir"
              name="tahun_akhir"
              value={newEducation.tahun_akhir}
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
      </main>
    </MainLayout>
  );
}
