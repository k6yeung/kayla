import * as chai from "chai";
import { BloomFilter } from "../../src/bloom/bloom";

describe("Test 1", () => {
    it("Test 2", () => {
        const mockBloomFilter = new BloomFilter<number>(10);

        mockBloomFilter.put(0);
        mockBloomFilter.put(1);
        mockBloomFilter.put(2);

        chai.assert.isTrue(mockBloomFilter.mightContain(0), "It should return true.");
        chai.assert.isTrue(mockBloomFilter.mightContain(1), "It should return true.");
        chai.assert.isTrue(mockBloomFilter.mightContain(2), "It should return true.");
        chai.assert.isFalse(mockBloomFilter.mightContain(3), "It should return false.");
    });
});
