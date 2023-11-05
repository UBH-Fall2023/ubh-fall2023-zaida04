import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ReactNode, memo } from "react";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export default function Component() {
  return (
    <>
      <section className="overflow-hidden w-full h-screen bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-6xl font-bold text-white mb-4">DeliverU</h1>
          <p className="text-xl text-white mb-8">
            Skip waiting in long lines and get back to studying.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-10">
            {
              <PathCard
                href="/order"
                icon={<MemoPizzaIcon />}
                title="Save Time"
                description="Skip the long lines and save up to 30+ minutes of your time. Spend more time studying, less time waiting."
              />
            }
            <PathCard
              href="/delivery"
              icon={<MemoDeliveryIcon />}
              title="Earn Money"
              description="Make some money in between classes by becoming a delivery driver for us. It's easy and flexible."
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
function PathCard(props: {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <Link href={props.href}>
      <div className="bg-white rounded-lg p-10 shadow-lg border-2 border-orange-500 transition duration-200 ease-in-out transform hover:scale-[1.01]">
        {props.icon}
        <h2 className="text-2xl font-bold mb-2">{props.title}</h2>
        <p className="text-gray-800">{props.description}</p>
      </div>
    </Link>
  );
}

const MemoPizzaIcon = memo(function PizzaIcon() {
  return (
    <svg
      className=" h-16 w-16 mx-auto mb-4 text-yellow-600"
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15 11h.01" />
      <path d="M11 15h.01" />
      <path d="M16 16h.01" />
      <path d="m2 16 20 6-6-20A20 20 0 0 0 2 16" />
      <path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4" />
    </svg>
  );
});

const MemoDeliveryIcon = memo(function DeliveryIcon() {
  return (
    <svg
      className=" h-16 w-16 mx-auto mb-4 text-red-600"
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="8" />
      <line x1="3" x2="6" y1="3" y2="6" />
      <line x1="21" x2="18" y1="3" y2="6" />
      <line x1="3" x2="6" y1="21" y2="18" />
      <line x1="21" x2="18" y1="21" y2="18" />
    </svg>
  );
});
