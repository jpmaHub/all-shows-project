import app from "./server";
import { strict as assert } from "assert";
import sinon from "sinon";
import fs from "fs/promises";
import request from "supertest";

describe("GET /shows/all-shows", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should return shows data when file read successfully", async () => {
    const mockData = [
      { id: 1, name: "Show 1" },
      { id: 2, name: "Show 2" },
    ];
    sinon.stub(fs, "readFile").resolves(JSON.stringify(mockData));

    const response = await request(app).get("/shows/all-shows");

    assert.strictEqual(response.status, 200);
    assert.deepStrictEqual(response.body, mockData);
  });

  it("should handle file read error", async () => {
    const errorMessage = "File read error";
    sinon.stub(fs, "readFile").rejects(new Error(errorMessage));

    const response = await request(app).get("/shows/all-shows");

    assert.strictEqual(response.status, 500);
    assert.strictEqual(response.body.error, "Internal Server Error");
  });
});