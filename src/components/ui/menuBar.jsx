export default function MenuBar({ isFixed = true }) {
  const baseClass = isFixed
    ? "fixed bottom-0 left-0 w-full z-50 bg-custom-secondary"
    : "relative bg-custom-secondary";

  const menuLinks = [
    { href: "#menu", name: "Menu" },
    { href: "#reservation", name: "Reservation" },
    { href: "#visit_us", name: "Visit Us" },
  ];

  return (
    <div className={baseClass}>
      <div className="max-w-6xl mx-auto p-1 flex justify-center gap-6 flex-wrap">
        {menuLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className={`text-white text-lg hover:text-yellow-400 transition-colors duration-300 ${
              index < menuLinks.length - 1
                ? "after:content-['•'] after:ml-6 after:text-white"
                : ""
            }`}
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}
