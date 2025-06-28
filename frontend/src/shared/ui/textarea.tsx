import * as React from 'react';

import { cn } from '@/shared/utils/tw-merge';
import { Label } from './label'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'> & { label?: string, error?: string }
>(({ className, label, error, ...props }, ref) => {
  return (
    <div>
      {label && <Label className="text-white">{label}</Label>}
      <textarea
        className={cn(
          'flex border resize-none border-white/10 h-24 w-full bg-white/5 rounded-xl px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground text-white focus-visible:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          label && "mt-2",
          className,
        )}
        ref={ref}
        {...props}
      />
      {error && <span className="mt-2 inline-block text-xs smx:text-sm text-red-600">{error}</span>}
    </div>
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
