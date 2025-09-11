import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";

const PaymentGatewaysSection = () => {
  const stripeInfo = (
    <PopoverContent>
      <div className="px-3 py-2 text-xs">
        <div className="font-bold mb-1">Secure Payments with Stripe</div>
        TyresDash uses <strong>Stripe</strong> to process all payments securely.
        <br />
        Your card details are encrypted and safe.
        <br />
        Pay with debit/credit cards, Apple Pay, or Google Pay.
      </div>
    </PopoverContent>
  );
  const paypalInfo = (
    <PopoverContent>
      <div className="px-3 py-2 text-xs">
        <div className="font-bold mb-1">Secure Payments with PayPal</div>
        TyresDash supports <strong>PayPal</strong> for fast and secure payments.
        <br />
        No need to share your card details.
        <br />
        Pay using your PayPal balance, linked bank, or cards.
      </div>
    </PopoverContent>
  );
  return (
    <section className="flex flex-col items-center px-4 py-16 bg-gradient-to-br from-gray-50 via-white to-red-50 dark:from-black dark:via-black dark:to-black">
      <div className="text-center mb-12 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent mb-4">
          Secure & Seamless Payments
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Pay with confidence using our trusted payment partners. Your
          transactions are protected with enterprise-grade security.
        </p>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-red-200/50 dark:border-red-800/30 p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
          {/* Premium glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10">
            <div className="mb-6">
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs uppercase px-3 py-1.5 rounded-full inline-block font-semibold tracking-wide shadow-lg">
                Industry Leader
              </span>
            </div>

            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-2xl shadow-lg">
                <svg
                  className="w-16 h-16 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                </svg>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Stripe Payment Processing
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Experience lightning-fast checkouts with Stripe's world-class
              payment infrastructure. Your card details are encrypted and never
              stored on our servers.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full mr-3"></div>
                <span>256-bit SSL encryption</span>
              </div>
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full mr-3"></div>
                <span>PCI DSS Level 1 compliant</span>
              </div>
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full mr-3"></div>
                <span>Instant transaction processing</span>
              </div>
            </div>

            <Popover placement="top">
              <PopoverTrigger>
                <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                  Learn More About Stripe
                </button>
              </PopoverTrigger>
              {stripeInfo}
            </Popover>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-red-200/50 dark:border-red-800/30 p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
          {/* Premium glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10">
            <div className="mb-6">
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs uppercase px-3 py-1.5 rounded-full inline-block font-semibold tracking-wide shadow-lg">
                Trusted Worldwide
              </span>
            </div>

            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-2xl shadow-lg">
                <svg
                  className="w-16 h-16 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.028-.026.056-.052.08-.498 2.542-2.101 4.081-4.847 4.081H8.522c-.524 0-.968.382-1.05.9L6.602 18.5h-1.85a.641.641 0 0 1-.633-.74L7.222 1.441C7.304.922 7.752.54 8.276.54h7.46c1.576 0 2.805.194 3.735.740.93.546 1.54 1.320 1.751 2.377z" />
                </svg>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              PayPal Secure Checkout
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Pay safely with PayPal's buyer protection program. Use your PayPal
              balance, bank account, or credit card with complete peace of mind.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-3"></div>
                <span>Buyer protection guarantee</span>
              </div>
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-3"></div>
                <span>No card details shared</span>
              </div>
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-3"></div>
                <span>One-click express checkout</span>
              </div>
            </div>

            <Popover placement="top">
              <PopoverTrigger>
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                  Learn More About PayPal
                </button>
              </PopoverTrigger>
              {paypalInfo}
            </Popover>
          </div>
        </div>
      </div>

      <div className="mt-16 w-full max-w-4xl">
        <div className="bg-gradient-to-r from-red-50 via-white to-red-50 dark:from-red-950/20 dark:via-gray-800 dark:to-red-950/20 rounded-2xl p-8 border border-red-200/50 dark:border-red-800/30 shadow-xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-6 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              TiresDash Money-Back Guarantee
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Shop with complete confidence knowing that every purchase is
              backed by our 30-day money-back guarantee. If you're not
              completely satisfied with your tires or wheels, we'll make it
              right.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Secure Payments
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Bank-level security
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  24/7 Support
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Always here to help
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Best Prices
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Price match guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentGatewaysSection;
