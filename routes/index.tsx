import { createFileRoute } from '@tanstack/react-router';
import HomeContent from 'components/pages/HomeContent';

export const Route = createFileRoute('/')({
  component: HomeContent,
});
