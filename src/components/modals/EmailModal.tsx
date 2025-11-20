import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
  onBack: () => void;
}

export const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onBack,
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSubmit(email);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Where can we send your donation acknowledgement?
          </DialogTitle>
          <DialogDescription>
            We'll send you a message when your donation is
            delivered to someone in need with a message they
            have for you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-lg"
            />
            <p className="text-muted-foreground">
              We respect your privacy. Your email will only be
              used to send you the donation photo.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 rounded-full border border-border px-6 py-3 transition-colors hover:bg-secondary"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 rounded-full bg-primary px-6 py-3 text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
            >
              Done
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};