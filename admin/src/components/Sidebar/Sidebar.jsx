import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => (
  <aside className="w-[76px] shrink-0 border-r border-[#e8ebf2] bg-white px-3 py-6 text-sm sm:w-56 sm:px-4">
    <div className="mb-8 hidden px-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#9aa3b5] sm:block">
      Manage
    </div>
    <nav className="flex flex-col gap-2">
      <NavLink
        to="/add"
        className="group flex items-center gap-3 rounded-xl px-3 py-3 text-[#667085] transition hover:bg-[#fff5f2] hover:text-[tomato] [&.active]:bg-[#fff0ed] [&.active]:font-semibold [&.active]:text-[tomato]"
      >
        <img className="size-5 opacity-70 group-[.active]:opacity-100" src={assets.add_icon} alt="" />
        <span className="hidden sm:block">Add Items</span>
      </NavLink>
      <NavLink
        to="/list"
        className="group flex items-center gap-3 rounded-xl px-3 py-3 text-[#667085] transition hover:bg-[#fff5f2] hover:text-[tomato] [&.active]:bg-[#fff0ed] [&.active]:font-semibold [&.active]:text-[tomato]"
      >
        <img className="size-5 opacity-70 group-[.active]:opacity-100" src={assets.order_icon} alt="" />
        <span className="hidden sm:block">Inventory</span>
      </NavLink>
      <NavLink
        to="/orders"
        className="group flex items-center gap-3 rounded-xl px-3 py-3 text-[#667085] transition hover:bg-[#fff5f2] hover:text-[tomato] [&.active]:bg-[#fff0ed] [&.active]:font-semibold [&.active]:text-[tomato]"
      >
        <img className="size-5 opacity-70 group-[.active]:opacity-100" src={assets.order_icon} alt="" />
        <span className="hidden sm:block">Paid Orders</span>
      </NavLink>
    </nav>
  </aside>
);

export default Sidebar;
