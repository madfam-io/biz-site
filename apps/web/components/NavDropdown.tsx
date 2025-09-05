'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { cn } from '@madfam/ui';

interface NavItem {
  name: string;
  href: string;
  description?: string;
}

interface NavDropdownProps {
  label: string;
  items: NavItem[];
  className?: string;
}

export function NavDropdown({ label, items, className }: NavDropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className={cn(
          'inline-flex items-center gap-1 text-sm font-medium text-obsidian/70 dark:text-pearl/70 hover:text-obsidian dark:hover:text-pearl transition-colors',
          className
        )}
      >
        {label}
        <ChevronDownIcon
          className="ml-1 h-4 w-4 transition-transform ui-open:rotate-180"
          aria-hidden="true"
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white dark:bg-obsidian shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {items.map(item => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <Link
                    href={item.href}
                    className={cn(
                      active
                        ? 'bg-gray-50 dark:bg-obsidian/50 text-obsidian dark:text-pearl'
                        : 'text-gray-700 dark:text-pearl/70',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    <div>
                      <div className="font-medium">{item.name}</div>
                      {item.description && (
                        <div className="text-xs text-gray-500 dark:text-pearl/50 mt-0.5">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
