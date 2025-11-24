import { Card } from '@/shared/ui/card';
import { Heading, Paragraph } from '@/shared/ui/redesign';
import { IconCheckRound } from '@/shared/ui/svg';

import styles from './YouWillFindOut.module.scss';

type TProps = {
  items: any['program']['elements'];
};

export const YouWillFindOut = ({ items }: TProps) => (
  <>
    <Heading
      variant="h2"
      color="secondary"
      className={styles.title}
    >
      Lorem
    </Heading>

    <div className={styles.cards}>
      {items.map(({ text }: any) => (
        <Card
          className={styles.card}
          key={text}
          size="small"
        >
          <IconCheckRound className={styles.icon} />
          <Paragraph
            variant="medium"
            color="secondary"
          >
            {text}
          </Paragraph>
        </Card>
      ))}
    </div>
  </>
);
