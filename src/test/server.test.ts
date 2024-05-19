import { describe, expect, test, it } from "@jest/globals";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { ProtoGrpcType } from "../types/message";

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "../message.proto"),
);

const personProto = grpc.loadPackageDefinition(
  packageDefinition,
) as unknown as ProtoGrpcType;

const client = new personProto.AddressBookService(
  "localhost:50051",
  grpc.credentials.createInsecure(),
);

describe("gRPC Server Get Person by name Test", () => {
  it("Should add person via gRPC AddPerson Service", (done) => {
    client.AddPerson({ name: "Check Name", age: 45 }, (err, response) => {
      expect(err).toBeNull();
      expect(response?.name).toBe("Check Name");
      done();
    });
  });

  it("Should respond correctly to the gRPC GetPersonByName call", (done) => {
    client.GetPersonByName({ name: "Check Name" }, (err, response) => {
      expect(err).toBeNull();
      expect(response?.person?.name).toBe("Check Name");
      done();
    });
  });
});
