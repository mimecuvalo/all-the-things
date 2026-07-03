import type { AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

export default function Link({ children, target, className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={classNames('link', className)}
      {...props}
    >
      {children}
    </a>
  );
}
