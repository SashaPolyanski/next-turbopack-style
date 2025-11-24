interface Window {
  wba: (event: string, data?: unknown) => void;
  onTelegramAuth?: (user: { id: string }) => void;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  import { FC, SVGProps } from 'react';

  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module '*.svg?react' {
  import { FC, SVGProps } from 'react';

  const content: FC<SVGProps<SVGElement>>;
  export default content;
}
