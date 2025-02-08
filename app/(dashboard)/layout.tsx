import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { HomeIcon, FolderIcon } from "@heroicons/react/24/outline";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Define navigation items array for better maintainability
const navigationItems = [
  {
    id: 'home',
    href: '/admin/dashboard',
    icon: HomeIcon,
    label: 'Home'
  },
  {
    id: 'categories',
    href: '/admin/categories',
    icon: FolderIcon,
    label: 'Categories'
  }
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check authentication
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/signin');
  }

  // Fetch user role
  const email = session?.user?.email;
  if (email) {
    const res = await fetch(`http://localhost:3001/api/users/email/${email}`);
    const data = await res.json();
    
    if (data.role !== "admin") {
      redirect('/');
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <nav className="px-4 py-2">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <Link 
                  href={item.href}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 
                  rounded-lg transition-colors duration-200"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-8 bg-gray-50">
        {children}
      </div>
    </div>
  );
}
