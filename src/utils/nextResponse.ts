import { NextResponse } from 'next/server';
import { httpStatusCodes } from './httpStatusCodes';

export const ok = (data: any, name: string) =>
  NextResponse.json({ [name]: data }, { status: httpStatusCodes.OK });

export const created = (data: any, name: string) =>
  NextResponse.json({ [name]: data }, { status: httpStatusCodes.CREATED });

export const noContent = () => NextResponse.json(null, { status: httpStatusCodes.NO_CONTENT });

export const badRequest = (error: string) =>
  NextResponse.json({ error }, { status: httpStatusCodes.BAD_REQUEST });

export const notFound = (objectName: string) => {
  const error = `${objectName} não encontrado(a)`;
  return NextResponse.json({ error }, { status: httpStatusCodes.NOT_FOUND });
};
