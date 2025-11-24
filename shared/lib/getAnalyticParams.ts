type ActionTitle =
  | string
  | {
      props?: {
        children?: ActionTitle | Array<ActionTitle>;
      };
      textContent?: string;
    }
  | Array<ActionTitle>;

/**
 * Извлекает текст из `actionTitle` для передачи в аналитику.
 * Поддерживает строки, React-элементы, массивы и вложенные структуры.
 */
export const getAnalyticsParams = (
  actionTitle?: ActionTitle,
): { actionText?: string } => {
  const extractText = (node: ActionTitle): string => {
    if (node === null || node === undefined || typeof node === 'boolean') {
      return '';
    }
    if (typeof node === 'string' || typeof node === 'number') {
      return String(node);
    }
    if (Array.isArray(node)) {
      return node.map(extractText).join(' ');
    }
    if (typeof node === 'object') {
      // Если есть textContent, используем его (например, для SVG-элементов)
      if (typeof node.textContent === 'string') {
        return node.textContent;
      }
      // Рекурсивно извлекаем текст из children
      if (node.props?.children) {
        return extractText(node.props.children);
      }
    }
    return '';
  };

  return {
    actionText: actionTitle ? extractText(actionTitle) : undefined,
  };
};
