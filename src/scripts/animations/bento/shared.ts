/**
 * Types et petits utilitaires partagés par les scènes animées du bento
 * services. Chaque scène expose une fonction `animateX(root, players)` qui
 * remplit `players` avec ses animations Anime.js pour que l'orchestrateur
 * (ServicesBentoGrid.astro) puisse les mettre en pause et les nettoyer.
 */

export type BentoPlayer = {
  cancel?: () => void;
  pause?: () => void;
  play?: () => void;
  revert?: () => void;
};

export const addPlayer = (
  players: BentoPlayer[],
  player: BentoPlayer | null | undefined
) => {
  if (player) players.push(player);
};

export const query = (root: HTMLElement, selector: string) =>
  root.querySelector<HTMLElement>(selector);

export const queryAll = (root: HTMLElement, selector: string) =>
  Array.from(root.querySelectorAll<HTMLElement>(selector));

/** Décalage centre-à-centre entre deux éléments, en pixels. */
export const centerDelta = (from: HTMLElement, to: HTMLElement) => {
  const fromRect = from.getBoundingClientRect();
  const toRect = to.getBoundingClientRect();
  return {
    x: fromRect.left + fromRect.width / 2 - (toRect.left + toRect.width / 2),
    y: fromRect.top + fromRect.height / 2 - (toRect.top + toRect.height / 2),
  };
};
