# Magento 2 + Hyvä — Interview Prep

Personal interview prep guide for the E-commerce Developer (Magento 2) role at Gila AlTawakol Electric.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Main guide — Magento 2 core, Hyvä, B2B, projects, Q&A, infra |
| `checklist.html` | Checklist deep dive — each of the 15 topics answered in full |
| `shared.css` | Styles used by both pages (reset, nav, code, tables, callout boxes) |
| `index.css` | Styles specific to index.html (sections, cards, Q&A accordion, TOC) |
| `checklist.css` | Styles specific to checklist.html (topic accordion, progress bar, say boxes) |
| `index.js` | JS for index.html (Q&A toggle, checklist localStorage) |
| `checklist.js` | JS for checklist.html (topic toggle, done tracking, progress bar) |

## How to use

Open both files directly in a browser — no server needed.

```
index.html     → start here, skim each section
checklist.html → go deep on each topic, mark done as you go
```

Progress on the checklist is saved in `localStorage` and survives page refresh.

## Topics covered

- Magento 2 architecture (MVC, modules, layout XML, plugins, observers, DI, data patches)
- Hyvä theme (Alpine.js, TailwindCSS, template override, performance numbers)
- B2B vs B2C (company accounts, pricing, modules)
- Project stories (Sports Group Denmark, Gemoss, Satoshi Hyvä Theme)
- Interview Q&A (15 questions with full answers)
- GCP infrastructure + Cloudflare
- Security (OWASP, PCI DSS, Magento hardening)
- Salary negotiation
