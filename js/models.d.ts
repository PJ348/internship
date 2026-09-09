export declare abstract class User {
    protected id: string;
    constructor(id: string);
    abstract getRoleName(): string;
    abstract canWriteReview(): boolean;
}
export declare class Guest extends User {
    constructor(id: string);
    getRoleName(): string;
    canWriteReview(): boolean;
}
export declare class Reviewer extends User {
    private email;
    constructor(id: string, email: string);
    getRoleName(): string;
    canWriteReview(): boolean;
}
export declare class Company {
    private id;
    private name;
    private address;
    private roles;
    private internCount;
    private imageUrl;
    private rating;
    constructor(id: string, name: string, address: string, roles: string[], internCount: number, imageUrl: string);
    getCompanyInfo(): {
        id: string;
        name: string;
        address: string;
        roles: string[];
        internCount: number;
        imageUrl: string;
        rating: number;
    };
}
export declare class CompanyManager {
    private companies;
    loadMockData(mockData: any[]): void;
    getAllCompanies(): Company[];
}
//# sourceMappingURL=models.d.ts.map