import * as chai from "chai";
import { BloomFilter } from "../../src/bloom/bloom";

interface IMockPerson {
    name: string;
    age: number;
    isHandsome: boolean;
}

describe("Bloom Filter Test", () => {
    it("Test put() and mightContain() with number", () => {
        const mockBloomFilter = new BloomFilter<number>(3);

        mockBloomFilter.put(0);
        mockBloomFilter.put(1);
        mockBloomFilter.put(2);

        chai.assert.isTrue(mockBloomFilter.mightContain(0), "Bloom Filter should contain 0.");
        chai.assert.isTrue(mockBloomFilter.mightContain(1), "Bloom Filter should contain 1.");
        chai.assert.isTrue(mockBloomFilter.mightContain(2), "Bloom Filter should contain 2.");
    });

    it("Test put() and mightContain() with string", () => {
        const mockBloomFilter = new BloomFilter<string>(3);

        mockBloomFilter.put("Free Smoke");
        mockBloomFilter.put("No Long Talk");
        mockBloomFilter.put("Passionate Fruit");

        chai.assert.isTrue(mockBloomFilter.mightContain("Free Smoke"), "Bloom Filter should contain 'Free Smoke'.");
        chai.assert.isTrue(mockBloomFilter.mightContain("No Long Talk"), "Bloom Filter should contain 'No Long Talk'.");
        chai.assert.isTrue(mockBloomFilter.mightContain("Passionate Fruit"), "Bloom Filter should contain 'Passionate Fruit'.");
    });

    it("Test put() and mightContain() with a defined typed", () => {
        const mockBloomFilter = new BloomFilter<IMockPerson>(3);
        const person1 = {
            age: 21,
            isHandsome: true,
            name: "Ernest Wong",
        };
        const person2 = {
            age: 29,
            isHandsome: true,
            name: "Aubrey Drake Graham",
        };
        const person3 = {
            age: 71,
            isHandsome: false,
            name: "Donald John Trump",
        };

        mockBloomFilter.put(person1);
        mockBloomFilter.put(person2);
        mockBloomFilter.put(person3);

        chai.assert.isTrue(mockBloomFilter.mightContain(person1), "Bloom Filter should contain person1.");
        chai.assert.isTrue(mockBloomFilter.mightContain(person2), "Bloom Filter should contain person2.");
        chai.assert.isTrue(mockBloomFilter.mightContain(person3), "Bloom Filter should contain person3.");
    });

    it("Test put(), mightContain(), and approximateElementCount() by adding 1 - 100 into a bloom filter", () => {
        const mockBloomFilter = new BloomFilter<number>(1000, 1e-6);

        for (let i = 1; i <= 100; i++) {
            mockBloomFilter.put(i);
        }

        for (let i = 1; i <= 100; i++) {
            chai.assert.isTrue(mockBloomFilter.mightContain(i), `Bloom Filter should contain ${i}.`);
        }

        chai.assert.strictEqual(mockBloomFilter.approximateElementCount(), 100, "The approximate element count should be 100");
    });

    it("Test false positive", () => {
        const mockBloomFilter = new BloomFilter<number>(1, 1);

        mockBloomFilter.put(1);

        chai.assert.isTrue(mockBloomFilter.mightContain(1), "Bloom Filter should contain 1");
        chai.assert.isTrue(mockBloomFilter.mightContain(2), "Bloom Filter should not contain 2, but it is a false positive.");
    });
});
