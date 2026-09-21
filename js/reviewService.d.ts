import type { User, Review } from './models.js';
import { CompanyManager } from './models.js';
export declare const getCurrentUser: () => User;
export declare const createCompanyManager: () => CompanyManager;
export declare const getAllReviews: () => Review[];
export declare const saveAllReviews: (reviews: Review[]) => void;
export declare const getCompanyStats: (companyId: string) => {
    avg: number;
    count: number;
};
export declare const fillCompanySidebar: (companyId: string) => void;
//# sourceMappingURL=reviewService.d.ts.map