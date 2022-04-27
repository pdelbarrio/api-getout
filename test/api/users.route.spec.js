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

  describe("Get user by id /api/users/:id", () => {
    let user;
    beforeEach(async () => {
      user = await User.create({
        username: "testuser2",
        email: "test2@mail.com",
        password: "1234",
      });
    });

    afterEach(async () => {
      await User.findByIdAndDelete(user._id);
    });

    it("Get users by id route works", async () => {
      const response = await request(app).get(`/api/users/${user._id}`).send();

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("The request returns the requested user", async () => {
      const response = await request(app).get(`/api/users/${user._id}`).send();

      expect(response.body._id).toBeDefined();
      expect(response.body.username).toBe("testuser2");
    });
  });

  describe("Route POST create users /api/users", () => {
    let newUser;
    let wrongUser;
    beforeEach(async () => {
      newUser = {
        username: "testuser",
        email: "testmail@mail.com",
        password: 1234,
      };
      wrongUser = { badname: "badtest" };
    });

    afterAll(async () => {
      await User.deleteMany({ username: "testuser" });
    });

    it("Route works fine", async () => {
      const response = await request(app).post("/api/users").send(newUser);

      expect(response.status).toBe(201);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("User created successfully", async () => {
      const response = await request(app).post("/api/users").send(newUser);

      expect(response.body._id).toBeDefined();
      expect(response.body.name).toBe(newUser.name);
    });

    it("Error creating user", async () => {
      const response = await request(app).post("/api/users").send(wrongUser);

      expect(response.status).toBe(500);
      expect(response.body.error).toBeDefined();
    });
  });
});
