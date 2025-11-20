import emailjs from '@emailjs/browser';

interface OrderDetails {
  order_id: string;
  customer_name: string;
  customer_email: string;
  delivery_address: string;
  order_items: Array<{
    name: string;
    quantity: number;
    total_price: string;
  }>;
  donation_item?: {
    name: string;
    quantity: number;
  };
  order_total: string;
  recipient_message?: string;
}

export interface TemplateParams {
  order_id: string;
  customer_name: string;
  customer_email: string;
  delivery_address: string;
  order_summary: string;
  donation_summary: string;
  donation_message: string;
  order_total: string;
}

export const sendOrderAcknowledgment = async (details: OrderDetails) => {
  try {
    // Format order items as readable string
    const orderSummary = details.order_items
      .map(item => `${item.name} x${item.quantity} ($${item.total_price})`)
      .join(', ');

    // Format donation as readable string
    const donationSummary = details.donation_item
      ? `${details.donation_item.name} x${details.donation_item.quantity}`
      : '';

    const donationMessage = details.donation_item
      ? `Thank you for your generous donation! Your kindness helps feed someone in need.\n${details.recipient_message ? `The recipient of your donation says: ${details.recipient_message}` : 'The recipient of your donation says: Thank you for your generous meal donation! Your kindness made a difference today.'}`
      : '';

    const templateParams = {
      order_id: details.order_id,
      customer_name: details.customer_name,
      customer_email: details.customer_email,
      delivery_address: details.delivery_address,
      order_summary: orderSummary,
      donation_summary: donationSummary,
      donation_message: donationMessage,
      order_total: details.order_total,
    };

    console.log('EmailJS Template Params:', templateParams);

    const result = await emailjs.send(
      (import.meta as any).env.VITE_EMAILJS_SERVICE_ID,
      (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY
    );
    return { success: true, result };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};
