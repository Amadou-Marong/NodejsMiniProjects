import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"

function App() {

  return (
    <>
     <main className="p-6 w-full h-screen bg-gray-800">
        <NavBar />
        <div className="relative border mt-1">
          <SideBar />
        </div>
     </main>
    </>
  )
}

export default App
