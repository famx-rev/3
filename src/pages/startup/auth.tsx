import { StartupServicePage } from './ServicePage';

const services = [
  { title: 'Sign-in methods', description: 'Email, password, Google, GitHub, and magic links.', ready: true },
  { title: 'Session security', description: 'Control session length, refresh tokens, and device trust.', ready: false },
  { title: 'MFA enforcement', description: 'Require multi-factor authentication for sensitive areas.', ready: false },
];

export const StartupAuth = () => (
  <StartupServicePage
    heading="Authentication"
    description="Secure access for your team and customers."
    services={services}
    action="Set up"
  />
);

export default StartupAuth;
