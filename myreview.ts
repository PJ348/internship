import type { Review } from './models.js';
import { getCurrentUser, fillCompanySidebar } from './reviewService.js';


document.addEventListener('DOMContentLoaded', () => {
    // ดึง ID จาก URL (?id=...)
    const urlParams = new URLSearchParams(window.location.search);
    const reviewId = urlParams.get('id');

    // ดึง Element จาก DOM
    const editForm = document.getElementById('edit-review-form') as HTMLFormElement | null;
    const positionInput = document.getElementById('input-position') as HTMLInputElement | null;
    const reviewInput = document.getElementById('input-review') as HTMLTextAreaElement | null;
    const starContainer = document.getElementById('star-container') as HTMLElement | null;
    const ratingDisplay = document.getElementById('rating-display') as HTMLElement | null;

    if (!editForm || !positionInput || !reviewInput || !starContainer || !ratingDisplay) return;

    const stars = starContainer.querySelectorAll<HTMLElement>('.star-btn');

    // ดึงรายการรีวิวทั้งหมดจาก localStorage
    const rawReviews = localStorage.getItem('user_reviews');
    let reviews: Review[] = rawReviews ? JSON.parse(rawReviews) : [];

    // ค้นหารีวิวที่ต้องการแก้ไข
    const targetIndex = reviews.findIndex((r) => String(r.id) === String(reviewId));
    const currentReview = targetIndex !== -1 ? reviews[targetIndex] : null;

    const user = getCurrentUser();
    if (!currentReview || !user.canEditReview(currentReview.userId ?? '')) {
        window.location.href = './profile.html';
        return;
    }
    fillCompanySidebar(String(currentReview.companyId));
    const dateEl = document.getElementById('review-date');
    if (dateEl) dateEl.textContent = currentReview.date;

    let currentRating = 5;

    // ฟังก์ชันอัปเดตสีดาวและตัวเลขคะแนน
    const renderStars = (rating: number) => {
        ratingDisplay.textContent = rating.toString();
        stars.forEach((star) => {
            const val = parseInt(star.getAttribute('data-value') || '0', 10);
            if (val <= rating) {
                star.classList.remove('text-gray-300');
                star.classList.add('text-[#10B981]');
            } else {
                star.classList.remove('text-[#10B981]');
                star.classList.add('text-gray-300');
            }
        });
    };

    // แสดงข้อมูลเดิมลงใน Form
    if (currentReview) {
        positionInput.value = currentReview.position || '';
        reviewInput.value = currentReview.detail || '';
        currentRating = currentReview.rating || 5;
    }

    renderStars(currentRating);

    // ระบบดาว Interactive (Hover & Click)
    stars.forEach((star) => {
        const val = parseInt(star.getAttribute('data-value') || '0', 10);

        star.addEventListener('mouseenter', () => renderStars(val));
        star.addEventListener('click', () => {
            currentRating = val;
            renderStars(currentRating);
        });
    });

    starContainer.addEventListener('mouseleave', () => renderStars(currentRating));

    // บันทึกการแก้ไข
    editForm.addEventListener('submit', (e: Event) => {
        e.preventDefault();

        if (currentRating === 0) {
            alert('กรุณาเลือกคะแนนดาวอย่างน้อย 1 ดาวก่อนบันทึกครับ');
            return;
        }

        if (targetIndex !== -1 && reviews[targetIndex]) {
            const existingReview = reviews[targetIndex];

            // สร้าง Object ใหม่ที่ตรงตามโครงสร้าง Review interface
            const updatedReview: Review = {
                ...existingReview,
                position: positionInput.value.trim(),
                rating: currentRating,
                detail: reviewInput.value.trim()
            };

            reviews[targetIndex] = updatedReview;
            localStorage.setItem('user_reviews', JSON.stringify(reviews));
        }

        window.location.href = './profile.html';
    });
});