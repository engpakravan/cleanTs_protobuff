import grpc from "grpc";
import { allHouse } from "../models/house";
import { IHouseServiceServer, HouseServiceService } from "../proto/house_grpc_pb";
import {
  HousesBySizeResponse,
  HousesBySizeRequest,
  House,
  HouseRequest,
  HouseResponse,
  HousesRequest,
  HousesResponse,
} from "../proto/house_pb";

export default class HouseService implements IHouseServiceServer {
  
  public getHousesBySize(
    call: grpc.ServerUnaryCall<HousesBySizeRequest>,
    callback: grpc.sendUnaryData<HousesBySizeResponse>
  ): void {
    const request = call.request;
    const min = request.getMinsquarefeet();
    const ids = allHouse.filter((d) => d.squarefeet >= min).map((f) => f.id);
    const response = new HousesBySizeResponse();
    response.setIdsList(ids);
    callback(null, response);
  }

  public getHouse(
    call: grpc.ServerUnaryCall<HouseRequest>,
    callback: grpc.sendUnaryData<HouseResponse>
  ): void {
    const request = call.request;
    const house = allHouse.filter((d) => d.id === request.getId()).shift();
    const response = new HouseResponse();
    const houseGrpc: House = new House();
    if (house !== undefined) {
      houseGrpc.setId(house.id);
      houseGrpc.setStreetname(house.streetname);
      houseGrpc.setHousenumber(house.housenumber);
    }
    response.setHouse(houseGrpc);
    callback(null, response);
  }

  public getHouses(
    call: grpc.ServerUnaryCall<HousesRequest>,
    callback: grpc.sendUnaryData<HousesResponse>
  ): void {
    const request = call.request;
    const houses = request.getIdList();
    const response = new HousesResponse();
    const housesObj: House[] = houses
      .map((d) => allHouse.find((ff) => ff.id === d))
      .map((h) => {
        const c = new House();
        if (h !== undefined) {
          c.setId(h.id);
          c.setStreetname(h.streetname);
          c.setHousenumber(h.housenumber);
        }
        return c;
      });
    response.setHousesList(housesObj);
    callback(null, response);
  }
}
