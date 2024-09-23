import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsOpen(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <nav className="h-[96px] flex justify-between px-6 py-3 border-b-gray-50 shadow-md fixed w-full bg-slate-50">
      <div>
        <h1 className="font-pacifico desktop-h1 text-secondary-10">
          Portofolio
        </h1>
      </div>
      <div>
      {isOpen && (
          <button
            onClick={handleLogout}
            className="bg-transparent hover:bg-red-500 text-secondary-10 hover:text-white font-semibold py-2 px-4 border border-secondary-10 hover:border-transparent rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
