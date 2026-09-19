import { mockCurrentUser } from './mockData.js'; // นำเข้าข้อมูลจำลองของ User
document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. ระบบดักจับ (Page Guard)
    // ==========================================
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = './login.html';
        return;
    }
    // ==========================================
    // 2. แสดงข้อมูล Profile ฝั่งซ้าย จาก mockData
    // ==========================================
    const currentUser = mockCurrentUser;
    const profileImg = document.getElementById('profile-img');
    const profileName = document.getElementById('profile-name');
    const contactEmail = document.getElementById('contact-email');
    const contactLinkedin = document.getElementById('contact-linkedin');
    const contactFacebook = document.getElementById('contact-facebook');
    // หยอดข้อมูลลงใน HTML
    if (profileImg && currentUser.avatarUrl)
        profileImg.src = currentUser.avatarUrl;
    if (profileName)
        profileName.textContent = currentUser.name;
    if (contactEmail)
        contactEmail.textContent = currentUser.email_uni;
    if (contactLinkedin) {
        contactLinkedin.textContent = currentUser.linkedIn_Profile;
        contactLinkedin.href = `https://${currentUser.linkedIn_Profile}`;
    }
    if (contactFacebook) {
        contactFacebook.textContent = currentUser.facebook;
        contactFacebook.href = `https://${currentUser.facebook}`;
    }
    // ==========================================
    // 3. ฟังก์ชัน Render แสดงผลรีวิว (ฝั่งขวา)
    // ==========================================
    const profileReviewContainer = document.getElementById('profileReviewContainer');
    if (!profileReviewContainer)
        return;
    const renderProfileReviews = () => {
        const rawData = localStorage.getItem('user_reviews');
        let storedReviews = [];
        if (rawData) {
            try {
                const parsed = JSON.parse(rawData);
                storedReviews = Array.isArray(parsed) ? parsed : [parsed];
            }
            catch (e) {
                storedReviews = [];
            }
        }
        // กรณีไม่มีข้อมูลรีวิวในระบบ
        if (storedReviews.length === 0) {
            profileReviewContainer.innerHTML = `
                <div class="flex items-center justify-center h-40 bg-white rounded-2xl border border-gray-100 text-gray-400 font-thai text-base shadow-sm">
                    ยังไม่มีประวัติการเขียนรีวิว
                </div>
            `;
            return;
        }
        profileReviewContainer.innerHTML = '';
        // วนลูปสร้างการ์ดรีวิวทีละใบ
        storedReviews.forEach((review) => {
            let starsHTML = '';
            const ratingNum = Number(review.rating) || 5;
            for (let i = 1; i <= 5; i++) {
                if (i <= ratingNum) {
                    starsHTML += '<i class="fa-solid fa-star text-xs"></i>';
                }
                else {
                    starsHTML += '<i class="fa-solid fa-star text-xs text-gray-300"></i>';
                }
            }
            const reviewDetail = review.detail || review.content || 'ไม่มีรายละเอียดข้อความรีวิว';
            const reviewId = review.id || '1';
            const reviewDate = review.date || '31 / 08 / 2026';
            // ดึงชื่อผู้เขียนรีวิวมาจาก mockCurrentUser เป็นหลัก
            const authorName = currentUser.name || review.authorName || 'ไม่ระบุชื่อ';
            const positionName = review.position || 'Frontend Developer';
            const reviewCard = `
                <div data-id="${reviewId}" class="review-card bg-white rounded-3xl w-full p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center gap-3">
                            <div class="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 shrink-0">
                                <i class="fa-regular fa-user text-xs"></i>
                            </div>
                            <h4 class="font-medium tracking-wide text-base text-gray-900 font-thai">${authorName}</h4>
                        </div>
                        
                        <div class="flex items-center gap-3">
                            <span class="text-xs font-semibold text-gray-400">${reviewDate}</span>
                            <button class="btn-delete text-red-500 hover:text-red-600 transition-colors cursor-pointer p-1" title="ลบรีวิว">
                                <i class="fa-solid fa-trash text-sm"></i>
                            </button>
                            <a href="./myreview.html?id=${reviewId}" class="btn-edit text-gray-900 hover:text-emerald-600 transition-colors p-1" title="แก้ไขรีวิว">
                                <i class="fa-regular fa-pen-to-square text-base"></i>
                            </a>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-3 mb-2">
                        <span class="review-position border border-[#10B981] text-[#10B981] text-xs font-semibold px-3 py-1 rounded-full">
                            ${positionName}
                        </span>
                        <div class="review-stars bg-[#EEF2FF] px-3 py-1 rounded-full flex items-center gap-1.5">
                            <div class="flex gap-0.5 text-[#10B981]">
                                ${starsHTML}
                            </div>
                            <span class="review-rating text-xs font-bold text-gray-900 ml-1">${ratingNum}</span>
                        </div>
                    </div>
                    
                    <p class="review-content text-xs sm:text-sm text-gray-600 font-eng line-clamp-5 leading-relaxed font-medium">
                        ${reviewDetail}
                    </p>
                </div>
            `;
            profileReviewContainer.insertAdjacentHTML('beforeend', reviewCard);
        });
        // จัดการ Event ปุ่มต่างๆ หลังสร้างการ์ดเสร็จ
        attachCardEvents();
    };
    // ==========================================
    // 4. ฟังก์ชันจัดการ Event ของการ์ด (คลิก, ลบ)
    // ==========================================
    const attachCardEvents = () => {
        const cards = profileReviewContainer.querySelectorAll('.review-card');
        cards.forEach((card) => {
            card.addEventListener('click', (event) => {
                const target = event.target;
                // ป้องกันไม่ให้ไปหน้า viewreview ถ้ายิงโดนปุ่มลบ หรือปุ่มแก้ไข
                if (target.closest('.btn-delete') || target.closest('.btn-edit'))
                    return;
                const cardId = card.getAttribute('data-id');
                if (cardId)
                    window.location.href = `./viewreview.html?id=${cardId}`;
            });
            // กดปุ่มถังขยะเพื่อลบ
            const deleteBtn = card.querySelector('.btn-delete');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (event) => {
                    event.stopPropagation();
                    const cardId = card.getAttribute('data-id');
                    if (confirm('คุณต้องการลบรีวิวนี้ใช่หรือไม่?'))
                        deleteReview(cardId, card);
                });
            }
        });
    };
    // ==========================================
    // 5. ฟังก์ชันลบข้อมูลรีวิว
    // ==========================================
    const deleteReview = (id, cardElement) => {
        if (!id)
            return;
        // ใส่ Class deleting เพื่อเล่นแอนิเมชันตอนลบ
        cardElement.classList.add('deleting');
        const rawData = localStorage.getItem('user_reviews');
        let storedReviews = rawData ? JSON.parse(rawData) : [];
        if (!Array.isArray(storedReviews))
            storedReviews = [storedReviews];
        // กรองเอาตัวที่ถูกลบออก
        storedReviews = storedReviews.filter((item) => String(item.id) !== String(id));
        localStorage.setItem('user_reviews', JSON.stringify(storedReviews));
        // รอแอนิเมชันทำงานเสร็จ 300ms ค่อยลบออกจากจอจริง
        setTimeout(() => {
            cardElement.remove();
            if (storedReviews.length === 0)
                renderProfileReviews(); // ถ้าลบจนหมดให้ขึ้นข้อความ
        }, 300);
    };
    // เริ่มการทำงานทั้งหมดเมื่อโหลดหน้า
    renderProfileReviews();
});
//# sourceMappingURL=profile.js.map