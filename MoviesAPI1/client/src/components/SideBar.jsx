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
    <div className="relative">
      <div className="bg-gray-700 text-white fixed left-0 h-screen transition-all duration-300">
      <div className="p-4 mt-6">
        <nav className="space-y-1">
          {menuItems.map((item, key) => {
            const Icon = item.icon
            return (
              <a
                key={key}
                href={item.path}
                className="flex gap-2 hover:bg-red-500 transition-all duration-100 rounded-md p-2"
              >
                  <Icon size={20} />
                <span className="text-sm">{item.label}</span>
              </a>
            )
          })}
        </nav>
      </div>
    </div>
    </div>
  )
}

export default SideBar