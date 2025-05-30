const footerData = [
  {
    title: "Visit Us",
    links: [
      { name: "Dishsand Cafes", href: "#" },
      { name: "Menu", href: "#" },
      { name: "The Experience", href: "#" },
      { name: "Charity", href: "#" },
      { name: "Impact", href: "#" },
    ],
  },
  {
    title: "About Us",
    links: [
      { name: "Visit the Store", href: "#" },
      { name: "Music", href: "#" },
      { name: "Downs", href: "#" },
      { name: "Careers", href: "#" },
    ],
  },
  {
    title: "Cafe Support",
    links: [
      { name: "Contact Us", href: "#" },
      { name: "Group Bookings", href: "#" },
      { name: "Store FAQ", href: "#" },
    ],
  },
  {
    title: "Our Community",
    links: [
      { name: "Events", href: "#" },
      { name: "Membership", href: "#" },
      { name: "Newsletter", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-custom-primary px-4 py-8 text-white sm:px-6 md:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerData.map((section, index) => (
            <div key={index} className="flex flex-col">
              <h4 className="mb-3 text-[16px] font-semibold uppercase tracking-widest text-yellow-500">
                {section.title}
              </h4>
              <ul className="space-y-2 text-[14px]">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="transition-colors duration-200 hover:underline hover:text-yellow-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
