import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { text: "Home", url: "/" },
      { text: "Best Sellers", url: "/" },
      { text: "Offers & Deals", url: "/products" },
      { text: "Contact Us", url: "/contact" },
      { text: "Become a Seller", url: "/seller" },
    ],
  },
  {
    title: "Need Help?",
    links: [
      { text: "Delivery Information", url: "/" },
      { text: "Return & Refund Policy", url: "/" },
      { text: "Payment Methods", url: "/cart" },
      { text: "Track your Order", url: "/orders" },
      { text: "Contact Us", url: "/contact" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { text: "Instagram", url: "/", icon: <FaInstagram /> },
      { text: "Twitter", url: "/", icon: <FaTwitter /> },
      { text: "Facebook", url: "/", icon: <FaFacebook /> },
      { text: "YouTube", url: "/", icon: <FaYoutube /> },
    ],
  },
];

const Footer = () => {
  return (
    <div className=" mt-24 px-6 md:px-16 lg:px-24 xl:px-32 bg-emerald-600/10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <div className="flex items-center">
            <img className="h-7 md:h-11" src="/images/image.png" alt="logo" />
            <h1 className="text-xl md:text-2xl font-bold text-green-900">
              <span className="text-green-600">Fresh</span>Cart
            </h1>
          </div>
          <p className="max-w-[410px] mt-6">
            We deliver fresh groceries and snacks straight to your door. Trusted
            by thousands, we aim to make your shopping experience simple and
            affordable.
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-8">
          {footerLinks.map((section, index) => (
            <div key={index} className="min-w-[120px]">
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      onClick={() => {
                        scrollTo(0, 0);
                      }}
                      to={link.url}
                      aria-label={link.text}
                      className={`flex hover:underline items-center gap-2 hover:text-green-700 transition-colors`}
                    >
                      {link.icon && (
                        <span className="text-lg">{link.icon}</span>
                      )}
                      <span>{link.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright {new Date().getFullYear()} © <Link to="/">FreshCart</Link> All
        Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
