import { Metadata } from 'next';
import { Home } from './home';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Next.js: All The Things',
};

export default function HomePage() {
  return <Home />;
}
