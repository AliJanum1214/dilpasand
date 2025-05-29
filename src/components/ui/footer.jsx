const Footer = () => {
  return (
    <footer className="bg-custom-primary px-8 py-12 text-custom-secondary">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-base">
        {/* VISIT US */}
        <div>
          <h4 className="uppercase text-[10px] font-semibold tracking-widest mb-3">
            Visit Us
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Dishsand Cafes
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Menu
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                The Experience
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Charity
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Impact
              </a>
            </li>
          </ul>
        </div>

        {/* ABOUT US */}
        <div>
          <h4 className="uppercase text-[10px] font-semibold tracking-widest mb-3">
            About Us
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Visit the Store
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Music
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Downs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* CAFE SUPPORT */}
        <div>
          <h4 className="uppercase text-[10px] font-semibold tracking-widest mb-3">
            Cafe Support
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Group Bookings
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Store FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* OUR COMMUNITY */}
        <div>
          <h4 className="uppercase text-[10px] font-semibold tracking-widest mb-3">
            Our Community
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Events
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Membership
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Newsletter
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
