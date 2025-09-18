import { Link } from "react-scroll";
import logo from "../../assets/gambar/logos2.png";
import { useState } from "react";
import { jsPDF } from "jspdf";
import Me from "../../assets/gambar/me.jpg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDownload = () => {
    const doc = new jsPDF("p", "pt", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // === Sidebar Kiri ===
    doc.setFillColor(245, 245, 245);
    doc.rect(0, 0, 180, pageHeight, "F");

    // Foto Profil
    const centerX = 100;
    const centerY = 90;
    const radius = 50;
    const imgSize = radius * 2;
    doc.setFillColor(255, 255, 255);
    doc.circle(centerX, centerY, radius, "F");
    doc.addImage(Me, "JPEG", centerX - radius, centerY - radius, imgSize, imgSize);

    // === Helper Sidebar ===
    const drawSidebarSection = (title, items, startY, bullet = true) => {
      let y = startY;
      doc.setFont("helvetica", "bold").setFontSize(12);
      doc.text(title, 30, y);
      y += 8;
      doc.setLineWidth(0.5);
      doc.line(30, y, 170, y);
      y += 16;

      doc.setFont("helvetica", "normal").setFontSize(10);
      items.forEach((item) => {
        const splitText = doc.splitTextToSize(bullet ? `• ${item}` : item, 140);
        doc.text(splitText, 30, y);
        y += splitText.length * 12;
      });

      return y + 12;
    };

    // === Sidebar Content ===
    let y = drawSidebarSection("Educations", ["SMA Negeri 2 Sukabumi (2017 - 2018)", "Jurusan: Ilmu pengetahuan alam (IPA)"], 200, false);

    y = drawSidebarSection(
      "Skills",
      ["HTML", "CSS", "JavaScript", "TailwindCSS", "MySQL", "Rest API", "SASS", "Redux", "Express.js", "Node.js", "Sequelize", "React.js", "Next.js", "PostgreSQL", "Git", "Typescript", "Socket.io", "Database design"],
      y
    );

    y = drawSidebarSection("Languages", ["Indonesia (active)", "English (passive)"], y);

    drawSidebarSection("Organization", ["Member of Hikers Organization"], y, false);

    // === Konten Kanan ===
    const marginLeft = 200;
    let rightY = 60;

    // Nama & Title
    doc.setFont("helvetica", "bold").setFontSize(24);
    doc.text("Sudrajat", marginLeft, rightY);
    rightY += 20;
    doc.setFont("helvetica", "normal").setFontSize(12);
    doc.text("Full-Stack Web Developer", marginLeft, rightY);
    rightY += 20;

    // Garis pemisah
    doc.setDrawColor(150);
    doc.line(marginLeft, rightY, pageWidth - 40, rightY);
    rightY += 30;

    // === Helper Kanan ===
    const drawRightSection = (title, startY) => {
      doc.setFont("helvetica", "bold").setFontSize(14);
      doc.text(title, marginLeft, startY);
      return startY + 20;
    };

    // === About Me ===
    rightY = drawRightSection("About Me", rightY);
    doc.setFont("helvetica", "normal").setFontSize(10);
    const aboutMe =
      "I am a graduate of SMAN 2 Sukabumi. I've learned web development independently through YouTube tutorials and a mentor working as a senior programmer. I am highly disciplined, hardworking, and enjoy solving problems while learning new technologies.";
    const aboutSplit = doc.splitTextToSize(aboutMe, pageWidth - marginLeft - 40);
    doc.text(aboutSplit, marginLeft, rightY);
    rightY += aboutSplit.length * 12 + 20;

    // === Work Experiences ===
    rightY = drawRightSection("Work Experiences", rightY);
    const works = [
      {
        title: "Full-Stack Developer – PT Dserve",
        stack: "Next Js + Tailwindcss + express + sequelize",
        desc: "Developed responsive web apps and collaborated with teams. Key responsibilities included database modeling, real-time order management, and integrating barcode-based ordering systems.",
        time: "Feb-2024 - Jan-2025",
      },
      {
        title: "Freelance – Web Reporting (AntaraJa)",
        stack: "React Js + Tailwindcss + express + sequelize",
        desc: "Developed dashboard for delivery reports using React, Tailwind, and Express. Focused on admin tools and API integration.",
        time: "2024",
      },
    ];

    works.forEach((job) => {
      doc.setFont("helvetica", "bold").setFontSize(10);
      doc.text(`• ${job.title}`, marginLeft, rightY);
      rightY += 14;

      doc.setFont("helvetica", "italic");
      doc.text(job.stack, marginLeft + 15, rightY);
      rightY += 14;

      doc.setFont("helvetica", "normal");
      const descSplit = doc.splitTextToSize(job.desc, pageWidth - marginLeft - 40);
      doc.text(descSplit, marginLeft + 15, rightY);
      rightY += descSplit.length * 12 + 6;

      doc.setTextColor(100).setFontSize(9);
      doc.text(job.time, marginLeft + 15, rightY);
      doc.setTextColor(0).setFontSize(10);
      rightY += 20;
    });

    // === Experiences ===
    rightY = drawRightSection("Experiences", rightY);
    const projects = [
      {
        title: "Food & Beverage Ordering via Barcode",
        stack: "Next Js + Tailwindcss + express + sequelize",
        desc: "Hotel guests can scan barcodes in rooms to order F&B. Improves service speed and guest experience with real-time kitchen reporting.",
      },
      {
        title: "Web Report Anteraja",
        stack: "React Js + Tailwindcss + express + sequelize",
        desc: "A web platform for streamlined report management with a user-friendly interface.",
      },
      {
        title: "Web Booking lapangan futsal",
        stack: "Next Js + Tailwindcss + express + sequelize",
        desc: "Custom platform for managing field rentals and schedules, with admin tools and intuitive UI.",
      },
    ];

    projects.forEach((p) => {
      doc.setFont("helvetica", "bold").setFontSize(10);
      doc.text(`• ${p.title}`, marginLeft, rightY);
      rightY += 14;

      doc.setFont("helvetica", "italic");
      doc.text(p.stack, marginLeft + 15, rightY);
      rightY += 14;

      doc.setFont("helvetica", "normal");
      const descSplit = doc.splitTextToSize(p.desc, pageWidth - marginLeft - 40);
      doc.text(descSplit, marginLeft + 15, rightY);
      rightY += descSplit.length * 12 + 20;
    });

    // Save PDF
    doc.save("CV_Sudrajat.pdf");
  };

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
            <button onClick={handleDownload} className="bg-secondary-500 text-brand-500 text-sm-medium mt-4 rounded-lg w-[114px] h-[36px]">
              Download CV
            </button>
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
                <button onClick={handleDownload} className="bg-secondary-500 text-brand-500 text-sm-medium mt-4 rounded-lg w-[114px] h-[36px]">
                  Download CV
                </button>
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
