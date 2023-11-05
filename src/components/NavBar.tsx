import { ChefHat, ShoppingCart } from "lucide-react";
import router from "next/router";
import React from "react";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useAtom } from "jotai";
import { cartAtom } from "@/lib/cartAtom";
import Link from "next/link";

type Props = {};

const NavBar = (props: Props) => {
  const [cart] = useAtom(cartAtom);
  return (
    <header className="flex items-center h-16 border-b bg-white dark:bg-gray-800">
      <div className="flex w-2/4 h-full justify-start px-10 items-center">
        <Link
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          href="#"
        >
          <ChefHat />
        </Link>
      </div>

      <div className="w-2/4 flex items-center justify-end px-16 h-full">
        {/* <Button className="relative" variant={"ghost"} size={"icon"}> */}

        <AlertDialog>
          <AlertDialogTrigger className="relative" asChild>
            <Button size={"icon"} variant="ghost">
              <ShoppingCart />
              <span className="absolute top-[-5px] right-[-5px] rounded-full border h-4 w-4 flex items-center justify-center p-2">
                {cart.items.length}
              </span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Continue to checkout</AlertDialogTitle>
              <AlertDialogDescription>
                <ol>
                  {cart.items.map((cartItem) => (
                    <li>• {cartItem.name}</li>
                  ))}
                </ol>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>I want more food!</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  localStorage.setItem("cart", JSON.stringify(cart));
                  router.push("checkout");
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {/* </Button> */}
      </div>
    </header>
  );
};

export default NavBar;
