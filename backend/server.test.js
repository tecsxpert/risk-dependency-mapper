const request = require("supertest");
const express = require("express");
const app = require("./server"); // make sure you export app

describe("API Tests", () => {

  test("GET /tasks should return 200", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toBe(200);
  });

  test("POST /tasks should create task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({
        title: "Test Task",
        status: "OPEN",
        date: "2026-04-28"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Task");
  });

  test("PUT /tasks/:id should update task", async () => {
    const res = await request(app)
      .put("/tasks/1")
      .send({ status: "CLOSED" });

    expect(res.statusCode).toBe(200);
  });

  test("DELETE /tasks/:id should delete task", async () => {
    const res = await request(app).delete("/tasks/1");
    expect(res.statusCode).toBe(200);
  });

});