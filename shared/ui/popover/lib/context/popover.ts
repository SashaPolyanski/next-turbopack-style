'use client';

import { createContext } from 'react';

import { usePopover } from '../hooks/use-popover';

type ContextType = ReturnType<typeof usePopover> | null;

export const PopoverContext = createContext<ContextType>(null);
