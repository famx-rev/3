import { StartupServicePage } from './ServicePage';

const services = [
  { title: 'Privacy policy', description: 'Generate a privacy policy tailored to your data flows.', ready: true },
  { title: 'Terms of service', description: 'Create enforceable terms for your customers and users.', ready: false },
  { title: 'Founder agreements', description: 'Plain-language founder contracts you can sign digitally.', ready: false },
];

export const StartupLegal = () => (
  <StartupServicePage
    heading="Legal workspace"
    description="Generate, sign, and store the documents your startup needs."
    services={services}
    action="Generate"
  />
);

export default StartupLegal;
