import { Card } from '@/shared/ui/card';

import styles from './ChannelBanner.module.scss';

export const ChannelBanner = () => {
  return (
    <Card
      size="small"
      className={styles.bannerCard}
    >
      <div className={styles.bannerTitle}>NEXT JS TOP</div>
      <button
        type="button"
        className={styles.button}
      >
        Send
      </button>
    </Card>
  );
};
