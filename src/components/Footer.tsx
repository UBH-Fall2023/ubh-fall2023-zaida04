import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-10 text-white backdrop-blur-md">
      <div className="flex justify-center">
        <div className="w-4/5">
          <div className="container mx-auto px-6 flex flex-wrap justify-between items-center">
            <div className="text-black">
              <h3 className="text-5xl font-semibold">DeliverU</h3>
              <p className="mt-2 text-sm">Your favorite online store.</p>
            </div>
            <div style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)" }}>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link href="#" className="text-black hover:text-white">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div></div>
          {/* Icons and other content omitted for brevity */}
        </div>
      </div>
      <div
        className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-500"
        style={{ textShadow: "2px 1.5px 8px rgba(0, 0, 0, 0.6)" }}
      >
        © 2023 DeliverU. Made by Zaid, Robby, Ramin
      </div>
      <style jsx>{`
        footer {
          background: linear-gradient(
            to right,
            rgba(255, 203, 5, 0.6),
            rgba(255, 165, 0, 0.6),
            rgba(255, 0, 0, 0.6)
          );
        }
      `}</style>
    </footer>
  );
}
