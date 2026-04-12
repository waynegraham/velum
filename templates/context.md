Context:

Velum architecture:
- core = IIIF parsing + normalized models
- react = rendering + hooks
- adapters = GSAP, ScrollTrigger, Lenis (optional)
- templates = composition only

Rules:
- do not parse IIIF in React
- do not use GSAP in react
- components must consume normalized models
- motion must be opt-in

Design intent:
- editorial
- spacious
- art-first
- minimal UI chrome