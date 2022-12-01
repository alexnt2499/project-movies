import React, { useState } from "react";
import { logo } from "../assets";

type MenuItemType = {
  id: string;
  title: string;
  url: string;
};

export default function NavBar() {
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  const listMenu: Array<MenuItemType> = [
    {
      id: "home",
      title: "Home",
      url: "/",
    },
    {
      id: "tv-show",
      title: "TV Shows",
      url: "#",
    },
    {
      id: "movies",
      title: "Movies",
      url: "#",
    },
    {
      id: "new&popular",
      title: "New & Popular",
      url: "#",
    },
    {
      id: "my-list",
      title: "My List",
      url: "#",
    },
  ];

  const _renderMainMenu = () =>
    listMenu.map((value: MenuItemType) => (
      <a
        key={value.id}
        href={value.url}
        className="dark:text-white px-3 py-2  text-sm font-medium"
        aria-current="page"
      >
        {value.title}
      </a>
    ));

  const _renderMobileMenuItems = () =>
    toggleMobileMenu ? (
      listMenu.map((value: MenuItemType) => (
        <a
          key={value.id}
          href={value.url}
          className="dark:text-white mt-2 hover:bg-[#e50913] hover:text-white block px-3 py-2  text-base font-medium"
          aria-current="page"
        >
          {value.title}
        </a>
      ))
    ) : (
      <div></div>
    );

  const _renderMobileMenu = () =>
    toggleMobileMenu ? (
      <div className="lg:hidden  px-2 pt-2 pb-3">
        {_renderMobileMenuItems()}
        {/* <div className="flex justify-center items-center relative mt-4">
          <input
            className="flex justify-center items-center w-full h-[38px] pl-12 pr-3 text-[13px] bg-[#F1F5F9] "
            placeholder="Search NFTs / Collections / Addresses"
            onChange={_onChangeSearch}
          />
        </div> */}
        <button
          type="button"
          className=" w-full text-sm px-3 py-3 mt-5 hover:bg-[#e50913] text-white  font-bold"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          Login
        </button>
        <button
          type="button"
          className=" w-full text-sm px-3 py-3 mt-3 bg-[#e50913] text-white  font-bold"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          Sign up
        </button>
      </div>
    ) : (
      <div></div>
    );

  const _handleToggleMenu = () => {
    setToggleMobileMenu(!toggleMobileMenu);
  };

  return (
    <nav
      className={
        toggleMobileMenu
          ? "bg-black fixed z-30 w-[100vw] menu-navigation"
          : "bg-transparent fixed z-30 w-[100vw] menu-navigation"
      }
    >
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
            {/* Mobile menu button*/}
            <button
              type="button"
              className="inline-flex items-center justify-center  p-2 dark:text-white hover:bg-[#e50913] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={_handleToggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="block h-8 w-auto lg:hidden"
                src={logo}
                width={192}
                height={32}
                alt="Your Company"
              />
              <img
                className="hidden h-8 w-auto lg:block"
                src={logo}
                width={192}
                height={32}
                alt="Your Company"
              />
            </div>
            <div className="hidden lg:ml-6 lg:flex items-center ">
              <div className="flex space-x-4">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                {_renderMainMenu()}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0  items-center pr-2 hidden lg:flex lg:static lg:inset-auto md:ml-6 md:pr-0">
            <a
              href="#"
              className="dark:text-white px-3 py-2  text-sm font-medium"
            >
              Login
            </a>
            {/* Profile dropdown */}
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="bg-[#e50913] text-sm px-3 py-2 text-white "
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      <div className="lg:hidden" id="mobile-menu">
        {_renderMobileMenu()}
      </div>

      <div
        className={`h-[100vh] w-[100vw] ${toggleMobileMenu ? 'block' : 'hidden'}`}
        onClick={() => {
          setToggleMobileMenu(false);
        }}
      ></div>
    </nav>
  );
}
