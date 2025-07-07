import Image from 'next/image';
import type { ComponentProps } from 'react';

// Omit src and alt as we are setting them, but allow other Image props to be passed.
type AppLogoProps = Omit<ComponentProps<typeof Image>, 'src' | 'alt'>;

export function AppLogo(props: AppLogoProps) {
  // Set default width and height, which can be overridden by props or className.
  const { width = 48, height = 48, ...rest } = props;

  return (
    <Image
      src="/logo.png"
      alt="Senibong Indah Logo"
      width={width}
      height={height}
      {...rest}
    />
  );
}
