import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { useRouter } from "next/router";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

type Props = {
  route: string;
};

const DelivererNavBar = (props: Props) => {
  const router = useRouter();

  const navigate = (e: string) => {
    router.push(e);
  };

  return (
    // <NavigationMenu>
    //   <NavigationMenuList className="w-screen flex flex-row justify-around">
    //     <NavigationMenuItem>
    //       <NavigationMenuTrigger onClick={() => navigate('/orders/queue')} className={props.route === '/orders/queue' ? 'bg-orange-100' : ''}>Delivery Queue</NavigationMenuTrigger>
    //     </NavigationMenuItem>
    //     <NavigationMenuItem>
    //       <NavigationMenuTrigger onClick={() => navigate('/orders/current')} className={props.route === '/orders/current' ? 'bg-orange-100' : ''}>Current Delivery</NavigationMenuTrigger>
    //     </NavigationMenuItem>
    //     <NavigationMenuItem>
    //       <NavigationMenuTrigger onClick={() => navigate('/orders/history')} className={props.route === '/orders/history' ? 'bg-orange-100' : ''}>Delivery History</NavigationMenuTrigger>
    //     </NavigationMenuItem>
    //   </NavigationMenuList>
    // </NavigationMenu>

    <Tabs
      defaultValue="account"
      className="w-full flex items-center justify-center my-4"
    >
      <TabsList>
        <TabsTrigger
          onClick={() => navigate("/orders/queue")}
          className={
            props.route === "/orders/queue" ? "bg-primary/70 text-white" : ""
          }
          value="delivery-queue"
        >
          Delivery Queue
        </TabsTrigger>
        <TabsTrigger
          onClick={() => navigate("/orders/current")}
          className={
            props.route === "/orders/current" ? "bg-primary/70 text-white" : ""
          }
          value="current-delivery"
        >
          Claimed Orders
        </TabsTrigger>
      </TabsList>
      {/* <TabsContent value="delivery-queue">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="current-delivery">
        Change your password here.
      </TabsContent> */}
    </Tabs>
  );
};

export default DelivererNavBar;
