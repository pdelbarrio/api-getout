const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");

describe("Testing spots API", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1/spots");
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET /api/spots", () => {
    let response;
    beforeEach(async () => {
      response = await request(app).get("/api/spots").send();
    });

    it("The route works", async () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("The request returns an array of spots", async () => {
      expect(response.body).toBeInstanceOf(Array);
    });
  });
});
