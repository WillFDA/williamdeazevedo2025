/**
 * Scène "Renfort front-end" — un diff se joue dans un mini éditeur sombre :
 * la ligne fautive est barrée puis s'estompe, deux lignes correctives se
 * "tapent" (pilules en scaleX), la barre de statut passe de "1 problème"
 * à "0 problème" et le badge "Corrigé" confirme. Cycle ~7,4 s.
 */

import { animate, createTimeline, utils } from "animejs";

import { addPlayer, type BentoPlayer, query, queryAll } from "./shared";

export const animateFrontend = (root: HTMLElement, players: BentoPlayer[]) => {
  const editor = query(root, "[data-bento-fe-editor]");
  const strike = query(root, "[data-bento-fe-strike]");
  const deletedLine = query(root, "[data-bento-fe-line-del]");
  const addedLines = queryAll(root, "[data-bento-fe-line-add]");
  const addedPills = queryAll(root, "[data-bento-fe-add-pill]");
  const statusError = query(root, "[data-bento-fe-status-err]");
  const statusOk = query(root, "[data-bento-fe-status-ok]");
  const chip = query(root, "[data-bento-fe-chip]");
  const caret = query(root, "[data-bento-fe-caret]");
  const glow = query(root, "[data-bento-fe-glow]");

  if (editor) {
    utils.set(editor, { y: 0 });
    addPlayer(
      players,
      animate(editor, {
        y: 3,
        alternate: true,
        duration: 5200,
        ease: "inOut(2)",
        loop: true,
      })
    );
  }

  if (caret) {
    addPlayer(
      players,
      animate(caret, {
        opacity: [1, 0],
        alternate: true,
        duration: 520,
        ease: "linear",
        loop: true,
      })
    );
  }

  const required =
    strike &&
    deletedLine &&
    statusError &&
    statusOk &&
    chip &&
    glow &&
    addedLines.length > 0;
  if (!required) return;

  utils.set(strike, { scaleX: 0 });
  utils.set(deletedLine, { opacity: 1 });
  utils.set(addedLines, { opacity: 0, x: -8 });
  utils.set(addedPills, { scaleX: 0 });
  utils.set(statusError, { opacity: 1, y: 0 });
  utils.set(statusOk, { opacity: 0, y: 4 });
  utils.set(chip, { opacity: 0, scale: 0.84 });
  utils.set(glow, { opacity: 0 });

  const timeline = createTimeline({ loop: true });

  // La ligne fautive est barrée puis s'estompe.
  timeline.add(strike, { scaleX: 1, duration: 380, ease: "out(3)" }, 600);
  timeline.add(
    deletedLine,
    { opacity: 0.38, duration: 340, ease: "out(2)" },
    880
  );

  // Les lignes correctives arrivent puis leurs pilules se "tapent".
  addedLines.forEach((line, index) => {
    timeline.add(
      line,
      { opacity: 1, x: 0, duration: 300, ease: "out(3)" },
      1350 + index * 800
    );
  });
  addedPills.forEach((pill, index) => {
    timeline.add(
      pill,
      { scaleX: 1, duration: 260, ease: "out(2)" },
      1500 + index * 340
    );
  });

  // La barre de statut passe au vert, halo + badge confirment.
  timeline.add(
    statusError,
    { opacity: 0, y: -4, duration: 260, ease: "in(2)" },
    2900
  );
  timeline.add(
    statusOk,
    { opacity: 1, y: 0, duration: 300, ease: "out(3)" },
    3020
  );
  timeline.add(
    glow,
    {
      opacity: [
        { to: 0.55, duration: 360, ease: "out(2)" },
        { to: 0, duration: 700, ease: "in(2)" },
      ],
    },
    3300
  );
  timeline.add(
    chip,
    { opacity: 1, scale: 1, duration: 420, ease: "out(4)" },
    3350
  );
  timeline.add(
    chip,
    { opacity: 0, scale: 0.9, duration: 300, ease: "in(2)" },
    5500
  );

  // Pause lisible (état corrigé) puis reset.
  timeline.add(strike, { scaleX: 0, duration: 240, ease: "in(2)" }, 6700);
  timeline.add(deletedLine, { opacity: 1, duration: 260, ease: "in(2)" }, 6700);
  timeline.add(
    addedLines,
    { opacity: 0, x: -8, duration: 240, ease: "in(2)" },
    6700
  );
  timeline.add(addedPills, { scaleX: 0, duration: 1 }, 6960);
  timeline.add(
    statusOk,
    { opacity: 0, y: 4, duration: 240, ease: "in(2)" },
    6700
  );
  timeline.add(
    statusError,
    { opacity: 1, y: 0, duration: 280, ease: "out(2)" },
    6860
  );

  addPlayer(players, timeline);
};
