import { Link } from "react-scroll";
import logo from "../../assets/gambar/logos2.png";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed w-full h-[100px] px-[20px] md:px-[50px] lg:px-[100px] bg-brand-500 text-slate-100 shadow-lg z-10">
      <div className="flex justify-between items-center   py-6">
        <img className="w-[138px] active:translate-y-1" src={logo} alt="Logo" />
        <ul className="hidden lg:flex items-center gap-10 ">
          <Navigasi />
          <li className="relative bottom-2 block">
            <button className="bg-secondary-500 text-brand-500 text-sm-medium mt-4 rounded-lg w-[114px] h-[36px]">Download CV</button>
          </li>
        </ul>
        <div className="lg:hidden">
          <div className="navbar]">
            <div className={`hamburger-menu ${isMenuOpen ? "change" : ""}`} onClick={handleToggleMenu}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden bg-brand-500 p-10 ">
          <div className="flex flex-col items-center py-4 h-screen m-auto">
            <ul className="flex flex-col text-sm-bold items-center gap-10">
              <Navigasi />
              <li className="relative bottom-2">
                <button className="bg-secondary-500 text-brand-500 text-sm-medium mt-4 rounded-lg w-[114px] h-[36px]">Download CV</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function Navigasi() {
  const links = [
    { to: "resume", text: "Resume" },
    { to: "work", text: "Work" },
    { to: "project", text: "Project" },
    { to: "skill", text: "Skill" },
    { to: "education", text: "Education" },
    { to: "contact", text: "Contact" },
  ];

  return (
    <>
      {links.map((link, index) => (
        <li key={index} className="cursor-pointer text-lg-bold lg:text-base-bold hover:text-secondary-500 lg:hover:text-slate-300 lg:inline">
          <Link to={link.to} smooth={true} duration={500} offset={-100}>
            {link.text}
          </Link>
        </li>
      ))}
    </>
  );
}
