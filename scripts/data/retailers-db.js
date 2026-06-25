/**
 * GapLuck — Centralized Retailer Pricing & Metadata Database
 * This file serves as the single source of truth for all mock retailer prices,
 * country metadata, and retailer details across the landing and comparison page prototypes.
 */

(function () {
  'use strict';

  const variantPrices = {
    "256GB": {
      turkey: 52000,
      turkey_hepsiburada: 48500,
      turkey_trendyol: 49200,
      turkey_mediamarkt: 50100,
      turkey_teknosa: 49500,
      turkey_vatan: 49900,
      turkey_n11: 48900,
      turkey_amazon: 47900,
      turkey_itopya: 48200,
      turkey_sahibinden: 46500,
      turkey_pttavm: 47100,
      turkey_sinerji: 48400,
      turkey_incehesap: 47600,
      turkey_ciceksepeti: 48000,
      uae: 39200,
      uae_apple: 39200,
      uae_sharaf: 40100,
      uae_jumbo: 40850,
      usa: 35900,
      usa_bestbuy: 35900,
      usa_apple: 36400,
      usa_bh: 36200,
      japan: 37100,
      japan_apple: 37500,
      japan_yodobashi: 37100,
      uk: 43500,
      uk_apple: 43500,
      uk_currys: 44200,
      germany: 40400,
      germany_mediamarkt: 40400,
      germany_saturn: 40900,
      canada: 36800,
      canada_bestbuy: 36800,
      canada_apple: 37300
    },
    "512GB": {
      turkey: 59000,
      turkey_hepsiburada: 55000,
      turkey_trendyol: 55800,
      turkey_mediamarkt: 57000,
      turkey_teknosa: 56000,
      turkey_vatan: 56800,
      turkey_n11: 55400,
      turkey_amazon: 54500,
      turkey_itopya: 55100,
      turkey_sahibinden: 53000,
      turkey_pttavm: 53900,
      turkey_sinerji: 55300,
      turkey_incehesap: 54800,
      turkey_ciceksepeti: 55000,
      uae: 44500,
      uae_apple: 44500,
      uae_sharaf: 45400,
      uae_jumbo: 46200,
      usa: 39900,
      usa_bestbuy: 39900,
      usa_apple: 40400,
      usa_bh: 40200,
      japan: 41900,
      japan_apple: 42300,
      japan_yodobashi: 41900,
      uk: 49200,
      uk_apple: 49200,
      uk_currys: 49800,
      germany: 45800,
      germany_mediamarkt: 45800,
      germany_saturn: 46300,
      canada: 41800,
      canada_bestbuy: 41800,
      canada_apple: 42400
    },
    "1TB": {
      turkey: 69000,
      turkey_hepsiburada: 64500,
      turkey_trendyol: 65400,
      turkey_mediamarkt: 66500,
      turkey_teknosa: 65900,
      turkey_vatan: 66900,
      turkey_n11: 64900,
      turkey_amazon: 63900,
      turkey_itopya: 64800,
      turkey_sahibinden: 62000,
      turkey_pttavm: 62900,
      turkey_sinerji: 65100,
      turkey_incehesap: 64200,
      turkey_ciceksepeti: 64500,
      uae: 52000,
      uae_apple: 52000,
      uae_sharaf: 53100,
      uae_jumbo: 53900,
      usa: 46900,
      usa_bestbuy: 46900,
      usa_apple: 47400,
      usa_bh: 47200,
      japan: 48900,
      japan_apple: 49400,
      japan_yodobashi: 48900,
      uk: 57900,
      uk_apple: 57900,
      uk_currys: 58600,
      germany: 53900,
      germany_mediamarkt: 53900,
      germany_saturn: 54500,
      canada: 48900,
      canada_bestbuy: 48900,
      canada_apple: 49500
    }
  };

  const countryMeta = {
    turkey: {
      id: "turkey",
      code: "TR",
      name_en: "Turkey",
      name_tr: "Türkiye",
      name_ar: "تركيا",
      flag: "tr.svg",
      currency: "TRY"
    },
    uae: {
      id: "uae",
      code: "AE",
      name_en: "UAE",
      name_tr: "AE (BAE)",
      name_ar: "الإمارات",
      flag: "ae.svg",
      currency: "AED"
    },
    usa: {
      id: "usa",
      code: "US",
      name_en: "USA",
      name_tr: "ABD",
      name_ar: "أمريكا",
      flag: "us.svg",
      currency: "USD"
    },
    japan: {
      id: "japan",
      code: "JP",
      name_en: "Japan",
      name_tr: "Japonya",
      name_ar: "اليابان",
      flag: "jp.svg",
      currency: "JPY"
    },
    uk: {
      id: "uk",
      code: "GB",
      name_en: "UK",
      name_tr: "İngiltere",
      name_ar: "بريطانيا",
      flag: "gb.svg",
      currency: "GBP"
    },
    germany: {
      id: "germany",
      code: "DE",
      name_en: "Germany",
      name_tr: "Almanya",
      name_ar: "ألمانيا",
      flag: "de.svg",
      currency: "EUR"
    },
    canada: {
      id: "canada",
      code: "CA",
      name_en: "Canada",
      name_tr: "Kanada",
      name_ar: "كندا",
      flag: "ca.svg",
      currency: "CAD"
    }
  };

  const retailersMeta = {
    // Turkey Retailers
    turkey_hepsiburada: { name: "Hepsiburada", seller_name: "TechStore Istanbul", type: "verified", time: "1h ago", stock: "in-stock", last_verified: "2026-06-03", url: "#", tier: 3 },
    turkey_trendyol: { name: "Trendyol", seller_name: "Apple Premium Reseller TR", type: "verified", time: "2h ago", stock: "in-stock", featured: true, verification_due: true, last_verified: "2026-04-20", url: "#", tier: 3 },
    turkey_mediamarkt: { name: "MediaMarkt TR", seller_name: "MediaMarkt Turkey", type: "authorized", time: "3h ago", stock: "out-of-stock", last_verified: "2026-05-28", url: "#", tier: 2 },
    turkey_teknosa: { name: "Teknosa", seller_name: "Teknosa A.Ş.", type: "authorized", time: "4h ago", stock: "in-stock", last_verified: "2026-05-28", url: "#", tier: 2 },
    turkey_vatan: { name: "Vatan Bilgisayar", seller_name: "Vatan Mağazacılık A.Ş.", type: "verified", time: "5h ago", stock: "in-stock", last_verified: "2026-06-01", url: "#", tier: 3 },
    turkey_n11: { name: "n11", seller_name: "N11.com Mağaza", type: "verified", time: "7h ago", stock: "in-stock", last_verified: "2026-06-02", url: "#", tier: 3 },
    turkey_amazon: { name: "Amazon TR", seller_name: "Amazon Turkey", type: "official", time: "2h ago", stock: "in-stock", last_verified: "2026-06-03", url: "#", tier: 1 },
    turkey_itopya: { name: "Itopya", seller_name: "Itopya Bilgisayar", type: "verified", time: "5h ago", stock: "in-stock", last_verified: "2026-06-03", url: "#", tier: 3 },
    turkey_sahibinden: { name: "Sahibinden", seller_name: "Sahibinden Market", type: "verified", time: "8h ago", stock: "in-stock", last_verified: "2026-06-03", url: "#", tier: 3 },
    turkey_pttavm: { name: "PTTAVM", seller_name: "PTT AVM", type: "verified", time: "12h ago", stock: "in-stock", last_verified: "2026-06-03", url: "#", tier: 3 },
    turkey_sinerji: { name: "Sinerji", seller_name: "Sinerji Bilgisayar", type: "verified", time: "1d ago", stock: "in-stock", last_verified: "2026-06-03", url: "#", tier: 3 },
    turkey_incehesap: { name: "İncehesap", seller_name: "Incehesap Bilgi Teknolojileri", type: "verified", time: "4h ago", stock: "in-stock", last_verified: "2026-06-03", url: "#", tier: 3 },
    turkey_ciceksepeti: { name: "Çiçeksepeti", seller_name: "Ciceksepeti Extra", type: "verified", time: "6h ago", stock: "in-stock", last_verified: "2026-06-03", url: "#", tier: 3 },

    // UAE Retailers
    uae_apple: { name: "Apple Store UAE", seller_name: "Apple Inc.", type: "official", time: "5h ago", stock: "in-stock", last_verified: "2026-06-01", url: "#", tier: 1 },
    uae_sharaf: { name: "Sharaf DG", seller_name: "Sharaf DG LLC", type: "authorized", time: "9h ago", stock: "in-stock", last_verified: "2026-05-30", url: "#", tier: 2 },
    uae_jumbo: { name: "Jumbo Electronics", seller_name: "Jumbo Electronics LLC", type: "authorized", time: "1d ago", stock: "in-stock", verification_due: true, last_verified: "2026-04-15", url: "#", tier: 2 },

    // USA Retailers
    usa_bestbuy: { name: "Best Buy", seller_name: "Best Buy Co., Inc.", type: "authorized", time: "1h ago", stock: "in-stock", last_verified: "2026-05-25", url: "#", tier: 2 },
    usa_bh: { name: "B&H Photo", seller_name: "B&H Foto & Electronics", type: "authorized", time: "4h ago", stock: "in-stock", last_verified: "2026-05-26", url: "#", tier: 2 },
    usa_apple: { name: "Apple US", seller_name: "Apple Inc.", type: "official", time: "2h ago", stock: "in-stock", last_verified: "2026-06-01", url: "#", tier: 1 },

    // Japan Retailers
    japan_yodobashi: { name: "Yodobashi Camera", seller_name: "Yodobashi-Camera.co.jp", type: "authorized", time: "4h ago", stock: "in-stock", last_verified: "2026-05-27", url: "#", tier: 2 },
    japan_apple: { name: "Apple Store JP", seller_name: "Apple Japan G.K.", type: "official", time: "10h ago", stock: "in-stock", last_verified: "2026-06-01", url: "#", tier: 1 },

    // UK Retailers
    uk_apple: { name: "Apple Store UK", seller_name: "Apple Retail UK Ltd", type: "official", time: "2h ago", stock: "in-stock", last_verified: "2026-06-01", url: "#", tier: 1 },

    // Germany Retailers
    germany_mediamarkt: { name: "MediaMarkt DE", seller_name: "MediaMarkt Saturn Deutschland", type: "authorized", time: "3h ago", stock: "in-stock", last_verified: "2026-05-29", url: "#", tier: 2 },

    // Canada Retailers
    canada_bestbuy: { name: "Best Buy Canada", seller_name: "Best Buy Canada Ltd", type: "authorized", time: "5h ago", stock: "in-stock", last_verified: "2026-05-24", url: "#", tier: 2 }
  };

  // Expose global database namespace
  window.GapLuckRetailersDB = {
    variantPrices,
    countryMeta,
    retailersMeta
  };

})();
