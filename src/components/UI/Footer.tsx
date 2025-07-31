import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={120}
            height={50}
            className="object-contain mb-3"
          />
          <p className="text-sm text-center md:text-left">
            Driving financial ease and flexibility—your journey starts here.
          </p>
        </div>

        {/* About Section */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">About Us</h4>
          <p className="text-sm">
            We provide flexible financing solutions tailored to meet your needs.
            Explore our plans and take control of your payments today.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#"
                className="hover:text-blue-400 transition duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-400 transition duration-200"
              >
                Financing Options
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-400 transition duration-200"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-400 transition duration-200"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Get in Touch
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:info@company.com"
                className="hover:text-blue-400 transition duration-200"
              >
                info@company.com
              </a>
            </li>
            <li>
              <span className="font-semibold">Phone:</span>{" "}
              <a
                href="tel:+18001234567"
                className="hover:text-blue-400 transition duration-200"
              >
                +1 (800) 123-4567
              </a>
            </li>
            <li>
              <span className="font-semibold">Address:</span> 123 Finance
              Street, City, Country
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>© 2025 Tires Dash. All rights reserved.</p>
        <p>
          <a href="#" className="hover:text-blue-400 transition duration-200">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="#" className="hover:text-blue-400 transition duration-200">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
