import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground antialiased max-w-full overflow-x-hidden">
      {/* <div className="grid-background"></div> */}
        <Header />
      <main className="flex-grow" >
        <Outlet />
      </main>
      {/* <div className="p-10 text-center bg-gray-800 mt-10">
        Made with 💗 by Chetan
      </div> */}
    </div>
  );
};

export default AppLayout;
