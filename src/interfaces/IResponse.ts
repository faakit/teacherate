export type IResponse<T, PropertyName extends string> = {
  error?: string;
} & { [P in PropertyName]: T };
