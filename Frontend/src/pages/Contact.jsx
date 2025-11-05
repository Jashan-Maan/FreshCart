import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { PiBuildingOffice } from "react-icons/pi";
import { FiPhone } from "react-icons/fi";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(name, email, message);
    setName("");
    setEmail("");
    setMessage("");
  };
  return (
    <div className="mt-16 flex flex-col items-center">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center text-sm"
      >
        <p className="text-lg text-emerald-600 font-medium pb-2">Contact Us</p>
        <h1 className="text-4xl font-semibold text-slate-700 pb-4">
          Get in touch with us
        </h1>
        <p className="text-sm text-gray-500 text-center pb-10">
          We're here to help with any questions, feedback or concernsyou have.
          <br />
          Please fill out the form below and we'll get back to you as soon as
          possible.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
          <div className="w-full">
            <label className="text-black/70" htmlFor="name">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-emerald-300"
              type="text"
              required
              autoComplete="true"
            />
          </div>
          <div className="w-full">
            <label className="text-black/70" htmlFor="email">
              Your Email
            </label>
            <input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-emerald-300"
              type="email"
              required
              autoComplete="true"
            />
          </div>
        </div>

        <div className="mt-6 w-[350px] md:w-[700px]">
          <label className="text-black/70" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-emerald-300"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="mt-5 bg-emerald-600 text-white h-12 w-56 px-4 rounded active:scale-95 transition cursor-pointer hover:bg-emerald-700"
        >
          Send Message
        </button>
      </form>

      <div className=" mt-12 py-10 px-5  max-w-5xl w-full mx-auto text-gray-800">
        <span className="px-2 py-1 text-xs border border-gray-300 rounded-full">
          Reach Out To Us
        </span>
        <h1 className="text-4xl font-bold text-left mt-4">
          We'd love to Hear From You.
        </h1>
        <p className="text-left mt-4">
          Or just reach out manually to
          <Link
            to="mailto:customerservice@freshcart.com"
            className="text-emerald-600 hover:underline ml-1 "
          >
            customerservice@freshcart.com
          </Link>
        </p>
        <div className="grid md:grid-cols-3 mt-16">
          <div className="">
            <MdOutlineEmail className="text-emerald-600  text-lg bg-emerald-600/20 p-2.5 aspect-square rounded-full size-10" />

            <p className="text-lg font-bold mt-2">Email Support</p>
            <p className="text-gray-500 mt-1 mb-4 tracking-tighter">
              Our team can respond in real time.
            </p>
            <p className="text-emerald-700 font-semibold tracking-tight cursor-pointer hover:underline">
              customerservice@freshcart.com
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <PiBuildingOffice className="text-emerald-600 text-lg bg-emerald-600/20 p-2.5 aspect-square rounded-full size-10" />
            <p className="text-lg font-bold mt-2">Visit Our Office</p>
            <p className="text-gray-500 mt-1 mb-4">
              Visit our location in real life.
            </p>
            <span className="text-emerald-700 font-semibold tracking-tight">
              22nd Main Rd, Agara Village, 1st Sector,
              <br /> Bengaluru, Karnataka 560102, India
            </span>
          </div>
          <div className="mt-4 md:mt-0">
            <FiPhone className="text-emerald-600 bg-emerald-600/20 p-2.5 aspect-square rounded-full size-10 text-lg" />
            <p className="text-lg font-bold mt-2">Call Us Directly</p>
            <p className="text-gray-500 mt-1 mb-4">
              Available during working hours.
            </p>
            <span className="text-emerald-700 font-semibold">
              (+91) 987 - 3456 - 210
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
