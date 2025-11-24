import { useAnalytics } from '@/shared/lib/hooks/use-analytics';
import { useMedia } from '@/shared/lib/hooks/use-media';
import { BadgeGroups, BadgeGroupsItem } from '@/shared/ui/badge';
import { Card } from '@/shared/ui/card';
import { Button, Heading, Paragraph } from '@/shared/ui/redesign';
import { ResponsiveImage } from '@/shared/ui/ResponsiveImage';
import { IconCalendar, IconClock } from '@/shared/ui/svg';
import { Timer } from '@/shared/ui/timer';

import styles from './IntensivesMainBanner.module.scss';

interface IntensivesMainBannerProps {
  id: string;
  handleSubscribe: () => void;
  title?: string;
  description?: string;
  isSubscribed?: boolean;
  isLoading?: boolean;
  dayStart?: string;
  duration?: string;
  refetch?: () => void;
  handleChat: () => void;
  registrationEnd: string;
  tags?: Array<BadgeGroupsItem>;
  image?: string;
}

export const IntensivesMainBanner = (props: IntensivesMainBannerProps) => {
  const {
    id,
    handleSubscribe,
    handleChat,
    refetch,
    title,
    description,
    dayStart = '- : -',
    duration = '10 дней',
    registrationEnd,
    isSubscribed = false,
    isLoading = false,
    tags = [{ label: 'Интенсив' }],
    image,
  } = props;

  const items: Array<BadgeGroupsItem> = [
    ...tags,
    { label: dayStart, iconLeft: IconCalendar },
    { label: duration, iconLeft: IconClock },
  ];

  const { track, ref, defaultParams } = useAnalytics({
    sendAfterVisible: true,
    type: 'Intensive_Banner',
    params: {
      is_join: isSubscribed.toString(),
      intensive_name: title,
      intensive_dt: registrationEnd,
      intensive_id: id,
    },
  });

  const handleClickSubscribe = () => {
    track('Intensive_BannerJoin', {
      action: 'click',
      params: {
        ...defaultParams,
        intensive_name: title,
        intensive_dt: registrationEnd,
        intensive_id: id,
      },
    });
    handleSubscribe();
  };

  const handleClickChat = () => {
    track('Intensive_BannerJoinChat', {
      action: 'click',
      params: {
        ...defaultParams,
        intensive_name: title,
        intensive_dt: registrationEnd,
        intensive_id: id,
      },
    });
    handleChat();
  };

  const { isDesktop } = useMedia();

  return (
    <Card className={styles.card}>
      <div
        ref={ref}
        className={styles.info}
      >
        <BadgeGroups
          items={items}
          className={styles.badge}
          rootClassName={styles.badges}
          size="medium"
        />
        <Heading
          variant="h2"
          className={styles.title}
        >
          {title}
        </Heading>
        <Paragraph
          variant="medium"
          className={styles.description}
        >
          {description}
        </Paragraph>
        {!isDesktop && image && (
          <ResponsiveImage
            alt="Как стать продавцом"
            className={styles.mobileImage}
            src={image}
          />
        )}
        {!isDesktop && !isSubscribed && (
          <div className={styles.time}>
            <Timer
              className={styles.timer}
              titleVariants={{
                future: 'До конца регистрации:',
                active: 'Регистрация закрыта:',
              }}
              startDate={registrationEnd}
              onEnd={refetch}
            />
          </div>
        )}
        {isSubscribed ? (
          <Button
            onClick={handleClickChat}
            theme="dark"
            size="l"
            className={styles.button}
          >
            Вступить в чат потока
          </Button>
        ) : (
          <Button
            onClick={handleClickSubscribe}
            disabled={isLoading}
            theme="dark"
            size="l"
            className={styles.button}
          >
            Записаться бесплатно
          </Button>
        )}
      </div>
      {isDesktop && !isSubscribed && (
        <div className={styles.time}>
          <Timer
            className={styles.timer}
            titleVariants={{
              future: 'До конца регистрации:',
              active: 'Регистрация закрыта:',
            }}
            startDate={registrationEnd}
            onEnd={refetch}
          />
        </div>
      )}
      <div className={styles.round} />
      {image && (
        <ResponsiveImage
          alt="Как стать продавцом"
          className={styles.image}
          src={image}
        />
      )}
    </Card>
  );
};
