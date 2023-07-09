export const yupSchemaTexts = {
  required: 'Campo obrigatório',
  number: 'Campo deve ser um número',
  string: 'Campo deve ser uma string',
  min: (min: number) => `Campo deve ter no mínimo ${min} caracteres`,
  max: (max: number) => `Campo deve ter no máximo ${max} caracteres`,
};
