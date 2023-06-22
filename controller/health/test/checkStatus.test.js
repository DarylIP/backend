import request from "supertest";
import app from "../../../app.js";

// setiap kali buat controler kena buat test macam ni
describe("Check root path", () => {
  //nama test line ni is test root path
  test("It should response the GET method and return status 'ok'", () => {
    return request(app) //the request function is from "supertest"
      .get("/") //test get route dia
      .then((response) => {
        //the expectation is apa
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toEqual("ok");
      });
  });
});
