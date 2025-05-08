import { Link, useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { FaUser } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";


export default function HeaderMenu() {

  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  //Funcion para manejar el cierre de sesion
  function handleSignOut(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signOut();
    navigate("/signin");
  }

  return (
    <Menu as="div" className="text-left self-center">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#161821] text-md font-semibold text-[#e2e2e2] shadow-xs">
          <FaUser className="self-center" />
          {currentUser &&
            `${currentUser.firstName} ${currentUser.lastName}`
          }
          <FaAngleDown className="self-center text-xs" />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 items-center  mt-2 w-56 origin-top-right rounded-md bg-[#1A1C28] shadow-lg transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <Link
              to="/profile"
              className="block px-4 py-2 text-[#e2e2e2] data-focus:bg-[#282A3A] data-focus:text-[#e2e2e2] data-focus:outline-hidden"
            >
              Account settings
            </Link>
          </MenuItem>
          <form action="#" onSubmit={handleSignOut} method="POST">
            <MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-[#e2e2e2] data-focus:bg-[#282A3A] data-focus:text-[#e2e2e2] data-focus:outline-hidden"
              >
                <div className="inline-flex w-full gap-x-1.5">
                  Sign out
                  <FaSignOutAlt className="self-center" />
                </div>
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  )
}
