import { Bell, Smile } from "lucide-react"

const Navbar = () => {
  return (
    <nav className="hidden lg:flex items-center gap-1.5 w-full mb-4 sticky">
        <span className="text-red-500 font-extrabold text-3xl">Netflix</span>
        <ul className="px-6 items-center flex-col lg:flex-row justify-between text-white w-full gap-1.5 hidden lg:flex">
            <li className="w-full lg:w-auto">Browse by language</li>
            <li className="lg:w-1/2 flex items-center gap-1">
                <input type="search" name="" id="" placeholder="Search for Movies" className="h-10 p-3 bg-gray-600 rounded-md w-full"/>
                <span className="bg-gray-600 w-15 h-10 flex items-center justify-center rounded-md">
                    <div className="flex p-1.5">
                    <Smile size={20} className="text-xl mr-1"/> <span className="text-sm">Kids</span>
                    </div>
                </span>
            </li>
            <li className="lg:w-auto">
                <Bell size={20}/>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar