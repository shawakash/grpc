import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { AddressBookServiceClient as _AddressBookServiceClient, AddressBookServiceDefinition as _AddressBookServiceDefinition } from './AddressBookService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  AddressBookService: SubtypeConstructor<typeof grpc.Client, _AddressBookServiceClient> & { service: _AddressBookServiceDefinition }
  GetPersonByNameRequest: MessageTypeDefinition
  GetPersonByNameResponse: MessageTypeDefinition
  Person: MessageTypeDefinition
  ResponseStatus: EnumTypeDefinition
}

