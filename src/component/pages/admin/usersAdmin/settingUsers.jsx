import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import MainLayout from "../adminLayout";

export default function AddUsers() {
  const [newUsers, setNewUsers] = useState({
    id_users: null,
    nama: "",
    password: "",
    photo: null,
    photoUrl: null,
    deskripsi: "",
    profesi: "",
    email: "",
    role: "",
  });
  const [showId,setShowId] = useState([])
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
    const userToEdit = localStorage.getItem("userToEdit");
    if (userToEdit) {
      const parsedUser = JSON.parse(userToEdit);
      setNewUsers({
        ...parsedUser,
        photoUrl: `http://localhost:3000/${parsedUser.photo}`,
      });
      localStorage.removeItem("userToEdit");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama", newUsers.nama);
    formData.append("password", newUsers.nama_password);
    formData.append("deskripsi", newUsers.deskripsi);
    formData.append("profesi", newUsers.profesi);
    formData.append("email", newUsers.email);
    formData.append("role", newUsers.role);
    

    if (newUsers.photo) {
      formData.append("photo", newUsers.photo);
    } else {
      formData.append("photoUrl", newUsers.photoUrl);
    }

    if (newUsers.id_users) {
      formData.append("id_users", newUsers.id_users);
      axios
        .put("http://localhost:3000/ubah", formData)
        .then(() => {
          toast.success("Users updated successfully", {
            duration: 4000,
          });
          navigate("/admin/usersAdmin");
        })
        .catch((error) => {
          console.error("Ada kesalahan dalam menyimpan data:", error);
          toast.error("Users update error");
        });
    } else {
      axios
        .post("http://localhost:3000/tambah", formData)
        .then(() => {
          toast.success("Users added successfully");
          navigate("/admin/usersAdmin");
        })
        .catch((error) => {
          console.error("Error menambahkan Users:", error);
          toast.error("Error adding Users");
        });
    }
  };

  const handleCancel = () => {
    navigate("/admin/usersAdmin");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      setNewUsers({
        ...newUsers,
        [name]: file,
        photoUrl: URL.createObjectURL(file),
      });
    } else {
      setNewUsers({ ...newUsers, [name]: value });
    }
  };

  return (
    <MainLayout>
      <div className="p-8 w-full">
        <h2 className="text-xl font-nunito">Detail Users</h2>
        <form className="mt-4 border p-8 grid gap-4" onSubmit={handleSubmit}>
          {checkAdmin === 1 ? (
            <div className="flex gap-4 mb-2">
              <label htmlFor="nama" className="w-24">
                Nama:
              </label>
              <input
                className="p-2 border rounded-lg border-slate-50 outline-none w-full h-8"
                id="nama"
                placeholder="Nama"
                name="nama"
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
            <label htmlFor="password" className="w-24">
              Password:
            </label>
            <input
              className="p-2 border rounded-lg border-secondary-10 w-full h-8"
              placeholder="Password"
              id="password"
              type="password"
              name="password"
              value={newUsers.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-4 mb-2">
            <label htmlFor="photo" className="w-24">
              Photo:
            </label>
            <input
              className=" w-full h-8"
              id="photo"
              name="photo"
              type="file"
              onChange={handleChange}
            />
          </div>
          {newUsers.photo && (
            <div className="flex gap-4 mb-2">
              <label className="w-24">Preview:</label>
              <img src={newUsers.photoUrl} className="mx-auto" />
            </div>
          )}
          <div className="flex gap-4 mb-2">
            <label htmlFor="deskripsi" className="w-24">
              Deskripsi:
            </label>
            <input
              className="p-2 border rounded-lg border-secondary-10 w-full h-8"
              placeholder="Deskripsi"
              id="deskripsi"
              type="text"
              name="deskripsi"
              value={newUsers.deskripsi}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-4 mb-2">
            <label htmlFor="profesi" className="w-24">
              Profesi:
            </label>
            <input
              className="p-2 border rounded-lg border-secondary-10 w-full h-8"
              placeholder="Profesi"
              id="profesi"
              type="text"
              name="profesi"
              value={newUsers.profesi}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-4 mb-2">
            <label htmlFor="email" className="w-24">
              Email:
            </label>
            <input
              className="p-2 border rounded-lg border-secondary-10 w-full h-8"
              placeholder="Email"
              id="email"
              type="email"
              name="email"
              value={newUsers.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-4 mb-2">
            <label htmlFor="role" className="w-24">
              Role:
            </label>
            <input
              className="p-2 border rounded-lg border-secondary-10 w-full h-8"
              placeholder="Role"
              id="role"
              type="number"
              name="role"
              value={newUsers.role}
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
