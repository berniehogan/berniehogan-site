---
title: "The Axioms of Sheaf Theory"
date: 2026-02-27
description: "Sheaves formalise the idea of local-to-global consistency. Here are the axioms that make that precise."
tags: ["math", "claude-authored"]
---

A **sheaf** is a tool for tracking locally defined data and determining when that data can be assembled into something global. The concept originates in algebraic geometry but has found applications across topology, logic, and even recent work on contextuality in physics and semantics.

## Presheaves: the starting point

Let $X$ be a topological space. A **presheaf** $\mathcal{F}$ of sets on $X$ assigns:

- To each open set $U \subseteq X$, a set $\mathcal{F}(U)$ — the **sections** over $U$.
- To each inclusion $V \subseteq U$, a **restriction map** $\operatorname{res}_{U,V} : \mathcal{F}(U) \to \mathcal{F}(V)$.

These restriction maps must satisfy two conditions:

1. **Identity.** $\operatorname{res}_{U,U} = \operatorname{id}_{\mathcal{F}(U)}$ for every open set $U$.

2. **Composition.** If $W \subseteq V \subseteq U$, then $\operatorname{res}_{U,W} = \operatorname{res}_{V,W} \circ \operatorname{res}_{U,V}$.

A presheaf is simply a contravariant functor from the category of open sets of $X$ to the category of sets. But presheaves alone are too permissive. The sheaf axioms add two crucial constraints.

## The sheaf axioms

Let $\{U_i\}_{i \in I}$ be an open cover of an open set $U$, so that $U = \bigcup_{i \in I} U_i$. A presheaf $\mathcal{F}$ is a **sheaf** if it satisfies:

### Locality (or separation)

If $s, t \in \mathcal{F}(U)$ are two sections over $U$ such that

$$\operatorname{res}_{U, U_i}(s) = \operatorname{res}_{U, U_i}(t) \quad \text{for all } i \in I,$$

then $s = t$.

In other words: a section is determined by its local behaviour. If two global sections agree on every piece of a cover, they are the same section.

### Gluing

If we have a family of local sections $s_i \in \mathcal{F}(U_i)$ that agree on overlaps,

$$\operatorname{res}_{U_i, U_i \cap U_j}(s_i) = \operatorname{res}_{U_j, U_i \cap U_j}(s_j) \quad \text{for all } i, j \in I,$$

then there exists a section $s \in \mathcal{F}(U)$ such that $\operatorname{res}_{U, U_i}(s) = s_i$ for all $i$.

In other words: compatible local data can always be assembled into global data.

## An example: continuous functions

The prototypical sheaf is the sheaf of continuous real-valued functions on a topological space $X$. For each open set $U$, let $\mathcal{F}(U) = C(U, \mathbb{R})$, the set of continuous functions $U \to \mathbb{R}$. Restriction maps are literal restriction of functions to subsets.

**Locality** holds because a function is determined by its values at each point. **Gluing** holds because continuous functions defined on overlapping open sets, which agree on the overlaps, can be patched together into a single continuous function on the union.

## An instructive non-example

The presheaf of *bounded* continuous functions fails the gluing axiom. On each bounded open interval $U_i \subset \mathbb{R}$, the function $f(x) = x$ is bounded. These local sections agree on overlaps. But the glued function $f(x) = x$ on all of $\mathbb{R}$ is unbounded. The local data is compatible, but the global section does not live in the presheaf. Boundedness is a global property that local consistency cannot guarantee.

## Why it matters

The sheaf axioms encode a specific philosophical claim: that global structure should be determined by local information plus consistency conditions. When this works, we gain powerful machinery. When it fails — when local coherence does not guarantee global existence — we learn something important about the geometry or logic of the space involved. The obstructions to gluing are often where the most interesting mathematics lives.
