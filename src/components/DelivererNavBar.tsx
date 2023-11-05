import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { useRouter } from 'next/router'

type Props = {
  route: string
};

const DelivererNavBar = (props: Props) => {
  const router = useRouter()

  const navigate = (e: string) => {
    router.push(e)
  }

  return (
    <NavigationMenu>
      <NavigationMenuList className="w-screen flex flex-row justify-around">
        <NavigationMenuItem>
          <NavigationMenuTrigger onClick={() => navigate('/orders/queue')} className={props.route === '/orders/queue' ? 'bg-orange-100' : ''}>Delivery Queue</NavigationMenuTrigger>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger onClick={() => navigate('/orders/current')} className={props.route === '/orders/current' ? 'bg-orange-100' : ''}>Current Delivery</NavigationMenuTrigger>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger onClick={() => navigate('/orders/history')} className={props.route === '/orders/history' ? 'bg-orange-100' : ''}>Delivery History</NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DelivererNavBar;
