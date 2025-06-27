import colors from 'tailwindcss/colors';

import { tailwindGradientColorSplitterRegex } from '../constants/regex/tailwind-gradient-color-splitter';
import { gradients } from '../constants/gradients';

export function getGradient (index: number, returnAsHexArray?: false): string;
export function getGradient (index: number, returnAsHexArray: true): [number, string][];

export function getGradient (index: number, returnAsHexArray = false) {
  const gradient = gradients[index % gradients.length];

  if (returnAsHexArray) {
    const [, start, stop] = gradient.split(' ');

    const splittedStart = start.match(tailwindGradientColorSplitterRegex);
    const splittedStop = stop.match(tailwindGradientColorSplitterRegex);

    if (!splittedStart || !splittedStop) return;

    const [, colorStart, shadeStart] = splittedStart;
    const [, colorStop, shadeStop] = splittedStop;

    const colorSetStart = colors[colorStart as keyof typeof colors];
    const colorSetStop = colors[colorStop as keyof typeof colors];

    if (!colorSetStart || !colorSetStop) return;

    const hexStart = (colorSetStart as any)[shadeStart];
    const hexStop = (colorSetStop as any)[shadeStop];

    return [
      [0, typeof hexStart === 'string' ? hexStart : null],
      [1, typeof hexStop === 'string' ? hexStop : null]
    ];
  }

  return gradient;
};