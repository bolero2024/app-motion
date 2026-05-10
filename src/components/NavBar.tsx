// import React from "react";

function NavBar() {
  return (
    <div
      className="flex flex-1  flex-row items-center justify-items-start shadow-lg  fixed top-0 left-0 w-full   bg-white z-200"
      aria-labelledby="menu-1"
    >
      <div className="flex w-full  flex-row items-center justify-items-start px-4 py-2 bg-white   ">
        <div className=" logo   flex " >
          <span className="flex items-center justify-center mx-2 " >
            <img
              className="common-nav__logo"
              src="../icons/microsoft.svg"
              alt="Microsoft"
              role="img"
              style={{
                maxWidth: "5.9em",
                transform: "translate(0em, 0.05em)",
              }}
            />
          </span>
        </div>
        <nav>
          <ul className=" flex flex-row items-center justify-items-start gap-6 ml-8 ">
            <li className=" ">
              <div>
                <a href="#" data-bi-id=" ">
                  <span className="text-sm font-bold">Copilot dans Edge</span>
                </a>
              </div>
            </li>
            <li className=" ">
              <div>
                <a href="#" data-bi-id=" ">
                  <span className="text-sm font-normal">FAQ</span>
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <section aria-label="header actions" className=" ">
        <div className=" ">
          <div className=""></div>
        </div>
      </section>

      {/* <div className="">
                <button className="" role="button" aria-expanded="false">
                    <svg
                        className="px-icon"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line
                            xmlns="http://www.w3.org/2000/svg"
                            x1="3"
                            y1="12"
                            x2="21"
                            y2="12"
                        ></line>
                        <line
                            xmlns="http://www.w3.org/2000/svg"
                            x1="3"
                            y1="6"
                            x2="21"
                            y2="6"
                        ></line>
                        <line
                            xmlns="http://www.w3.org/2000/svg"
                            x1="3"
                            y1="18"
                            x2="21"
                            y2="18"
                        ></line>
                    </svg>
                </button>
            </div> */}
    </div>
  );
}

export default NavBar;
