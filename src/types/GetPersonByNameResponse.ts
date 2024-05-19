// Original file: src/message.proto

import type { Person as _Person, Person__Output as _Person__Output } from './Person';
import type { ResponseStatus as _ResponseStatus, ResponseStatus__Output as _ResponseStatus__Output } from './ResponseStatus';

export interface GetPersonByNameResponse {
  'person'?: (_Person | null);
  'status'?: (_ResponseStatus);
}

export interface GetPersonByNameResponse__Output {
  'person': (_Person__Output | null);
  'status': (_ResponseStatus__Output);
}
