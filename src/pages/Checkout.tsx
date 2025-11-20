import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useCart } from "../contexts/CartContext";
import { sendOrderAcknowledgment } from "../lib/email";
import {
  Heart,
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
} from "lucide-react";

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    donationItem,
    donationEmail,
    getCartTotal,
    removeFromCart,
    updateQuantity,
    setDonation,
  } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: donationEmail,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send order acknowledgment email
    await sendOrderAcknowledgment({
      order_id: `ORDER-${Date.now()}`, // Generate simple order ID
      customer_name: formData.name,
      customer_email: formData.email,
      delivery_address: formData.address,
      order_items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        total_price: (item.price * item.quantity).toFixed(2),
      })),
      donation_item: donationItem ? {
        name: donationItem.name,
        quantity: donationItem.quantity,
      } : undefined,
      order_total: getCartTotal().toFixed(2),
      recipient_message: '', // Can be added by admin later
    });

    navigate("/confirmation");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const donationTotal = donationItem
    ? donationItem.price * donationItem.quantity
    : 0;
  const total = getCartTotal();

  const handleRemoveDonation = () => {
    setDonation(null);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-8">Checkout</h1>

            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="rounded-xl border bg-card p-6">
                    <h2 className="mb-4">Your Information</h2>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="mt-1 rounded-lg"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="mt-1 rounded-lg"
                        />
                      </div>

                      <div>
                        <Label htmlFor="address">
                          Delivery Address
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="mt-1 rounded-lg"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="mt-1 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary px-8 py-4 text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                  >
                    Complete Order
                  </button>

                  <p className="text-center text-muted-foreground">
                    Thank you for supporting your community. 🌿
                  </p>
                </form>
              </div>

              <div className="space-y-6">
                <div className="rounded-xl border bg-card p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                    <h3>Order Summary</h3>
                  </div>

                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="space-y-2">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1">
                            <span className="text-muted-foreground">
                              {item.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity - 1,
                                )
                              }
                              className="flex h-6 w-6 items-center justify-center rounded-full border transition-colors hover:bg-secondary"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity + 1,
                                )
                              }
                              className="flex h-6 w-6 items-center justify-center rounded-full border transition-colors hover:bg-secondary"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() =>
                                removeFromCart(item.id)
                              }
                              className="ml-2 text-muted-foreground transition-colors hover:text-destructive"
                              title="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="w-20 text-right text-muted-foreground">
                            $
                            {(
                              item.price * item.quantity
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}

                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {donationItem && (
                  <div className="rounded-xl border border-accent bg-accent/10 p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-accent" />
                        <h3>Donation</h3>
                      </div>
                      <button
                        onClick={handleRemoveDonation}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                        title="Remove donation"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-muted-foreground">
                        <span>
                          {donationItem.quantity}x{" "}
                          {donationItem.name}
                        </span>
                        <span>
                          $
                          {(
                            donationItem.price *
                            donationItem.quantity
                          ).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-accent-foreground">
                        An acknowledgement of your donation well
                        recieved will be sent to:{" "}
                        {donationEmail}
                      </p>
                    </div>
                  </div>
                )}

                <div className="rounded-xl border bg-primary p-6 text-white">
                  <div className="flex items-center justify-between">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
