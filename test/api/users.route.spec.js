const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../index");
const config = require("../../config");

const User = require("../../models/user.model");

describe("Testing users API", () => {
  beforeAll(async () => {
    await mongoose.connect(
      `mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET /api/users", () => {
    let response;
    beforeEach(async () => {
      response = await request(app).get("/api/users").send();
    });

    it("Users GET route works", () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });
  });
});
