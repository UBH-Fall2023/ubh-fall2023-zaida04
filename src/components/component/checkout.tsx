/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/hwzJNb81Bk4
 */
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function Checkout() {
  return (
    <Card className="w-full max-w-2xl md:max-w-4xl">
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
        <CardDescription>Please fill out the form below.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="Enter your location" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="payment-type">Payment Type</Label>
          <Select>
            <SelectTrigger aria-label="Payment Type" id="payment-type">
              <SelectValue placeholder="Select Payment Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="venmo">Venmo</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="urgency">Urgency</Label>
          <Select>
            <SelectTrigger aria-label="Urgency" id="urgency">
              <SelectValue placeholder="Select Urgency Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="severity">Severity</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="schedule">Schedule</Label>
          <Select>
            <SelectTrigger aria-label="Schedule" id="schedule">
              <SelectValue placeholder="Select Schedule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="now">Now</SelectItem>
              <SelectItem value="15-minutes">In 15 minutes</SelectItem>
              <SelectItem value="30-minutes">In 30 minutes</SelectItem>
              <SelectItem value="45-minutes">In 45 minutes</SelectItem>
              <SelectItem value="60-minutes">In 1 hour</SelectItem>
              <SelectItem value="75-minutes">In 1 hour 15 minutes</SelectItem>
              <SelectItem value="90-minutes">In 1 hour 30 minutes</SelectItem>
              <SelectItem value="105-minutes">In 1 hour 45 minutes</SelectItem>
              <SelectItem value="120-minutes">In 2 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-3/4 rounded-lg">Place order</Button>
      </CardFooter>
    </Card>
  );
}