/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */

type ExtractRouteParams<T extends string> = string extends T
  ? { [key: string]: string | number }
  : T extends `${infer _}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractRouteParams<`/${Rest}`>]: string | number }
    : T extends `${infer _}:${infer Param}`
      ? { [K in Param]: string | number }
      : {};

type CreateRouteResponse<T extends string> = {
  path: T;
  with: (params: ExtractRouteParams<T>) => string;
  toString: () => T;
};

export const createRoute = <T extends string>(
  path: T,
): CreateRouteResponse<T> => ({
  path,
  with(params) {
    // Явно типизируем params как ExtractRouteParams<T>
    const typedParams = params as ExtractRouteParams<T> &
      Record<string, string | number>;

    // Заменяем path-параметры (например :id)
    let result = this.path.replace(/:(\w+)/g, (_, key) => {
      if (typedParams[key] === undefined) {
        throw new Error(`Missing parameter: ${key}`);
      }
      return encodeURIComponent(typedParams[key].toString());
    });

    // Добавляем query-параметры
    const queryParams: Record<string, string> = {};
    Object.entries(typedParams).forEach(([key, value]) => {
      if (!this.path.includes(`:${key}`) && value !== undefined) {
        queryParams[key] = value.toString();
      }
    });

    const queryString = new URLSearchParams(queryParams).toString();
    if (queryString) {
      result += `?${queryString}`;
    }

    return result;
  },
  toString() {
    return this.path;
  },
});
