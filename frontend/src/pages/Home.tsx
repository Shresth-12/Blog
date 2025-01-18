import { Link } from "react-router-dom";
import { Avatar } from "../components/BlogCard";

const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    window.location.reload(); // Reload the page
  };
export function Home()
{
    const isLoggedin=localStorage.getItem('token')
    return <div>
        <div className="border-b flex justify-between px-10 py-4">
        <div>
            Blog
        </div>
        <div>
        {isLoggedin?
                        <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 " onClick={handleLogout}>Log Out</button> : <Link to={`/signin`}>
                        <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Signin</button>
                    </Link>}
            <Avatar name="Shresth"/>
        </div>
    </div>
    <div className="mt-48 ml-36 flex">
        <div>
            <h1 className="text-8xl font-bold font-serif">HUMAN</h1>
            <h1 className="mt-2 text-8xl font-bold font-serif">Stories & ideas</h1>
            <p className="mt-14 text-2xl">A place to read, write, and deepen your understanding</p>
            {isLoggedin?<Link to={'/blogs'}><button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mt-12 ml-56 w-32">Blogs</button></Link>:null}
            </div>
            <div>
            <img src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png" alt="" className="h-[550px] ml-[170.7px] -mt-32"/>
            </div>
        </div>
    </div>
}