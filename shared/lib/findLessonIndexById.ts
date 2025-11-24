export const getLessonIndex = (
  lessonId: string,
  children?: Array<any>,
): number => {
  if (!children) return -1;

  // Сначала проверяем текущий уровень
  const directIndex = children.findIndex((item) => item.uid === lessonId);
  if (directIndex !== -1) return directIndex;

  // Если не нашли, рекурсивно проверяем вложенные элементы
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.elements && child.elements.length > 0) {
      const nestedIndex = getLessonIndex(lessonId, child.elements);
      if (nestedIndex !== -1) {
        // Возвращаем индекс текущего элемента, так как нашли во вложенности
        return i;
      }
    }
  }

  return -1;
};

export function findLessonIndexById(
  courseStructure: Array<any>,
  lessonId: string,
) {
  function searchInElements(elements: Array<any>, targetId: string): number {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.type === 'Урок' && element.uid === targetId) {
        return i;
      }
      if (element.elements && element.elements.length > 0) {
        const foundIndex = searchInElements(element.elements, targetId);
        if (foundIndex !== -1) {
          return foundIndex;
        }
      }
    }
    return -1;
  }
  if (Array.isArray(courseStructure)) {
    return searchInElements(courseStructure, lessonId);
  }
}
