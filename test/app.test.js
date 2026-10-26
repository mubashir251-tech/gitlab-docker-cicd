const test = require("node:test");
const assert = require("node:assert/strict");

const baseUrl = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";

test("GET / returns HTTP 200 and valid JSON", async () => {
  const response = await fetch(`${baseUrl}/`);

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /application\/json/);

  const body = await response.json();
  assert.equal(body.message, "GitLab CI/CD Docker Demo");
  assert.equal(body.status, "success");
});

test("GET /health returns HTTP 200 and healthy status", async () => {
  const response = await fetch(`${baseUrl}/health`);

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /application\/json/);

  const body = await response.json();
  assert.equal(body.status, "healthy");
});
