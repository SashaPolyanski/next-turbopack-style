import clsx from 'clsx';
import Link from 'next/link';
import React, { ReactNode } from 'react';

import { BadgeGroups, BadgeGroupsItem } from '@/shared/ui/badge';
import { Card } from '@/shared/ui/card';
import { Heading } from '@/shared/ui/redesign';

import styles from './CourseProgramCard.module.scss';

type CourseProgramCardProps = {
  title: string;
  description: string;
  items: Array<BadgeGroupsItem>;
  href?: string;
  renderRight?: () => ReactNode;
  className?: string;
};

const ContentCard = ({
  className,
  renderRight,
  description,
  title,
  items,
}: Omit<CourseProgramCardProps, 'href'>) => {
  return (
    <Card className={clsx(styles.card, className)}>
      <div className={styles.info}>
        <div className={styles.badges}>
          <BadgeGroups
            items={items}
            empty="s"
          />
        </div>

        <Heading
          variant="h4"
          className={styles.title}
          color="secondary"
        >
          {title}
        </Heading>
        {description && (
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className={styles.description}
          />
        )}
      </div>

      {renderRight && renderRight()}
    </Card>
  );
};

export const CourseProgramCard = ({
  title,
  description,
  items,
  href,
  renderRight,
  className,
}: CourseProgramCardProps) => {
  const content = (
    <ContentCard
      renderRight={renderRight}
      className={className}
      items={items}
      description={description}
      title={title}
    />
  );

  return href ? <Link href={href}>{content}</Link> : content;
};
