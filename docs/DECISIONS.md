# Decisions

## 2026-04 – Motion is adapter-based

We chose to isolate GSAP and Lenis in @velum/adapters to:

- keep core/react portable
- allow non-animated usage
- support alternative animation systems

Tradeoffs:
- slightly more setup for consumers