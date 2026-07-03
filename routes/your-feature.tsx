import { createFileRoute } from '@tanstack/react-router';
import YourFeature from 'components/pages/YourFeature';

export const Route = createFileRoute('/your-feature')({
  component: YourFeature,
});
