import { Link } from "react-router-dom";
export default function Sidebar (){
    return(
        <>
        <sidebar className="w-[243px] border-r-gray-50 shadow-lg py-8 px-6 gap-8">
          <div className="gap-6 grid font-semibold">
              <Navigasi/>
          </div>
        </sidebar>
        </>
    )
}

function Navigasi(){
    const links=[
        {to:'/admin/contactAdmin', text:'Contact'},
        {to:'/admin/educationAdmin', text:'Education'},
        {to:'/admin/projectAdmin', text:'Project'},
        {to:'/admin/skillAdmin', text:'Skill'},
        {to:'/admin/usersAdmin', text:'Users'},
        {to:'/admin/workAdmin', text:'Work'},
    ]

    return(
        <>
            {links.map((link,index)=>(
                <p key={index}>
                    <Link to={link.to}>
                        {link.text}
                    </Link>
                </p>
            ))}        
        </>
    )
}