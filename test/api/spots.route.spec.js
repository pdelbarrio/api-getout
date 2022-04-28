const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../index");
const config = require("../../config");

const Spot = require("../../models/spot.model");

describe("Testing spots API", () => {
  beforeAll(async () => {
    await mongoose.connect(
      `mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET ALL /api/spots", () => {
    let response;
    beforeEach(async () => {
      response = await request(app).get("/api/spots").send();
    });

    it("Spots GET route works", async () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("The request returns an array of spots", async () => {
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("GET by id /api/spots/:id", () => {
    let spot;
    beforeEach(async () => {
      spot = await Spot.create({
        name: "test get spot by id",
        description: "A beautiful spot",
        category: "views",
      });
    });

    afterEach(async () => {
      await Spot.findByIdAndDelete(spot._id);
    });

    it("The Spots GET by id route works", async () => {
      const response = await request(app).get(`/api/spots/${spot._id}`).send();

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("The request returns the requested spot", async () => {
      const response = await request(app).get(`/api/spots/${spot._id}`).send();

      expect(response.body.data._id).toBeDefined();
      expect(response.body.data.name).toBe("test get spot by id");
    });
  });

  describe("Route POST create spots /api/spots", () => {
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

    it("Spots POST route works", async () => {
      const response = await request(app).post("/api/spots").send(newSpot);

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("The SPOT data is properly inserted", async () => {
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

  describe("PUT /api/spots/:id", () => {
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

    it("Spots PUT route works", async () => {
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

  describe("DELETE /api/spots", () => {
    let spot;
    let response;
    beforeEach(async () => {
      spot = await Spot.create({
        name: "test spot",
        description: "A beautiful spot",
        category: "views",
      });
      response = await request(app).delete(`/api/spots/${spot._id}`).send();
    });

    it("Spots DELETE route works", () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("Deletes data successfully", async () => {
      expect(response.body._id).toBeDefined();

      const foundSpot = await Spot.findById(spot._id);
      expect(foundSpot).toBeNull();
    });
  });
});
