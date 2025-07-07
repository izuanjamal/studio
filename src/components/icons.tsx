import type { ImgHTMLAttributes } from 'react';

// Omit src and alt as we are setting them, but allow other img props to be passed.
type AppLogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;

export function AppLogo(props: AppLogoProps) {
  // Set default width and height, which can be overridden by props.
  const { width = 48, height = 48, ...rest } = props;

  return (
    // Using a standard img tag to ensure compatibility and fix rendering issues.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Senibong Indah Logo"
      width={width}
      height={height}
      {...rest}
    />
  );