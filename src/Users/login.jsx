import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Google from '../assets/gambar/google.png';
import Navbar from "../component/pages/admin/navbar";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate(); 
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          navigate("/admin/contactAdmin");
        }
      }, [navigate]);
    const Auth = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/login', {
                email,
                password
            });
            if (response.data.success) {
                const { accessToken, refreshToken } = response.data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                navigate('/admin/contactAdmin'); 
            } else {
                setMsg(response.data.message);
            }
        } catch (error) {
            setMsg("Email atau Password salah");
        }
    }

    return (
        <>
            <Navbar />
            <div className="pt-[150px] grid justify-center">
                <div className="w-[518px] p-8 bg-gray shadow-lg border rounded-lg">
                    <p className='text-center text-base-semibold text-red-600'>{msg}</p>
                    <h1 className="desktop-h3 font-nunito font-bold text-center">Login</h1>
                    <div>
                        <form onSubmit={Auth} className="font-nunito mb-14">
                            <div className="my-4 gap-3 grid ">
                                <label htmlFor="email" className="w-24 font-bold ">
                                    Email:
                                </label>
                                <input
                                    className="w-full h-[44px] p-4 rounded-md border-2"
                                    id="email"
                                    type="email"
                                    placeholder="Masukkan Email"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4 gap-3 grid">
                                <label htmlFor="password" className="w-24 font-bold ">
                                    Kata Sandi:
                                </label>
                                <input
                                    className="w-full h-[44px] p-4 rounded-md border-2"
                                    id="password"
                                    type="password"
                                    placeholder="Masukkan Kata Sandi"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="bg-secondary-10 w-full rounded-md font-semibold h-[44px]">
                                Login
                            </button>
                        </form>
                    </div>
                    <div className='grid gap-8'>
                        <div className="my-8 flex gap-2">
                            <div className="line mt-3"></div>
                            <p>atau</p>
                            <div className="line mt-3"></div>
                        </div>
                        <button className="border w-full rounded-md font-semibold h-[44px] flex gap-3 place-content-center p-2">
                            <img src={Google} className='w-8 h-8' alt="Google" />
                            Login dengan Google
                        </button>
                        <p className="justify-self-center text-[#888888]">
                            Belum Punya Akun?
                            <span
                                className="text-black font-semibold underline ml-2 cursor-pointer"
                                onClick={() => navigate('/register')}
                            >
                                Daftar
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
