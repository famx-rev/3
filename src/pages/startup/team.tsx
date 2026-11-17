import { StartupServicePage } from './ServicePage';

const services = [
  { title: 'Team members', description: 'See everyone in your startup and what they can access.', ready: true },
  { title: 'Roles & permissions', description: 'Decide who can view, edit, and manage each area.', ready: false },
  { title: 'Invitations', description: 'Invite teammates by email with a pending join link.', ready: false },
];

export const StartupTeam = () => (
  <StartupServicePage
    heading="Team"
    description="Invite teammates and control what they can access."
    services={services}
    action="Invite"
  />
);

export default StartupTeam;
