import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import MainLayout from "../adminLayout";

export default function AddWork() {
  const [newWork, setNewWork] = useState({
    id_work: null,
    id_users: "",
    nama_perusahaan: "",
    awal_kerja: "",
    akhir_kerja: "",
    deskripsi_perusahaan: "",
  });
  const [showId, setShowId] = useState([])
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
    const workToEdit = localStorage.getItem("workToEdit");
    if (workToEdit) {
      const parsedWork = JSON.parse(workToEdit);
      setNewWork(parsedWork);
      localStorage.removeItem("workToEdit");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let updateWork = { ...newWork }
    if(checkAdmin ===1){
      updateWork = {
        ...updateWork, id_users:id
      }
    }

    if (updateWork.id_work) {
      axios
        .put("http://localhost:3000/ubahwork", updateWork)
        .then(() => {
          toast.success("Work updated successfully", {
            duration: 4000,
          });
          navigate("/admin/workAdmin");
        })
        .catch((error) => {
          console.error("Ada kesalahan dalam menyimpan data:", error);
          toast.error("Work update error");
        });
    } else {
      axios
        .post("http://localhost:3000/tambahwork", updateWork)
        .then(() => {
          toast.success("Work added successfully");
          navigate("/admin/workAdmin");
        })
        .catch((error) => {
          console.error("Error menambahkan pekerjaan:", error);
          toast.error("Error adding work");
        });
    }
  };

  const handleCancel = () => {
    navigate("/admin/workAdmin");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewWork({ ...newWork, [name]: value });
  };

  return (
    <MainLayout>
      <div className="p-8 w-full">
        <h2 className="text-xl font-nunito">Pengelolaan Pekerjaan</h2>
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
                type="number"
                name="id_users"
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
            <label htmlFor="nama_perusahaan" className="w-24">
              Nama Perusahaan:
            </label>
            <input
              className="p-2 border rounded-lg border-secondary-10 w-full h-8"
              id="nama_perusahaan"
              placeholder="Nama Perusahaan"
              type="text"
              name="nama_perusahaan"
              value={newWork.nama_perusahaan}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-4 mb-2">
            <label htmlFor="awal_kerja" className="w-24">
              Awal Kerja:
            </label>
            <input
              className="p-2 border rounded-lg border-secondary-10 w-full h-8"
              id="awal_kerja"
              placeholder="Awal Kerja"
              type="number"
              name="awal_kerja"
              value={newWork.awal_kerja}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-4 mb-2">
            <label htmlFor="akhir_kerja" className="w-24">
              Akhir Kerja:
            </label>
            <input
              className="p-2 border rounded-lg border-secondary-10 w-full h-8"
              id="akhir_kerja"
              placeholder="Akhir Kerja"
              type="number"
              name="akhir_kerja"
              value={newWork.akhir_kerja}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-4 mb-2">
            <label htmlFor="deskripsi_perusahaan" className="w-24">
              Deskripsi Perusahaan:
            </label>
            <input
              className="p-2 border rounded-lg border-secondary-10 w-full h-8"
              id="deskripsi_perusahaan"
              placeholder="Deskripsi Perusahaan"
              type="text"
              name="deskripsi_perusahaan"
              value={newWork.deskripsi_perusahaan}
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
