// 1. Abstraction[cite: 1]
export class User {
    id; // Encapsulation
    constructor(id) { this.id = id; }
}
// 2. Inheritance & Polymorphism[cite: 1]
export class Guest extends User {
    constructor(id) { super(id); }
    getRoleName() { return "Guest"; }
    canWriteReview() { return false; }
}
export class Reviewer extends User {
    email;
    constructor(id, email) {
        super(id);
        if (!email.endsWith("@up.ac.th"))
            throw new Error("Invalid Email");
        this.email = email;
    }
    getRoleName() { return "Reviewer"; }
    canWriteReview() { return true; }
}
// 3. Encapsulation (ซ่อนแอตทริบิวต์บริษัท)[cite: 1]
export class Company {
    id;
    name;
    address;
    roles;
    internCount;
    imageUrl;
    rating = (Math.random() * 1 + 4);
    constructor(id, name, address, roles, internCount, imageUrl) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.roles = roles;
        this.internCount = internCount;
        this.imageUrl = imageUrl;
    }
    getCompanyInfo() {
        return {
            id: this.id, name: this.name, address: this.address,
            roles: this.roles, internCount: this.internCount,
            imageUrl: this.imageUrl, rating: this.rating
        };
    }
}
export class CompanyManager {
    companies = [];
    loadMockData(mockData) {
        for (const data of mockData) {
            this.companies.push(new Company(data.id, data.name, data.address, data.roles, data.count, data.imageUrl));
        }
    }
    getAllCompanies() { return this.companies; }
}
//# sourceMappingURL=models.js.map