import grpc, { Server } from "grpc";

import HouseService from "./controller/house";
import UserService from './controller/user'

import { IHouseServiceServer, HouseServiceService } from "./proto/house_grpc_pb";
import { IUserServiceServer, UserServiceService } from "./proto/user_grpc_pb";

require('dotenv').config()

class server {
  private server : Server;
  private URL : string ;

  constructor(){
    this.URL = process.env.URL || "0.0.0.0:50051"
    this.server = new grpc.Server();
    this.configServer()
    this.configProtoBuf()

    this.server.start();
  }

  configServer(){
    this.server.bind(
      this.URL , grpc.ServerCredentials.createInsecure());
    
    console.log("Started On %s" , this.URL)
  }

  configProtoBuf(){
    this.server.addService<IHouseServiceServer>(HouseServiceService, new HouseService());
    this.server.addService<IUserServiceServer>(UserServiceService, new UserService());
  }
}

new server()