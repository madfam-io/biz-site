interface TranslationListProps {
  /** Translation function (from getTranslations) */
  t: (key: string) => string | Promise<string>;
  /** Translation key path to the array */
  translationKey: string;
  /** Maximum number of items to attempt (default: 20) */
  maxItems?: number;
  /** HTML element to render (default: 'ul') */
  as?: 'ul' | 'ol' | 'div';
  /** CSS classes for the container */
  className?: string;
  /** CSS classes for each item */
  itemClassName?: string;
}

export async function TranslationList({
  t,
  translationKey,
  maxItems = 20,
  as: Element = 'ul',
  className,
  itemClassName,
}: TranslationListProps) {
  // Dynamically build array items by trying each index
  const items: string[] = [];

  for (let i = 0; i < maxItems; i++) {
    const key = `${translationKey}.${i}`;

    try {
      const value = await t(key);

      // Check if the translation resolved to something other than the key itself
      // Next-intl returns the key path when translation is missing (e.g., "legal.terms.services.items.5")
      if (
        typeof value === 'string' &&
        !value.startsWith('legal.') && // Check if it's a translation key path
        !value.includes('.items.') && // Additional check for array item keys
        !value.includes('Missing message') &&
        value !== key
      ) {
        items.push(value);
      } else {
        // Stop when we reach a non-existent translation
        break;
      }
    } catch {
      // Stop on any translation error - most likely means we've reached the end of the array
      break;
    }
  }

  if (items.length === 0) {
    return null;
  }

  const ItemElement = Element === 'div' ? 'div' : 'li';

  return (
    <Element className={className}>
      {items.map((item, index) => (
        <ItemElement key={index} className={itemClassName}>
          {item}
        </ItemElement>
      ))}
    </Element>
  );
}
