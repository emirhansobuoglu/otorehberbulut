"use client";

import Image from "next/image";

import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export function FooterComp() {
  return (
    <footer className="bg-slate-300 py-8 text-slate-600 shadow-2xl">
      <div className="container mx-auto px-6">
        {/* Footer Content */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          {/* Brand */}
          <div className="mb-6 flex items-center md:mb-0">
            <Image
              src="/logooo.png"
              alt="Oto Rehber Logo"
              width={200}
              height={200}
            />
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4 space-y-4 md:flex-row md:space-x-8 md:space-y-0">
            <div>
              <h4 className="mb-2 font-semibold">About</h4>
              <ul className="gap-4">
                <li>
                  <a href="#" className="hover:underline">
                    Home
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">Follow Us</h4>
              <ul className="gap-4">
                <li>
                  <a href="#" className="hover:underline">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    YouTube
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">Legal</h4>
              <ul className="gap-4">
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Divider */}
        <div className="my-8 border-t border-gray-600"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="text-center text-sm md:text-left">
            &copy; {new Date().getFullYear()} Oto Rehber. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <a href="#" className="text-white hover:text-blue-500">
              <BsFacebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-white hover:text-blue-500">
              <BsInstagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-white hover:text-blue-500">
              <BsTwitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-white hover:text-black">
              <BsGithub className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
