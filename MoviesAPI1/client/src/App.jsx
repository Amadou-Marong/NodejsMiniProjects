import { Home } from "lucide-react"
import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"
import HomePage from "./pages/HomePage"

function App() {

  return (
    <>
     <div className="p-6 w-full h-screen bg-gray-800 relative">
        <NavBar />
        <SideBar />
        <main className="pl-56 w-full">
          <HomePage />
        </main>
     </div>
    </>
  )
}

export default App
