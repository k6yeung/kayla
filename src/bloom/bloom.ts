import * as murmur3 from "murmurhash3js";

export interface IFilter<T> {
    approximateElementCount: () => number;
    mightContain: (object: T) => boolean;
    put: (object: T) => boolean;
}

export class BloomFilter<T> implements IFilter<T> {
    /**
     * Determine the optimal number of hash functions in this bloom filter
     * given m (the length of the bit array) and n (the expcted insertion)
     */
    public static optimalNumOfHashFunctions(m: number, n: number): number {
        return Math.round((m / n) * Math.log(2));
    }

    /**
     * Determine the optimal number of bits for the bit array
     * given n (the expected insertion) and p (the false positive rate)
     */
    public static optimalNumOfBits(n: number, p: number): number {
        return Math.round((-n * Math.log(p)) / ((Math.log(2)) ** 2));
    }

    /** The number of bits in the bit array which are true */
    private numTrueBits: number;

    /** The length of the bit array */
    private readonly numBits: number;

    /** The number of hash functions used in this bloom filter */
    private readonly numHashFunctions: number;

    /** The expected number of insertions in this bloom filter */
    private readonly expectedInsertions: number;

    /** The false position rate (0 < p < 1) */
    private readonly falsePositiveRate: number;

    /** The bit array for the filter */
    private readonly bitArray: boolean[];

    /**
     * Construct a bloom filter. The false positive rate is set to 3% by default.
     * @param expectedInsertions The expected number of insertions in this filter
     * @param falsePositiveRate The number of hash functions used in this bloom filter
     */
    constructor(expectedInsertions: number, falsePositiveRate: number = 0.03) {
        if (expectedInsertions < 1) {
            throw new Error("Expected insertions cannot be zero or negative.");
        }

        if (falsePositiveRate < 0 || falsePositiveRate > 1) {
            throw new Error("The false positive rate has to be between 0 to 1.");
        }

        this.numTrueBits = 0;
        this.expectedInsertions = expectedInsertions;
        this.numBits = BloomFilter.optimalNumOfBits(expectedInsertions, falsePositiveRate);
        this.numHashFunctions = BloomFilter.optimalNumOfHashFunctions(this.numBits, this.expectedInsertions);
        this.bitArray = Array(this.numBits);
        this.falsePositiveRate = falsePositiveRate;
    }

    /**
     * Returns true if the element might have been put in this Bloom filter,
     * false if this is definitely not the case.
     */
    public mightContain(object: T): boolean {
        const hashes = this.doubleHashing(object);

        for (let i = 0; i < this.numHashFunctions; i++) {
            const index = (hashes[0] + i * hashes[1]) % this.numBits;

            if (!this.bitArray[index]) {
                return false;
            }
        }

        return true;
    }

    /**
     * Puts an element into this BloomFilter.
     */
    public put(object: T): boolean {
        const hashes = this.doubleHashing(object);

        for (let i = 0; i < this.numHashFunctions; i++) {
            const index = (hashes[0] + i * hashes[1]) % this.numBits;

            if (!this.bitArray[index]) {
                this.numTrueBits++;
                this.bitArray[index] = true;
            }
        }

        return true;
    }

    /**
     * Returns an estimate for the total number of distinct elements
     * that have been added to this Bloom filter.
     */
    public approximateElementCount(): number {
        return Math.round(-(this.numBits / this.numHashFunctions) * Math.log(1 - (this.numTrueBits / this.numBits)));
    }

    /**
     * Perform double hashing on a given object
     */
    private doubleHashing(object: T): number[] {
        let stringifiedObject: string;

        if (typeof object === "string") {
            stringifiedObject = object;
        } else if (typeof object === "number") {
            stringifiedObject = object.toString();
        } else {
            stringifiedObject = JSON.stringify(object);
        }

        const hash = murmur3.x86.hash128(stringifiedObject);

        // Double hashing
        return [hash.substring(0, 16), hash.substring(16)].map((i) => {
            return parseInt(i, 16);
        });
    }
}
