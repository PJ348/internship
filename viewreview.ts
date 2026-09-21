import type { Review } from './models.js';
import { fillCompanySidebar } from './reviewService.js';


document.addEventListener('DOMContentLoaded', () => {
    // ดึง ID จาก URL (?id=...)
    const urlParams = new URLSearchParams(window.location.search);
    const reviewId = urlParams.get('id');

    // ดึง Element จาก DOM
    const positionInput = document.getElementById('view-position') as HTMLInputElement | null;
    const reviewTextarea = document.getElementById('view-review') as HTMLTextAreaElement | null;
    const ratingDisplay = document.getElementById('rating-display') as HTMLElement | null;
    const starIcons = document.querySelectorAll<HTMLElement>('.star-icon');

    // ดึงรายการรีวิวทั้งหมดจาก localStorage
    const rawReviews = localStorage.getItem('user_reviews');
    const reviews: Review[] = rawReviews ? JSON.parse(rawReviews) : [];

    // ค้นหารีวิวตาม ID
    const data = reviews.find((r) => String(r.id) === String(reviewId));

    // นำข้อมูลมาแสดงผล
    if (data) {
        fillCompanySidebar(String(data.companyId));
        const dateEl = document.getElementById('view-date');
        if (dateEl) dateEl.textContent = data.date;

        if (positionInput) positionInput.value = data.position || '';
        if (reviewTextarea) reviewTextarea.value = data.detail || data.content || '';

        const rating = typeof data.rating === 'number'
            ? data.rating
            : parseInt(String(data.rating || '5'), 10);

        if (ratingDisplay) ratingDisplay.textContent = rating.toString();

        // ระบายสีดาวตามคะแนน
        starIcons.forEach((star, index) => {
            if (index < rating) {
                star.classList.remove('text-gray-300');
                star.classList.add('text-[#10B981]');
            } else {
                star.classList.remove('text-[#10B981]');
                star.classList.add('text-gray-300');
            }
        });
    }
});