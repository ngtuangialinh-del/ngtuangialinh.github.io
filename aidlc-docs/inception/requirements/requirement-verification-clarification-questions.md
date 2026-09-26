# Requirements Clarification: Security-Compliant Hosting

All sixteen original answers were valid. One deployment decision is still required because the enabled Security Baseline makes `SECURITY-04` a blocking constraint.

The current GitHub Pages deployment emits HTTPS and HSTS, but the live response does not emit the complete required Content Security Policy, `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy` header set. A document-level meta tag cannot satisfy a rule that explicitly requires HTTP response headers.

## Question 1

How should the portfolio achieve the required HTTP security headers?

A) Move production deployment to a header-capable static host such as Cloudflare Pages, Netlify, or Vercel while retaining the GitHub repository (recommended for full Security Baseline enforcement)
B) Keep GitHub Pages behind a custom domain and a configurable edge proxy such as Cloudflare, which requires domain and DNS setup
C) Keep direct GitHub Pages hosting and revise Question 15 to disable the Security Baseline because `SECURITY-04` cannot be fully satisfied there
X) Other (please describe the hosting or approved security exception after [Answer]: tag below)

[Answer]: C
