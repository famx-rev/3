import { StartupServicePage } from './ServicePage';

const services = [
  { title: 'Customer checkout', description: 'Accept one-time and recurring payments from customers.', ready: false },
  { title: 'Invoices & receipts', description: 'Automatic branded invoices for every charge.', ready: false },
  { title: 'Tax handling', description: 'Calculate and collect the right tax on every sale.', ready: false },
];

export const StartupBilling = () => (
  <StartupServicePage
    heading="Billing & subscriptions"
    description="Charge customers and manage your own plan."
    services={services}
    action="Set up"
  />
);

export default StartupBilling;
