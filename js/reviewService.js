// import { StudentProfile, Review } from './models.js';
export {};
// // ฟังก์ชัน: ดึงข้อมูลนิสิตปัจจุบันจาก LocalStorage
// export const getCurrentUser = (): StudentProfile | null => {
//   const data = localStorage.getItem('userData');
//   return data ? JSON.parse(data) : null;
// };
// // ฟังก์ชัน: เพิ่มรีวิวใหม่
// export const addReview = (companyId: string, companyName: string, rating: number, content: string) => {
//   const user = getCurrentUser();
//   if (!user) return; // ถ้ายังไม่ล็อกอินให้หยุดทำงาน
//   const newReview: Review = {
//     id: `rev-${Date.now()}`, // สร้าง ID แบบสุ่มจากเวลา
//     companyId,
//     companyName,
//     rating,
//     content,
//     date: new Date().toISOString().split('T')[0] // ได้วันที่ปัจจุบัน YYYY-MM-DD
//   };
//   user.reviews.push(newReview); // ดันข้อมูลใหม่เข้า Array
//   localStorage.setItem('userData', JSON.stringify(user)); // เซฟทับข้อมูลเดิม
// };
// // ฟังก์ชัน: ลบรีวิว
// export const deleteReview = (reviewId: string) => {
//   const user = getCurrentUser();
//   if (!user) return;
//   // กรองเอารีวิวที่ ID ไม่ตรงกับที่กดลบ เก็บไว้ (เป็นการลบตัวที่ตรงกันทิ้ง)
//   user.reviews = user.reviews.filter(review => review.id !== reviewId);
//   localStorage.setItem('userData', JSON.stringify(user)); // เซฟทับข้อมูลเดิม
// };
//# sourceMappingURL=reviewService.js.map