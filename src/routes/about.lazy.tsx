import { createLazyFileRoute } from '@tanstack/react-router'

import FavoritesCharacters from 'components/organisms/FavoritesCharacters';

export const Route = createLazyFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="p-2">
      <div className="h-2" />
      <FavoritesCharacters />
      <div className="h-2" />
    </div>
  );
}