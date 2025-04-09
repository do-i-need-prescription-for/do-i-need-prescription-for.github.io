export class Source {
    constructor(
        public readonly url: string,
        public readonly countries: string[],
        public readonly allowedDrugs: string[],
        public readonly prescriptionDrugs: string[],
        public readonly bannedDrugs: string[],
        public readonly updatedAt: Date
    ) {
    }
}
