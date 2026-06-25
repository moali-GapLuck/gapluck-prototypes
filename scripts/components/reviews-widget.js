/**
 * GapLuck - Reusable Interactive Rating & Review Widget Component
 * Centralizes customer reviews, stats summaries, filtering, sorting, and verified form submission.
 * Fully supports English (EN), Turkish (TR), and Arabic (AR) with automatic translation on global events.
 */

(function () {
  'use strict';

  // Trilingual dictionary for all reviews widget UI text  // Dictionary translations are now centralized in window.GapLuckI18N

  // Mock Reviews Dataset with trilingual text support
  const defaultReviews = [
    {
      id: 1,
      author: "Alperen T.",
      avatar: "A",
      stars: 5,
      type: "traveler-buyer",
      route: "uae",
      location: "Istanbul",
      bodies: {
        en: "Felt a bit nervous matching with a traveler first, but the escrow system worked flawlessly. Murat met me in Kadikoy, I checked the box, typed the code, and got my phone.",
        tr: "İlk başta bir gezginle eşleşmekten biraz tedirgindim, ancak emanet (escrow) sistemi kusursuz çalıştı. Murat benimle Kadıköy'de buluştu, kutuyu kontrol ettim, kodu girdim ve telefonumu aldım.",
        ar: "شعرت بالقلق قليلاً من مطابقة مسافر في البداية، لكن نظام الضمان (الأمان) عمل بشكل مثالي. التقى بي مراد في كاديكوي، وفحصت الصندوق، وأدخلت الرمز، وحصلت على هاتفي."
      },
      routesTrans: {
        en: "Dubai Route",
        tr: "Dubai Rotası",
        ar: "مسار دبي"
      }
    },
    {
      id: 2,
      author: "Mehmet S.",
      avatar: "M",
      stars: 5,
      type: "traveler-deliverer",
      route: "germany",
      location: "Istanbul",
      bodies: {
        en: "I matched my Frankfurt-Istanbul flight route. Met the buyer at the airport, handed over the phone in its sealed box, and got paid instantly. Great way to subsidize travel costs!",
        tr: "Frankfurt-İstanbul uçuş rotamı eşleştirdim. Alıcıyla havalimanında buluştu, telefonu kapalı kutusunda teslim ettim ve anında ödememi aldım. Seyahat masraflarını karşılamak için harika bir yol!",
        ar: "لقد قمت بمطابقة خط طيراني فرانكفورت-إسطنبول. التقيت بالمشتري في المطار، وسلمته الهاتف في صندوقه المغلق، واستلمت أموالي على الفور. طريقة رائعة لدعم تكاليف السفر!"
      },
      routesTrans: {
        en: "Frankfurt Route",
        tr: "Frankfurt Rotası",
        ar: "مسار فرانكفورت"
      }
    },
    {
      id: 3,
      author: "Derya K.",
      avatar: "D",
      stars: 5,
      type: "product",
      route: "none",
      location: "Ankara",
      bodies: {
        en: "The A19 Pro chip is incredibly fast, and the battery life is easily a day and a half. The screen is massive but the thin bezels make it very manageable.",
        tr: "A19 Pro çip inanılmaz hızlı ve pil ömrü rahatlıkla bir buçuk gün gidiyor. Ekran devasa ama ince çerçeveler sayesinde kullanımı çok rahat.",
        ar: "شريحة A19 Pro سريعة للغاية، وعمر البطارية يكفي بسهولة ليوم ونصف. الشاشة ضخمة ولكن الحواف النحيفة تجعل التحكم فيها سهلاً للغاية."
      },
      routesTrans: {
        en: "",
        tr: "",
        ar: ""
      }
    },
    {
      id: 4,
      author: "Sarah J.",
      avatar: "S",
      stars: 4,
      type: "courier-buyer",
      route: "usa",
      location: "Ankara",
      bodies: {
        en: "Shipped through Delaware warehouse. The import duty was calculated perfectly on GapLuck, and DHL delivered it to Ankara in 8 days. Highly recommended.",
        tr: "Delaware deposu üzerinden gönderildi. İthalat vergisi GapLuck'ta mükemmel şekilde hesaplandı ve DHL bunu 8 günde Ankara'ya teslim etti. Kesinlikle tavsiye ederim.",
        ar: "تم الشحن عبر مستودع ديلاوير. تم حساب رسوم الاستيراد بشكل مثالي على GapLuck، وقامت DHL بتسليمها إلى أنقرة في غضون 8 أيام. موصى به للغاية."
      },
      routesTrans: {
        en: "NYC Route",
        tr: "NYC Rotası",
        ar: "مسار نيويورك"
      }
    },
    {
      id: 5,
      author: "Metehan U.",
      avatar: "M",
      stars: 3,
      type: "direct-buyer",
      route: "uae",
      location: "Izmir",
      bodies: {
        en: "Bought it directly at the Dubai Apple Store using a route I found here. The price was great, but the line at the Apple Store was crazy long. Platform did its job well.",
        tr: "Burada bulduğum bir rotayı kullanarak doğrudan Dubai Apple Store'dan satın aldım. Fiyat harikaydı, ancak Apple Store'daki kuyruk çılgınca uzundu. Platform işini iyi yaptı.",
        ar: "اشتريته مباشرة من متجر أبل دبي باستخدام مسافر وجدته هنا. كان السعر رائعًا، ولكن طابور متجر أبل كان طويلاً للغاية. المنصة قامت بعملها على أكمل وجه."
      },
      routesTrans: {
        en: "Dubai Route",
        tr: "Dubai Rotası",
        ar: "مسار دبي"
      }
    },
    {
      id: 6,
      author: "Sinan B.",
      avatar: "S",
      stars: 5,
      type: "traveler-buyer",
      route: "germany",
      location: "Bursa",
      bodies: {
        en: "Berlin to Bursa matching. No customs issues, traveler was verified and met me exactly on time. Saved nearly ₺10,000 on my import.",
        tr: "Berlin'den Bursa'ya eşleşme. Gümrük sorunu yaşanmadı, gezgin doğrulandı ve benimle tam zamanında buluştu. İthalatımda neredeyse ₺10.000 tasarruf ettim.",
        ar: "مطابقة برلين إلى بورصة. لا توجد مشاكل جمركية، تم التحقق من المسافر والتقى بي في الوقت المحدد تمامًا. وفرت ما يقرب من 10,000 ليرة في الاستيراد."
      },
      routesTrans: {
        en: "Berlin Route",
        tr: "Berlin Rotası",
        ar: "مسار برلين"
      }
    }
  ];

  class GapLuckReviewsWidget {
    constructor(containerSelector, options = {}) {
      this.container = document.querySelector(containerSelector);
      if (!this.container) {
        console.error(`GapLuckReviewsWidget: Container selector "${containerSelector}" not found.`);
        return;
      }

      this.options = Object.assign({
        productName: "iPhone 17 Pro Max"
      }, options);

      // Initialize dataset
      this.reviews = [...defaultReviews];

      // Get initial language
      this.lang = localStorage.getItem('gl-lang') || localStorage.getItem('ag-lang') || 'en';

      // Setup dynamic translation proxy redirecting to window.GapLuckI18N
      const self = this;
      this.trans = new Proxy({}, {
        get(target, prop) {
          const dict = window.GapLuckI18N ? (window.GapLuckI18N[self.lang] || window.GapLuckI18N.en) : null;
          if (!dict) return "";
          const reviewsKey = `reviews_${prop}`;
          return dict[reviewsKey] || dict[prop] || "";
        }
      });

      this.ratingValue = 5; // Default rating for submission form

      this.init();
    }

    init() {
      this.renderLayout();
      this.cacheElements();
      this.bindEvents();
      this.updateStats();
      this.applyFilterAndSort();
    }

    renderLayout() {
      const trans = this.trans;
      
      const html = `
        <section class="ag-blueprint-section">
          <div class="ag-blueprint-section__title-group">
            <h2 class="ag-blueprint-section__title">
              <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2" viewBox="0 0 24 24" width="24" style="color:var(--color-positive);">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span data-rev-i18n="section_title">${trans.section_title}</span>
            </h2>
            <p class="ag-blueprint-section__subtitle">
              <span data-rev-i18n="section_subtitle">${trans.section_subtitle}</span>
            </p>
          </div>

          <div class="ag-testimonials-grid">
            <!-- Left Column: Summary Stats & Write Review Form -->
            <div class="ag-testimonials-panel-left">
              <!-- Score Summary -->
              <div class="ag-review-summary-card">
                <!-- Top: big score + stars -->
                <div class="ag-review-summary-top">
                  <div class="ag-review-summary-score-block">
                    <div class="ag-review-summary-score">0.0</div>
                    <div class="ag-review-summary-stars">☆☆☆☆☆</div>
                  </div>
                  <div class="ag-review-summary-meta">
                    <div class="ag-review-summary-count" data-rev-i18n="stats_based_on">${trans.stats_based_on.replace('{count}', '0')}</div>
                    <div style="font-size: var(--text-2xs); color: var(--color-text-secondary); margin-top: 2px;" data-rev-i18n="stats_all_types">${trans.stats_all_types}</div>
                  </div>
                </div>
                <!-- Star breakdown bars -->
                <div class="ag-review-breakdown">
                  <div class="ag-review-breakdown-row" data-stars-row="5">
                    <span class="ag-review-breakdown-label">5 ★</span>
                    <div class="ag-review-breakdown-bar-track">
                      <div class="ag-review-breakdown-bar-fill" style="width: 0%;"></div>
                    </div>
                    <span class="ag-review-breakdown-count">0</span>
                  </div>
                  <div class="ag-review-breakdown-row" data-stars-row="4">
                    <span class="ag-review-breakdown-label">4 ★</span>
                    <div class="ag-review-breakdown-bar-track">
                      <div class="ag-review-breakdown-bar-fill" style="width: 0%;"></div>
                    </div>
                    <span class="ag-review-breakdown-count">0</span>
                  </div>
                  <div class="ag-review-breakdown-row" data-stars-row="3">
                    <span class="ag-review-breakdown-label">3 ★</span>
                    <div class="ag-review-breakdown-bar-track">
                      <div class="ag-review-breakdown-bar-fill" style="width: 0%;"></div>
                    </div>
                    <span class="ag-review-breakdown-count">0</span>
                  </div>
                  <div class="ag-review-breakdown-row" data-stars-row="2">
                    <span class="ag-review-breakdown-label">2 ★</span>
                    <div class="ag-review-breakdown-bar-track">
                      <div class="ag-review-breakdown-bar-fill" style="width: 0%;"></div>
                    </div>
                    <span class="ag-review-breakdown-count">0</span>
                  </div>
                  <div class="ag-review-breakdown-row" data-stars-row="1">
                    <span class="ag-review-breakdown-label">1 ★</span>
                    <div class="ag-review-breakdown-bar-track">
                      <div class="ag-review-breakdown-bar-fill" style="width: 0%;"></div>
                    </div>
                    <span class="ag-review-breakdown-count">0</span>
                  </div>
                </div>
              </div>

              <!-- Write a Review Form -->
              <div class="ag-review-form-card">
                <h3 class="ag-review-form-title" data-rev-i18n="form_title">${trans.form_title}</h3>

                <!-- Eligibility Notice -->
                <div class="ag-review-eligibility-notice">
                  <svg class="ag-review-eligibility-notice__icon" fill="none" height="14" stroke="currentColor"
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="14">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" x2="12" y1="8" y2="12"></line>
                    <line x1="12" x2="12.01" y1="16" y2="16"></line>
                  </svg>
                  <p class="ag-review-eligibility-notice__text">
                    <strong data-rev-i18n="eligibility_title">${trans.eligibility_title}</strong>
                    <span data-rev-i18n="eligibility_text">${trans.eligibility_text}</span>
                  </p>
                </div>

                <!-- Review Type -->
                <div class="ag-form-group">
                  <label class="ag-form-label" for="review-type" data-rev-i18n="label_type">${trans.label_type}</label>
                  <select class="ag-form-select" id="review-type">
                    <option value="product">${trans.type_product}</option>
                    <option value="traveler-deliverer">${trans.type_traveler_deliverer}</option>
                    <option value="traveler-buyer">${trans.type_traveler_buyer}</option>
                    <option value="courier-buyer">${trans.type_courier_buyer}</option>
                    <option value="direct-buyer">${trans.type_direct_buyer}</option>
                  </select>
                </div>

                <!-- Route selection (hidden initially) -->
                <div class="ag-form-group" id="form-route-group" style="display: none;">
                  <label class="ag-form-label" for="review-route" data-rev-i18n="label_route">${trans.label_route}</label>
                  <select class="ag-form-select" id="review-route">
                    <option value="none">${trans.route_all}</option>
                    <option value="uae">${trans.route_uae}</option>
                    <option value="usa">${trans.route_usa}</option>
                    <option value="germany">${trans.route_germany}</option>
                    <option value="japan">${trans.route_japan}</option>
                  </select>
                </div>

                <!-- Rating Stars Selection -->
                <div class="ag-form-group">
                  <label class="ag-form-label" data-rev-i18n="label_rating">${trans.label_rating}</label>
                  <div class="ag-star-rating-select" id="form-stars-select">
                    <span data-value="1">★</span>
                    <span data-value="2">★</span>
                    <span data-value="3">★</span>
                    <span data-value="4">★</span>
                    <span class="active" data-value="5">★</span>
                  </div>
                  <input type="hidden" id="review-rating-value" value="5" />
                </div>

                <!-- Author Name -->
                <div class="ag-form-group">
                  <label class="ag-form-label" for="review-author">
                    <span data-rev-i18n="label_name">${trans.label_name}</span> <span style="color:var(--color-warning);">*</span>
                  </label>
                  <input class="ag-form-input" type="text" id="review-author" placeholder="${trans.placeholder_name}" required />
                </div>

                <!-- Email Address -->
                <div class="ag-form-group">
                  <label class="ag-form-label" for="review-email">
                    <span data-rev-i18n="label_email">${trans.label_email}</span> <span style="color:var(--color-warning);">*</span>
                  </label>
                  <input class="ag-form-input" type="email" id="review-email" placeholder="${trans.placeholder_email}" required />
                  <span style="font-size:var(--text-2xs); color:var(--color-text-secondary); margin-top:2px;" data-rev-i18n="email_note">${trans.email_note}</span>
                </div>

                <!-- Review Text -->
                <div class="ag-form-group">
                  <label class="ag-form-label" for="review-text">
                    <span data-rev-i18n="label_review">${trans.label_review}</span> <span style="color:var(--color-warning);">*</span>
                  </label>
                  <textarea class="ag-form-textarea" id="review-text" rows="3" placeholder="${trans.placeholder_review}" required></textarea>
                </div>

                <!-- Verified Purchase Confirmation -->
                <div class="ag-form-group">
                  <label class="ag-form-checkbox-row" for="review-verified">
                    <input type="checkbox" id="review-verified" />
                    <span data-rev-i18n="verified_checkbox">${trans.verified_checkbox}</span>
                  </label>
                </div>

                <button class="ag-btn ag-btn--primary ag-review-submit-btn" id="btn-submit-review" data-rev-i18n="btn_submit">${trans.btn_submit}</button>
              </div>
            </div>

            <!-- Right Column: Filter Controls and Testimonial Feed -->
            <div class="ag-testimonials-panel-right">
              <!-- Filters + Sort Bar -->
              <div class="ag-reviews-filter-bar">
                <!-- Header: Filter label + Sort -->
                <div class="ag-reviews-controls-header">
                  <span class="ag-reviews-controls-title" data-rev-i18n="filter_title">${trans.filter_title}</span>
                  <div class="ag-reviews-sort-row">
                    <span class="ag-reviews-sort-label" data-rev-i18n="label_sort">${trans.label_sort}</span>
                    <select class="ag-form-select" id="reviews-sort-select"
                      style="font-size:var(--text-2xs); padding-block:var(--space-1-5); padding-inline:var(--space-3);">
                      <option value="newest">${trans.sort_newest}</option>
                      <option value="highest">${trans.sort_highest}</option>
                      <option value="lowest">${trans.sort_lowest}</option>
                    </select>
                  </div>
                </div>

                <!-- Filter dropdowns row -->
                <div class="ag-reviews-filter-dropdowns">
                  <div class="ag-reviews-filter-dropdown-group">
                    <label class="ag-reviews-filter-label" for="filter-route-select" data-rev-i18n="filter_route">${trans.filter_route}</label>
                    <select class="ag-form-select" id="filter-route-select">
                      <option value="all">${trans.route_all}</option>
                      <option value="uae">${trans.route_uae}</option>
                      <option value="usa">${trans.route_usa}</option>
                      <option value="germany">${trans.route_germany}</option>
                      <option value="japan">${trans.route_japan}</option>
                    </select>
                  </div>

                  <div class="ag-reviews-filter-dropdown-group">
                    <label class="ag-reviews-filter-label" for="filter-type-select" data-rev-i18n="filter_type">${trans.filter_type}</label>
                    <select class="ag-form-select" id="filter-type-select">
                      <option value="all">${trans.type_all}</option>
                      <option value="product">${trans.type_product}</option>
                      <option value="traveler-deliverer">${trans.type_traveler_deliverer}</option>
                      <option value="traveler-buyer">${trans.type_traveler_buyer}</option>
                      <option value="courier-buyer">${trans.type_courier_buyer}</option>
                      <option value="direct-buyer">${trans.type_direct_buyer}</option>
                    </select>
                  </div>

                  <div class="ag-reviews-filter-dropdown-group">
                    <label class="ag-reviews-filter-label" for="filter-stars-select" data-rev-i18n="filter_rating">${trans.filter_rating}</label>
                    <select class="ag-form-select" id="filter-stars-select">
                      <option value="all">${trans.rating_all}</option>
                      <option value="5">${trans.rating_5}</option>
                      <option value="4">${trans.rating_4}</option>
                      <option value="3">${trans.rating_3}</option>
                      <option value="2">${trans.rating_2}</option>
                      <option value="1">${trans.rating_1}</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Vertical scrollable reviews feed -->
              <div class="ag-reviews-feed" id="viewport-reviews">
                <!-- Dynamic cards injected here -->
              </div>
            </div>
          </div>
        </section>
      `;

      this.container.innerHTML = html.trim();
    }

    cacheElements() {
      const c = this.container;
      this.feed = c.querySelector("#viewport-reviews");
      this.submitBtn = c.querySelector("#btn-submit-review");
      this.typeSelectForm = c.querySelector("#review-type");
      this.routeGroupForm = c.querySelector("#form-route-group");
      this.routeSelectForm = c.querySelector("#review-route");
      this.hiddenRating = c.querySelector("#review-rating-value");
      this.starSpans = c.querySelectorAll("#form-stars-select span");
      
      // Filter & Sort elements
      this.sortSelect = c.querySelector("#reviews-sort-select");
      this.routeFilter = c.querySelector("#filter-route-select");
      this.typeFilter = c.querySelector("#filter-type-select");
      this.starsFilter = c.querySelector("#filter-stars-select");

      // Stats Elements
      this.scoreDisplay = c.querySelector(".ag-review-summary-score");
      this.starsDisplay = c.querySelector(".ag-review-summary-stars");
      this.countDisplay = c.querySelector(".ag-review-summary-count");
    }

    bindEvents() {
      // ── Form type change toggles route selector ──────────────────────────
      this.typeSelectForm.addEventListener("change", () => {
        const type = this.typeSelectForm.value;
        const needsRoute = type !== "product" && type !== "direct-buyer";
        this.routeGroupForm.style.display = needsRoute ? "flex" : "none";
        if (!needsRoute) {
          this.routeSelectForm.value = "none";
        }
      });

      // ── Interactive Star Rating selection (form) ────────────────────────
      this.starSpans.forEach(span => {
        span.addEventListener("mouseenter", () => {
          const hoverVal = parseInt(span.getAttribute("data-value"));
          this.starSpans.forEach(s => {
            s.textContent = parseInt(s.getAttribute("data-value")) <= hoverVal ? "★" : "☆";
          });
        });

        span.addEventListener("mouseleave", () => {
          const currentRating = this.ratingValue;
          this.starSpans.forEach(s => {
            const sVal = parseInt(s.getAttribute("data-value"));
            s.textContent = sVal <= currentRating ? "★" : "☆";
          });
        });

        span.addEventListener("click", () => {
          const val = parseInt(span.getAttribute("data-value"));
          this.ratingValue = val;
          this.hiddenRating.value = val;
          this.starSpans.forEach(s => {
            const sVal = parseInt(s.getAttribute("data-value"));
            if (sVal <= val) {
              s.textContent = "★";
              s.classList.add("active");
            } else {
              s.textContent = "☆";
              s.classList.remove("active");
            }
          });
        });
      });

      // ── Star Selector Initial Render Sync ─────────────────────────────────
      this.syncStarSelector();

      // ── Filter and Sort inputs ───────────────────────────────────────────
      this.routeFilter.addEventListener("change", () => this.applyFilterAndSort());
      this.typeFilter.addEventListener("change", () => this.applyFilterAndSort());
      this.starsFilter.addEventListener("change", () => this.applyFilterAndSort());
      this.sortSelect.addEventListener("change", () => this.applyFilterAndSort());

      // ── Form Submission ──────────────────────────────────────────────────
      this.submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.submitReview();
      });

      // ── Translation Sync Listener ────────────────────────────────────────
      window.addEventListener("gl-language-change", (e) => {
        this.translate(e.detail.language);
      });
    }

    syncStarSelector() {
      this.starSpans.forEach(s => {
        const sVal = parseInt(s.getAttribute("data-value"));
        if (sVal <= this.ratingValue) {
          s.textContent = "★";
          s.classList.add("active");
        } else {
          s.textContent = "☆";
          s.classList.remove("active");
        }
      });
    }

    translate(newLang) {
      if (window.GapLuckI18N && !window.GapLuckI18N[newLang]) return;
      this.lang = newLang;
      const trans = this.trans;

      // Update all static labels containing data-rev-i18n attribute
      const elements = this.container.querySelectorAll("[data-rev-i18n]");
      elements.forEach(el => {
        const key = el.getAttribute("data-rev-i18n");
        if (trans[key] !== undefined) {
          // Keep count placeholder replacement for score summary
          if (key === "stats_based_on") {
            const count = this.reviews.length;
            el.textContent = trans[key].replace("{count}", count);
          } else {
            el.textContent = trans[key];
          }
        }
      });

      // Update placeholders
      const nameInput = this.container.querySelector("#review-author");
      const emailInput = this.container.querySelector("#review-email");
      const textInput = this.container.querySelector("#review-text");

      if (nameInput) nameInput.placeholder = trans.placeholder_name;
      if (emailInput) emailInput.placeholder = trans.placeholder_email;
      if (textInput) textInput.placeholder = trans.placeholder_review;

      // Translate select option lists
      this.translateSelectOptions();

      // Recalculate and re-render everything
      this.updateStats();
      this.applyFilterAndSort();
    }

    translateSelectOptions() {
      const trans = this.trans;

      // 1. Review Type Form Select
      const typeSelect = this.container.querySelector("#review-type");
      if (typeSelect) {
        typeSelect.options[0].text = trans.type_product;
        typeSelect.options[1].text = trans.type_traveler_deliverer;
        typeSelect.options[2].text = trans.type_traveler_buyer;
        typeSelect.options[3].text = trans.type_courier_buyer;
        typeSelect.options[4].text = trans.type_direct_buyer;
      }

      // 2. Route Form Select
      const routeSelect = this.container.querySelector("#review-route");
      if (routeSelect) {
        routeSelect.options[0].text = trans.route_all;
        routeSelect.options[1].text = trans.route_uae;
        routeSelect.options[2].text = trans.route_usa;
        routeSelect.options[3].text = trans.route_germany;
        routeSelect.options[4].text = trans.route_japan;
      }

      // 3. Sort Select Bar
      if (this.sortSelect) {
        this.sortSelect.options[0].text = trans.sort_newest;
        this.sortSelect.options[1].text = trans.sort_highest;
        this.sortSelect.options[2].text = trans.sort_lowest;
      }

      // 4. Filters dropdowns
      if (this.routeFilter) {
        this.routeFilter.options[0].text = trans.route_all;
        this.routeFilter.options[1].text = trans.route_uae;
        this.routeFilter.options[2].text = trans.route_usa;
        this.routeFilter.options[3].text = trans.route_germany;
        this.routeFilter.options[4].text = trans.route_japan;
      }

      if (this.typeFilter) {
        this.typeFilter.options[0].text = trans.type_all;
        this.typeFilter.options[1].text = trans.type_product;
        this.typeFilter.options[2].text = trans.type_traveler_deliverer;
        this.typeFilter.options[3].text = trans.type_traveler_buyer;
        this.typeFilter.options[4].text = trans.type_courier_buyer;
        this.typeFilter.options[5].text = trans.type_direct_buyer;
      }

      if (this.starsFilter) {
        this.starsFilter.options[0].text = trans.rating_all;
        this.starsFilter.options[1].text = trans.rating_5;
        this.starsFilter.options[2].text = trans.rating_4;
        this.starsFilter.options[3].text = trans.rating_3;
        this.starsFilter.options[4].text = trans.rating_2;
        this.starsFilter.options[5].text = trans.rating_1;
      }
    }

    submitReview() {
      const trans = this.trans;
      const authorInput = this.container.querySelector("#review-author");
      const emailInput = this.container.querySelector("#review-email");
      const textInput = this.container.querySelector("#review-text");
      const verifiedCheck = this.container.querySelector("#review-verified");
      
      const author = authorInput ? authorInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const text = textInput ? textInput.value.trim() : "";
      const verified = verifiedCheck ? verifiedCheck.checked : false;
      
      const type = this.typeSelectForm.value;
      const route = this.routeSelectForm.value;
      const stars = this.ratingValue;

      // Validation check
      if (!author) {
        if (window.GapLuckToast && typeof window.GapLuckToast.show === "function") {
          window.GapLuckToast.show(trans.alert_name);
        } else {
          alert(trans.alert_name);
        }
        return;
      }
      if (!email || !email.includes("@")) {
        if (window.GapLuckToast && typeof window.GapLuckToast.show === "function") {
          window.GapLuckToast.show(trans.alert_email);
        } else {
          alert(trans.alert_email);
        }
        return;
      }
      if (!text) {
        if (window.GapLuckToast && typeof window.GapLuckToast.show === "function") {
          window.GapLuckToast.show(trans.alert_review);
        } else {
          alert(trans.alert_review);
        }
        return;
      }
      if (verifiedCheck && !verified) {
        if (window.GapLuckToast && typeof window.GapLuckToast.show === "function") {
          window.GapLuckToast.show(trans.alert_verified);
        } else {
          alert(trans.alert_verified);
        }
        return;
      }

      // Add to reviews dataset
      const newReview = {
        id: Date.now(),
        author: author,
        avatar: author.charAt(0).toUpperCase(),
        stars: stars,
        type: type,
        route: route,
        location: this.lang === "tr" ? "İstanbul" : (this.lang === "ar" ? "إسطنبول" : "Istanbul"),
        bodies: {
          en: text,
          tr: text,
          ar: text
        },
        routesTrans: {
          en: route !== "none" ? `${route.toUpperCase()} Route` : "",
          tr: route !== "none" ? `${route.toUpperCase()} Rotası` : "",
          ar: route !== "none" ? `مسار ${route.toUpperCase()}` : ""
        },
        timestamp: Date.now() // Track submission time for newest sort
      };

      // Push to front of reviews array (newest first)
      this.reviews.unshift(newReview);

      // Reset form
      if (authorInput) authorInput.value = "";
      if (emailInput) emailInput.value = "";
      if (textInput) textInput.value = "";
      if (verifiedCheck) verifiedCheck.checked = false;
      this.ratingValue = 5;
      this.hiddenRating.value = 5;
      this.syncStarSelector();

      // Hide route group if product selected
      this.routeSelectForm.value = "none";
      this.routeGroupForm.style.display = "none";
      this.typeSelectForm.value = "product";

      // Alert user of success
      if (window.GapLuckToast && typeof window.GapLuckToast.show === "function") {
        window.GapLuckToast.show(trans.success_message);
      } else {
        alert(trans.success_message);
      }

      // Recalculate statistics & refresh feed
      this.updateStats();
      this.applyFilterAndSort();
    }

    updateStats() {
      const trans = this.trans;
      const count = this.reviews.length;
      
      const starsCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      let totalSum = 0;
      
      this.reviews.forEach(r => {
        const s = r.stars;
        if (starsCount[s] !== undefined) {
          starsCount[s]++;
          totalSum += s;
        }
      });

      const avg = count > 0 ? (totalSum / count).toFixed(1) : "0.0";
      
      // Update displays
      if (this.scoreDisplay) this.scoreDisplay.textContent = avg;
      if (this.countDisplay) {
        this.countDisplay.textContent = trans.stats_based_on.replace("{count}", count);
      }

      // Rounded stars
      const roundedAvg = Math.round(parseFloat(avg));
      let starsHTML = "";
      for (let i = 1; i <= 5; i++) {
        starsHTML += i <= roundedAvg ? "★" : "☆";
      }
      if (this.starsDisplay) this.starsDisplay.innerHTML = starsHTML;

      // Update progress bar fills
      const rows = this.container.querySelectorAll(".ag-review-breakdown-row");
      rows.forEach(row => {
        const starAttr = row.getAttribute("data-stars-row");
        if (!starAttr) return;
        
        const star = parseInt(starAttr);
        const fill = row.querySelector(".ag-review-breakdown-bar-fill");
        const countEl = row.querySelector(".ag-review-breakdown-count");
        
        if (fill && countEl) {
          const n = starsCount[star] || 0;
          const pct = count > 0 ? Math.round((n / count) * 100) : 0;
          fill.style.width = pct + "%";
          countEl.textContent = n;
        }
      });
    }

    applyFilterAndSort() {
      const trans = this.trans;
      const activeRoute = this.routeFilter.value;
      const activeType = this.typeFilter.value;
      const activeStars = this.starsFilter.value;
      const sortMode = this.sortSelect.value;

      // 1. Filter dataset
      let filteredReviews = this.reviews.filter(r => {
        const matchRoute = activeRoute === "all" || r.route === activeRoute;
        const matchType = activeType === "all" || r.type === activeType;
        const matchStars = activeStars === "all" || r.stars.toString() === activeStars;
        return matchRoute && matchType && matchStars;
      });

      // 2. Sort dataset
      filteredReviews.sort((a, b) => {
        if (sortMode === "highest") {
          return b.stars - a.stars;
        } else if (sortMode === "lowest") {
          return a.stars - b.stars;
        } else {
          // newest first: use timestamp or original dataset index
          const timeA = a.timestamp || (1000 - a.id);
          const timeB = b.timestamp || (1000 - b.id);
          return timeB - timeA;
        }
      });

      // 3. Render feed items
      this.feed.innerHTML = "";

      if (filteredReviews.length === 0) {
        const emptyEl = document.createElement("div");
        emptyEl.className = "ag-reviews-empty-state";
        emptyEl.innerHTML = `
          <div class="ag-reviews-empty-state__icon">★</div>
          <p class="ag-reviews-empty-state__text">${trans.empty_state}</p>
        `;
        this.feed.appendChild(emptyEl);
        return;
      }

      filteredReviews.forEach(r => {
        const card = this.createReviewCard(r);
        this.feed.appendChild(card);
      });
    }

    createReviewCard(r) {
      const trans = this.trans;
      
      // Determine badge class and text
      let badgeClass = "ag-review-badge--product";
      let badgeLabel = trans.type_product;
      
      if (r.type === "traveler-deliverer") {
        badgeClass = "ag-review-badge--traveler-deliverer";
        badgeLabel = trans.type_traveler_deliverer;
      } else if (r.type === "traveler-buyer") {
        badgeClass = "ag-review-badge--traveler-buyer";
        badgeLabel = trans.type_traveler_buyer;
      } else if (r.type === "courier-buyer") {
        badgeClass = "ag-review-badge--courier-buyer";
        badgeLabel = trans.type_courier_buyer;
      } else if (r.type === "direct-buyer") {
        badgeClass = "ag-review-badge--direct-buyer";
        badgeLabel = trans.type_direct_buyer;
      }

      const starsStr = "★".repeat(r.stars) + "☆".repeat(5 - r.stars);
      
      // Get correct trilingual body
      const bodyText = r.bodies[this.lang] || r.bodies.en;
      
      // Determine meta details
      let routeDesc = trans.route_desc_none;
      if (r.route !== "none") {
        const rName = r.routesTrans[this.lang] || r.routesTrans.en;
        routeDesc = trans.route_desc_matched.replace("{route}", rName);
      }

      const card = document.createElement("div");
      card.className = "ag-testimonial-card-vertical";
      card.setAttribute("data-route", r.route);
      card.setAttribute("data-stars", r.stars);
      card.setAttribute("data-type", r.type);

      card.innerHTML = `
        <div class="ag-review-card-header">
          <span class="ag-testimonial-stars">${starsStr}</span>
          <span class="ag-review-badge ${badgeClass}">${badgeLabel}</span>
        </div>
        <p class="ag-testimonial-body">"${bodyText}"</p>
        <div class="ag-testimonial-footer">
          <div class="ag-testimonial-avatar">${r.avatar}</div>
          <div>
            <div class="ag-testimonial-author-name">${r.author}</div>
            <div class="ag-testimonial-author-meta">${r.location} · ${routeDesc}</div>
          </div>
        </div>
      `;

      return card;
    }
  }

  // Expose to global window object
  window.GapLuckReviewsWidget = GapLuckReviewsWidget;

})();
