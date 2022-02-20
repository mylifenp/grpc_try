const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_FILE = "./service_def.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const pkgDefs = protoLoader.loadSync(PROTO_FILE, options);

const dogProto = grpc.loadPackageDefinition(pkgDefs);
const server = new grpc.Server();

// implement DogService
server.addService(dogProto.DogService.service, {
  // implement GetDog
  GetDog: (input, callback) => {
    try {
      callback(null, { name: "Spot", age: 5 });
    } catch (err) {
      callback(err, null);
    }
  },
});

server.bindAsync(
  "127.0.0.1:3500",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log(`listening on port ${port}`);
    server.start();
  }
);
