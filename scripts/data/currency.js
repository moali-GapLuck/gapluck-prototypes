/**
 * GapLuck - Centralized Currency Conversion & Formatting Utility
 * Exposes window.Rates, window.Currencies, and window.formatMoney globally.
 */

(function () {
  'use strict';

  const rates = {
    TRY: 1,
    USD: 32.7,
    EUR: 35.1,
    AED: 8.9,
    GBP: 41.5,
    SAR: 8.7,
    EGP: 0.69,
    SGD: 24.2,
    KRW: 0.024,
    HKD: 4.19,
    CNY: 4.51,
    JPY: 0.21
  };

  const currencies = {
    TRY: { symbol: "₺", code: "TRY" },
    USD: { symbol: "$", code: "USD" },
    EUR: { symbol: "€", code: "EUR" },
    AED: { symbol: "AED ", code: "AED" },
    GBP: { symbol: "£", code: "GBP" },
    SAR: { symbol: "SAR ", code: "SAR" },
    EGP: { symbol: "E£", code: "EGP" },
    SGD: { symbol: "S$", code: "SGD" },
    KRW: { symbol: "₩", code: "KRW" },
    HKD: { symbol: "HK$", code: "HKD" },
    CNY: { symbol: "¥", code: "CNY" },
    JPY: { symbol: "¥", code: "JPY" }
  };

  function formatMoney(amountTRY, currencyCode) {
    const c = currencies[currencyCode] || currencies.TRY;
    const val = amountTRY / (rates[currencyCode] || 1);
    const decimals = 0;
    const num = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(Math.round(val));
    return `${c.symbol}${num}`;
  }

  // Expose to window namespace
  window.GapLuckCurrency = {
    rates,
    currencies,
    formatMoney
  };

  // Polyfill older definitions for page compatibility
  window.rates = rates;
  window.currencies = currencies;
  window.formatMoney = formatMoney;
})();
