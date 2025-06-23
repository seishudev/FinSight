import type { ReactNode } from 'react'

export interface Tab {
   value: string;
   label: string;
   content?: ReactNode;
   prefix?: ReactNode;
   postfix?: ReactNode;
}