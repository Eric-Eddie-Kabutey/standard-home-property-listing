'use client';

import React from 'react';
import { NavigationMenuTrigger } from '@/components/ui/navigation-menu';

const NavTriggerUnderline = React.forwardRef<
  React.ElementRef<typeof NavigationMenuTrigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuTrigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuTrigger
    ref={ref}
    className={`
      group relative bg-transparent text-black shadow-none
      hover:bg-transparent focus:bg-transparent
      data-[state=open]:bg-transparent
      focus:text-accent-foreground text-sm font-medium
      transition-colors
      ${className}
    `}
    {...props}
  >
    {children}
    {/* Animated Underline */}
    <span
      className="
        absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-[80%] bg-[#03444A]
        scale-x-0 group-focus-visible:scale-x-100 group-data-[state=open]:scale-x-100
        transition-transform duration-300 ease-out origin-left
      "
      aria-hidden="true"
    />
  </NavigationMenuTrigger>
));
NavTriggerUnderline.displayName = 'NavTriggerUnderline';

export { NavTriggerUnderline };