const request = require("supertest");
const app = require("../app")(DATABASE_URL);

describe("reports endpoint", () => {
  test("returns the list of current reports", async () => {
    const response = await request(app).get("/api/reports");
    expect(response.statusCode).toBe(200);
  });
});
