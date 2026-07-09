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

/**
 * Décalage centre-à-centre entre deux éléments, en pixels.
 * Les scènes bento peuvent être scalées via `--bento-scene-scale` : les
 * `getBoundingClientRect` renvoient alors des px visuels déjà scalés alors
 * que les transforms Anime.js s'appliquent dans le repère local (non scalé)
 * de `to`. On divise donc le delta par l'échelle héritée de `to`.
 */
export const centerDelta = (from: HTMLElement, to: HTMLElement) => {
  const fromRect = from.getBoundingClientRect();
  const toRect = to.getBoundingClientRect();
  const scale = to.offsetWidth > 0 ? toRect.width / to.offsetWidth : 1;
  return {
    x:
      (fromRect.left + fromRect.width / 2 - (toRect.left + toRect.width / 2)) /
      scale,
    y:
      (fromRect.top + fromRect.height / 2 - (toRect.top + toRect.height / 2)) /
      scale,
  };
};
