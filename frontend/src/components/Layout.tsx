import Sidebar from "./SideBar";
import Navbar from "./NavBar";

const Layout = (
    {
  children,
  showSidebar = false
}: Readonly<{
  children: React.ReactNode;
  showSidebar?: boolean;
}>
) => {
  return (
    <div className="min-h-screen">
      <div className="flex">
        {showSidebar && <Sidebar />}

        <div className="flex-1 flex flex-col">
          <Navbar />

          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};
export default Layout;