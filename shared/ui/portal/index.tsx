import { useEffect, useId, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { PortalProps } from './types';

export const Portal = ({
  children,
  propElement,
  propIdNameElement = 'modal',
}: PortalProps) => {
  const id = useId();
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const createdElement = document.createElement('div');
    createdElement.setAttribute('id', `${propIdNameElement}-${id}`);
    setContainer(createdElement);

    return () => {
      if (createdElement.parentNode) {
        createdElement.parentNode?.removeChild(createdElement);
      }
    };
  }, [id, propIdNameElement]);

  useEffect(() => {
    if (!container) return;

    const element =
      propElement || document.querySelector('#portal-app') || document.body;

    if (element instanceof HTMLElement) {
      ref.current = element;
      element.appendChild(container);
      setMounted(true);
    }

    return () => {
      if (container.parentNode === element) {
        element.removeChild(container);
      }
    };
  }, [container, propElement]);

  return mounted && container
    ? ReactDOM.createPortal(children, container)
    : null;
};
