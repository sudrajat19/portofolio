import Navbar from "./navbar";
import Sidebar from "./sidebar";
export default function MainLayout(props){
    return (
        <>
      <Navbar />
      <div className="flex pt-[100px]">
        <Sidebar />
        <div className="w-full p-4">{props.children}</div>
      </div>
    </>
    )
}