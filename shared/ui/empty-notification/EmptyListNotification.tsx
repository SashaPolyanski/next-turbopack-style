import { clsx } from 'clsx';

import { getSpaces } from '@/shared/lib/typograf';

interface IEmptyListNotification {
  // eslint-disable-next-line react/no-unused-prop-types
  className?: string;
  title: string;
  description: string;
}

export function EmptyListNotification({
  title = 'Произошла ошибка',
  description = 'Проверьте подключение к интернету. Если все хорошо, вероятно ошибка на нашей стороне и мы уже работаем над ней.',
  className,
}: Partial<IEmptyListNotification>) {
  return (
    <div
      className={clsx(
        // styles.emptyListNotification,
        'light-wrapper-card flex flex-col gap-sm-4-vw overflow-hidden rounded-sm-6-vw bg-gray-dark p-sm-7-vw pt-sm-5-vw sm:gap-4 sm:rounded-xl-6 sm:p-7 sm:pt-5',
        className,
      )}
    >
      <h2 dangerouslySetInnerHTML={{ __html: getSpaces(title) }} />
      <p
        className="text-sm-l-vw sm:text-m"
        dangerouslySetInnerHTML={{ __html: getSpaces(description) }}
      />
    </div>
  );
}

function EmptyListBlurNotification({
  title,
  description,
}: IEmptyListNotification) {
  return (
    <div className="flex flex-col gap-sm-4-vw rounded-sm-4-vw bg-[#f9f5ff]/10 p-sm-4-vw sm:gap-4 sm:rounded-xl-6 sm:px-[28px] sm:pb-[30px] sm:pt-5">
      <p
        className="text-sm-2xl-vw font-bold sm:text-1xl"
        dangerouslySetInnerHTML={{ __html: getSpaces(title) }}
      />
      <p
        className="text-sm-l-vw sm:text-m"
        dangerouslySetInnerHTML={{ __html: getSpaces(description) }}
      />
    </div>
  );
}

export function ServerErrorNotification() {
  return (
    <EmptyListNotification
      title="Произошла ошибка"
      description="Проверьте подключение к интернету. Если все хорошо, вероятно ошибка на нашей стороне и мы уже работаем над ней."
    />
  );
}

export function EventsSoonNotification() {
  return (
    <EmptyListNotification
      title="Скоро здесь будут мероприятия"
      description="Пока их нет, но мы готовим для вас что-то интересное. Подпишитесь на нашего бота, он пришлёт уведомление о событии."
    />
  );
}

export function EventsBlurErrorSoonNotification() {
  return (
    <EmptyListBlurNotification
      title="Произошла ошибка"
      description="Проверьте подключение к интернету. Если все хорошо, вероятно ошибка на нашей стороне и мы уже работаем над ней."
    />
  );
}

export function EventsBlurSoonNotification({
  category,
}: {
  category: 'online' | 'offline';
}) {
  return (
    <EmptyListBlurNotification
      title={`Скоро здесь будут ${category === 'offline' ? 'мероприятия' : 'вебинары'}`}
      description="Пока их нет, но мы готовим для вас что-то интересное. Подпишитесь на нашего бота, он пришлёт уведомление о событии."
    />
  );
}

export const IntensivesBlurSoonNotification = () => (
  <EmptyListBlurNotification
    title="Скоро здесь будут интенсивы"
    description="Пока их нет, но мы готовим для вас что-то интересное. Подпишитесь на нашего бота, он пришлёт уведомление о событии."
  />
);
