import * as chai from "chai";
import { BloomFilter } from "../../src/bloom/bloom";

describe("Test 1", () => {
    it("Test 2", () => {
        const mockBloomFilter = new BloomFilter<number>(10);

        chai.assert.strictEqual(typeof mockBloomFilter, "object");
    });
});
