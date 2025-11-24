/* eslint-disable */

const NBSP = '\u00A0';

const cache = new Map<string, string>();

// В изменённом Типографом тексте неразрывные юникод пробелы заменяются на выбранный тип неразрывного пробела.
// Создаётся два варианта текста, один с не форматированным пробелом (&nbsp;), он нужен для копирования.
// Второй с пробелом для отображения на экране &amp;nbsp;
export default function getSpaces(stringToParse?: string): string {
  if (!stringToParse) return '';
  if (cache.has(stringToParse)) {
    return cache.get(stringToParse) || '';
  }
  let regexp;

  let result = stringToParse;

  // Неразрывный пробел между инициалами и фамилией
  // Инициалы слитно, неразрывный пробел, фамилия
  regexp = new RegExp(
    '(^|[\\u0020«„\\"\\(\\[])([А-ЯЁ]\\.)\u0020?([А-ЯЁ]\\.)?\u0020?([А-ЯЁ][а-яё]+)([\\s.,;:?!\\"»“‘\\)\\]]|$)',
    'gm',
  );
  result = result.replace(
    regexp,
    (match, p1: string, p2: string, p3: string, p4: string, p5: string) => {
      return p1 + p2 + (p3 || '') + NBSP + p4 + p5;
    },
  );

  // Фамилия, неразрывный пробел, инициалы слитно
  regexp = new RegExp(
    '(^|[\\u0020«„\\"(\\[])([А-ЯЁ][а-яё]+)\\u0020?([А-ЯЁ]\\.)\\u0020?([А-ЯЁ]\\.)?([\\s.,;:?!\\"»“‘\\)\\]]|$)',
    'gm',
  );
  result = result.replace(
    regexp,
    (match, p1: string, p2: string, p3: string, p4: string, p5: string) => {
      return p1 + p2 + NBSP + p3 + (p4 || '') + p5;
    },
  );

  // Неразрывные пробелы между словом и и т.д. и т.п. и др.
  result = result.replace(
    /(.)\u0020+(и)\u0020+((т\.д\.)|(т\.п\.)|(др\.))/g,
    (match, p1: string, p2: string, p3: string) => {
      return p1 + NBSP + p2 + NBSP + p3;
    },
  );

  // Неразрывный пробел ПЕРЕД б, бы, ж, же, ли, ль
  const regexpBefore = new RegExp(
    `\\u0020(б|бы|ж|же|ли|ль)([^А-ЯЁа-яё])`,
    'gim',
  );

  result = result.replace(regexpBefore, (match, p1: string, p2: string) => {
    return NBSP + p1 + p2;
  });

  // Неразрывный пробел ПОСЛЕ стр. гл. рис. илл. ст. п. c.
  const regexpAfter = new RegExp(
    '(^|[\\u0020«„\\"\\(\\[])(стр|гл|рис|илл?|ст|п|c)\\.\\u0020',
    'gim',
  );

  result = result.replace(regexpAfter, (match, p1: string, p2: string) => {
    return `${p1 + p2}.${NBSP}`;
  });

  // Неразрывный пробел ПОСЛЕ №
  result = result.replace(/№([^\s])/gm, (match, p1: string) => {
    return `№${NBSP}${p1}`;
  });

  // Неразрывный пробел между числом и следующим словом
  result = result.replace(
    /(\d)\u0020+([a-zа-яё])/gi,
    (match, p1: string, p2: string) => {
      return p1 + NBSP + p2;
    },
  );

  // Неразрывный пробел между числом и следующим числом
  result = result.replace(
    /(\d)\u0020+(\d)/gi,
    (match, p1: string, p2: string) => {
      return p1 + NBSP + p2;
    },
  );

  // Неразрывный пробел ПОСЛЕ сокращенй город, область, край, станция, поселок, село,деревня, улица, переулок, проезд, проспект,бульвар, площадь, набережная, шоссе, тупик, офис, комната, участок, владение, строение, корпус, дом, квартира, микрорайон
  result = result.replace(
    /(^|\,[\u0020\u00A0])(г|обл|кр|ст|пос|с|д|ул|пер|пр|пр-т|просп|пл|бул|б-р|наб|ш|туп|оф|кв|комн?|под|мкр|уч|вл|влад|стр|корп?|эт|пгт)\.\u0020?(\-?[А-ЯЁ\d])/gm,
    (match, p1: string, p2: string, p3: string) => {
      return `${p1 + p2}.${NBSP}${p3}`;
    },
  );

  // Неразрывный пробел ПОСЛЕ дом
  result = result.replace(
    /(^|\,[\u0020\u00A0])(дом)\u0020(\d)/gm,
    (match, p1: string, p2: string, p3: string) => {
      return p1 + p2 + NBSP + p3;
    },
  );

  // Неразрывный пробел ПОСЛЕ литер
  result = result.replace(
    /(^|\,[\u0020\u00A0])(литера?)\u0020([А-ЯЁ])/gm,
    (match, p1: string, p2: string, p3: string) => {
      return p1 + p2 + NBSP + p3;
    },
  );

  // Неразрывный пробел ПОСЛЕ короткого слова
  regexp = new RegExp(
    '(^|[\\u0020\\u00A0«„\\"\\(\\[])([А-ЯЁа-яё]{1,3})\\u0020',
    'gim',
  );
  result = result.replace(regexp, (match, p1: string, p2: string) => {
    return p1 + p2 + NBSP;
  });

  // Неразрывный пробел ПЕРЕД последним коротким словом в предложении или одиночной строке
  result = result.replace(
    /\u0020([а-яё]{1,2}[!?…»]?$)/gim,
    (match, p1: string) => {
      return NBSP + p1;
    },
  );

  regexp = new RegExp('\\u0020([а-яё]{1,3}[\\.!?…](\\u0020.|$))', 'gmi');
  result = result.replace(regexp, (match, p1: string) => {
    return NBSP + p1;
  });
  regexp = new RegExp(
    '\\u0020([а-яё]{1,3}[\\.!?…][\\)\\]](\\u0020.|$))',
    'gmi',
  );
  result = result.replace(regexp, (match, p1: string) => {
    return NBSP + p1;
  });
  regexp = new RegExp(
    '\\u0020([а-яё]{1,3}[\\)\\]][\\.!?…](\\u0020.|$))',
    'gmi',
  );
  result = result.replace(regexp, (match, p1: string) => {
    return NBSP + p1;
  });
  regexp = new RegExp('\\u0020([а-яё]{1,3}[!?…][\\"»](\\u0020.|$))', 'gmi');
  result = result.replace(regexp, (match, p1: string) => {
    return NBSP + p1;
  });
  regexp = new RegExp(
    '\\u0020([а-яё]{1,3}[!?…]?[\\"»][\\.!?…](\\u0020.|$))',
    'gmi',
  );
  result = result.replace(regexp, (match, p1: string) => {
    return NBSP + p1;
  });

  cache.set(stringToParse, result);
  return result;
}
