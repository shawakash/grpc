import protobuf from "protobufjs";
import fs from "fs";
import path from "path";
import * as grpc from "@grpc/grpc-js";
import { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "./message.proto"),
);

const personProto = grpc.loadPackageDefinition(packageDefinition);

protobuf
  .load("message.proto")
  .then((root) => {
    const Person = root.lookupType("Person");

    let person = {
      name: "John Doe",
      age: 2,
    };

    let buffer = Person.encode(person).finish();
    fs.writeFileSync("person.bin", buffer);

    console.log("Person serialized and saved to person.bin");

    const data = fs.readFileSync("person.bin");

    const deserializedPerson = Person.decode(data);

    console.log("Person deserialized from person.bin:", deserializedPerson);
  })
  .catch(console.error);
