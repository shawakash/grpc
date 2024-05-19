import path from "path";
import * as grpc from "@grpc/grpc-js";
import { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./types/message";
import { AddressBookServiceHandlers } from "./types/AddressBookService";
import { GetPersonByNameResponse } from "./types/GetPersonByNameResponse";
import { ResponseStatus } from "./types/ResponseStatus";

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "./message.proto"),
);

const personProto = grpc.loadPackageDefinition(
  packageDefinition,
) as unknown as ProtoGrpcType;

const PERSONS = [
  {
    name: "harkirat",
    age: 45,
  },
  {
    name: "raman",
    age: 45,
  },
];

const handler: AddressBookServiceHandlers = {
  AddPerson: (call, callback) => {
    const person = call.request;
    PERSONS.push(person);
    callback(null, person);
  },

  GetPersonByName: (call, callback) => {
    const name = call.request.name;
    const person = PERSONS.find((person) => person.name === name);
    if (!person) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found",
      });
    }
    let response: GetPersonByNameResponse = {
      person,
      status: ResponseStatus.Ok,
    };
    callback(null, response);
  },
};

const server = new grpc.Server();

server.addService(personProto.AddressBookService.service, handler);
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    console.log(`Access the service at grpc://localhost:${port}`);
  },
);
