import React from "react";
import SocialIcon from "../../components/Common/SocialIcon";
import { MdLocationOn, MdOutlineEmail } from "react-icons/md";

const Contact = () => {
  return (
    <div className="container py-14">
      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="text-[36px] font-semibold">Contact Us</h1>
        <p className="text-gray-500 font-normal tracking-[1px]">
          Feel free to contact us. Submit your queries here and we will get back
          to you as soon as possible
        </p>
      </div>
      <div class="grid sm:grid-cols-2 items-start gap-20 p-4 mx-auto mt-10">
        <div>
          <h1 class="text-gray-800 text-xl font-medium">Get in touch</h1>
          <p class="text-sm text-gray-500 mt-4">
            Have some big idea or brand to develop and need help? Then reach out
            we'd love to hear about your project and provide help.
          </p>

          <div class="mt-12">
            <h2 class="text-gray-800 text-base font-bold">Address</h2>
            <ul class="mt-4">
              <li class="flex items-center">
                <div class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <MdLocationOn />
                </div>
                <a
                  href="javascript:void(0)"
                  class="text-[#007bff] text-sm ml-4">
                  <small class="block">Location</small>
                  <strong>
                    55 East Birchwood Ave. Brooklyn, New York 11201,
                  </strong>
                </a>
              </li>
            </ul>
          </div>

          <div class="mt-12">
            <h2 class="text-gray-800 text-base font-bold">Email</h2>
            <ul class="mt-4">
              <li class="flex items-center">
                <div class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <MdOutlineEmail />
                </div>
                <a
                  href="javascript:void(0)"
                  class="text-[#007bff] text-sm ml-4">
                  <small class="block">E-Mail</small>
                  <strong>info@example.com</strong>
                </a>
              </li>
            </ul>
          </div>

          <div class="mt-12">
            <h2 class="text-gray-800 text-base font-bold">Socials</h2>

            <SocialIcon />
          </div>
        </div>

        <form class="ml-auto space-y-4">
          <div>
            <label>Name:</label>
            <input
              type="text"
              placeholder="Type your Name..."
              class="w-full rounded-[5px] py-2 px-2 border mt-1"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email"
              class="w-full rounded-[5px] py-2 px-2 border mt-1"
            />
          </div>
          <div className="">
            <label>Subject:</label>
            <input
              type="text"
              placeholder="Subject"
              class="w-full rounded-[5px] py-2 px-2 border mt-1"
            />
          </div>
          <div>
            <label>Message:</label>
            <textarea
              placeholder="Message"
              rows="6"
              class="w-full rounded-[5px] py-2 px-2 border"></textarea>
          </div>

          <button
            type="button"
            class="text-white bg-blue-500 hover:bg-blue-600 tracking-wide rounded-md text-sm px-4 py-3 w-full !mt-6">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
