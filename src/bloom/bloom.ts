interface Filter<T> {
    approximateElementCount: () => number;
    mightContain: (object: T) => boolean;
    put: (object: T) => boolean;
}

export class BloomFilter<T> implements Filter<T> {
    /** The expected number of insertions in this filter */
    private readonly expectedInsertions: number;

    /** The false position rate */
    private readonly fpp: number;

    /** The bit array for the filter */
    private bitArray: Array<boolean>;

    constructor(expectedInsertions: number, fpp: number = 0.03) {
        if (expectedInsertions < 1)
            throw new Error("");
        
        if (fpp < 0 || fpp > 1)
            throw new Error("");

        this.bitArray = new Array<boolean>(expectedInsertions);
        this.fpp = fpp;
    }

    /**
     * Returns true if the element might have been put in this Bloom filter,
     * false if this is definitely not the case.
     */
    public mightContain(object: T): boolean {
        return false;
    }

    /**
     * Puts an element into this BloomFilter.
     */
    public put(object: T): boolean {
        return false
    }

    /**
     * Returns an estimate for the total number of distinct elements that have
     * been added to this Bloom filter.
     */
    public approximateElementCount(): number {
        return 0;
    }

    /**
     * 
     */
    private static optimalNumOfHashFunctions(): number {
        return 0;
    }

    /**
     * 
     */
    private static optimalNumOfBits(): number {
        return 0;
    }

    public debug(): void {
        console.log(this.bitArray[0]);
    }
}

const bloom = new BloomFilter<number>(100);
bloom.debug();
