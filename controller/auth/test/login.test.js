import request from "supertest";
import app from "../../../app.js";

// setiap kali buat controler kena buat test macam ni
describe("Try Login with empty fields", () => {
  //nama test line ni is test root path
  test("It should response with status code 403 and return message = Invalid Request", () => {
    return request(app) //the request function is from "supertest"
      .post("/api/login") //test get route dia
      .send({
        identifier: "",
        password: "",
      })
      .then((response) => {
        //the expectation is apa
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid Request");
      });
  });
});

describe("Try Login using admin", () => {
  //nama test line ni is test root path
  test("It should response status code 200 and return message and user data", () => {
    return request(app) //the request function is from "supertest"
      .post("/api/login") //test get route dia
      .send({
        identifier: "admin",
        password: "password",
      })
      .then((response) => {
        //the expectation is apa
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Login Successfull");
      });
  });
});
