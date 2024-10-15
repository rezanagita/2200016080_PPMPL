const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("API Testing", () => {
  it("should return all items", (done) => {
    request(app)
      .get("/api/items")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.at.least(1);
        done();
      });
  });

  it("should create a new item", (done) => {
    const newItem = { name: "Item 3" };
    request(app)
      .post("/api/items")
      .send(newItem)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("name", "Item 3");
        done();
      });
  });

  it("should update item by id", (done) => {
    request(app)
      .put("/api/items/1")
      .send({ name: "Updated Item" })
      .expect(200) 
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("should delete item by id", (done) => {
    request(app)
      .delete("/api/items/2") 
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
