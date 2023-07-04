import { NextResponse } from 'next/server';
import { ValidationError } from 'yup';
import { httpStatusCodes } from './httpStatusCodes';

export const apiErrorHandler = (error: any) => {
  console.log(error);
  if (error instanceof ValidationError) {
    return NextResponse.json({ error: error.errors.join(', ') }, { status: httpStatusCodes.BAD_REQUEST });
  } else {
    return NextResponse.json(
      { error: 'Erro interno do servidor 🥺' },
      { status: httpStatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
};
