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

// Load Proto File
const pkgDefs = protoLoader.loadSync(PROTO_FILE, options);
// Load Definition into gRPC
const DogService = grpc.loadPackageDefinition(pkgDefs).DogService;

// Create the Client
const client = new DogService(
  "localhost:3500",
  grpc.credentials.createInsecure()
);

client.GetDog({}, (error, dog) => {
  if (error) {
    console.log("error", error);
  } else {
    console.log("dog", dog);
  }
});
