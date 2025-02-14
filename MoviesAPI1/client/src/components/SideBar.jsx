import { Home, CalendarSearch, UserPlus, Shield, Icon } from "lucide-react"
const SideBar = () => {
  const menuItems = [
    { icon: Home, label: 'Employees', path: '/employees' },
    // leave balances
    { icon: CalendarSearch, label: 'Leave Balances', path: '/leave-balances' },
    { icon: UserPlus, label: 'Register Employee', path: '/register' },
    { icon: Shield, label: 'Roles & Permissions', path: '/roles' }
  ]
  return (
    <div className="h-screen bg-gray-700 text-white fixed left-0 top-17 transition-all duration-300 w-56">
        <div className="p-4">
          <nav className="space-y-1">
            {menuItems.map((item, key) => {
                const Icon = item.icon
                return (
                   <a key={key} href="" className="flex items-center gap-2 space-y-2">
                      <Icon size={20} /> <span className="text-sm">{item.label}</span>
                   </a>
                )
            })}
          </nav>
        </div>
    </div>
  )
}

export default SideBar