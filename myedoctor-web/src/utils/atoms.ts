import { atom } from 'jotai';
import { InvestigationStep } from '../types/investigationStep';

export const investigationResponseAtom = atom<string | undefined>(undefined);
export const investigationResponseSourceAtom = atom<string | undefined>(undefined);

export const investigationStepAtom = atom<InvestigationStep>('INITIAL');

export const investigationTextAtom = atom<string | undefined>(undefined);

export const testIdAtom = atom<string | undefined>(undefined);
export const characterSizeAtom = atom<number | undefined>(undefined);
