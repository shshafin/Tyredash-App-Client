import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 py-10">
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
            At Tires Dash, we specialize in providing flexible financing
            solutions for all your tire needs. Whether you're looking for new
            tires or need to replace your current set, we've got you covered
            with easy and affordable payment options.
          </p>
        </div>

        {/* Links Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 1: Quick Navigation */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  className="hover:text-blue-400 transition duration-200">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/deals"
                  className="hover:text-blue-400 transition duration-200">
                  Deals
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-blue-400 transition duration-200">
                  Tips & Guide
                </a>
              </li>
              <li>
                <a
                  href="/appointment"
                  className="hover:text-blue-400 transition duration-200">
                  Appointments
                </a>
              </li>
            </ul>
          </div>

          {/* Section 2: Customer Care */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Customer Care
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/terms"
                  className="hover:text-blue-400 transition duration-200">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-blue-400 transition duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/refund"
                  className="hover:text-blue-400 transition duration-200">
                  Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="hover:text-blue-400 transition duration-200">
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-blue-400 transition duration-200">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
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
                href="mailto:info@tiresdash.com"
                className="hover:text-blue-400 transition duration-200">
                info@tiresdash.com
              </a>
            </li>
            <li>
              <span className="font-semibold">Phone:</span>{" "}
              <a
                href="tel:+15612323230"
                className="hover:text-blue-400 transition duration-200">
                561-232-3230
              </a>
            </li>
            <li>
              <span className="font-semibold">Address:</span> Boynton Beach, FL,
              USA
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>© 2025 Tires Dash. All rights reserved.</p>
        <p>
          <a
            href="/privacy"
            className="hover:text-blue-400 transition duration-200">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a
            href="/terms"
            className="hover:text-blue-400 transition duration-200">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
