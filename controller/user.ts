import grpc from "grpc";
import { handleUnaryCall } from "grpc";
import { IUserServiceServer, IUserServiceService } from "../proto/user_grpc_pb";
import { User, UserRequest, UserResponse } from "../proto/user_pb";
import {users} from '../models/user'

export default class user implements IUserServiceServer{
  public getUsers(
    call : grpc.ServerUnaryCall<UserRequest>,
    callback : grpc.sendUnaryData<UserResponse>
  ) {
    const response = new UserResponse()
    const userGrpc : User = new User()
    userGrpc.setId(1)
    userGrpc.setName("Mahdi")
    userGrpc.setFamily("Pakravan")
    response.setUser(userGrpc)
    
    console.log(call.request.getId())
    callback(null , response)
  }
  
}