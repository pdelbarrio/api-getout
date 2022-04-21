const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");

const Spot = require("../../models/spot.model");

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

  describe("POST /api/spots", () => {
    const newSpot = {
      name: "test spot",
      description: "Barcelona is full of spots",
      website: "none",
      category: "views",
    };

    const wrongSpot = {
      nombre: "test spot",
    };

    afterAll(async () => {
      await Spot.deleteMany({ name: "test spot" });
    });

    it("The route works", async () => {
      const response = await request(app).post("/api/spots").send(newSpot);

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("The data is properly inserted", async () => {
      const response = await request(app).post("/api/spots").send(newSpot);

      expect(response.body._id).toBeDefined();
      expect(response.body.name).toBe(newSpot.name);
    });

    it("Error in data insertion ", async () => {
      const response = await request(app).post("/api/spots").send(wrongSpot);

      expect(response.status).toBe(500);
      expect(response.body.error).toBeDefined();
    });
  });

  describe("PUT /api/spots", () => {
    let spot;
    beforeEach(async () => {
      spot = await Spot.create({
        name: "test spot",
        description: "A beautiful spot",
        category: "views",
      });
    });

    afterEach(async () => {
      await Spot.findByIdAndDelete(spot._id);
    });

    it("The route works", async () => {
      const response = await request(app).put(`/api/spots/${spot._id}`).send({
        name: "spot updated",
      });

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("Is successfully updated", async () => {
      const response = await request(app).put(`/api/spots/${spot._id}`).send({
        name: "spot updated",
      });

      expect(response.body.name).toBe("spot updated");
      expect(response.body._id).toBeDefined();
    });
  });
});
