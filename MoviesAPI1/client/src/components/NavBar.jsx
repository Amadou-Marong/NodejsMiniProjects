import { Bell, Smile } from "lucide-react"

const Navbar = () => {
  return (
    <nav className="flex items-center gap-1.5">
        <span className="text-red-500 font-extrabold text-3xl">Netflix</span>
        <ul className="flex items-center justify-center text-white w-full gap-1.5">
            <li>Browse by language</li>
            <li>
                <input type="search" name="" id="" placeholder="Search for Movies" className="h-10 p-3 bg-gray-600 w-xl rounded-md "/>
            </li>
            <li>
                <div className="bg-gray-600 w-15 h-10 flex items-center justify-center rounded-md">
                    <Smile size={20} className="text-xl mr-1"/> <span className="text-sm">Kids</span>
                </div>
            </li>
            <li>
                <Bell size={20}/>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar