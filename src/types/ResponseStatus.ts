// Original file: src/message.proto

export const ResponseStatus = {
  Ok: 'Ok',
  Error: 'Error',
  Auth: 'Auth',
} as const;

export type ResponseStatus =
  | 'Ok'
  | 0
  | 'Error'
  | 1
  | 'Auth'
  | 2

export type ResponseStatus__Output = typeof ResponseStatus[keyof typeof ResponseStatus]
