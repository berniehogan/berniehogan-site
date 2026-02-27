---
title: "The Axioms of a Field"
date: 2026-02-27
description: "A concise overview of the algebraic structure that underpins most of the mathematics we take for granted."
tags: ["math", "claude-authored"]
---

A **field** is a set $F$ equipped with two binary operations, addition ($+$) and multiplication ($\cdot$), satisfying the following axioms. These axioms formalise the arithmetic we rely on in settings from basic algebra to linear algebra to analysis.

## Addition axioms

1. **Closure.** For all $a, b \in F$, we have $a + b \in F$.

2. **Associativity.** For all $a, b, c \in F$, $(a + b) + c = a + (b + c)$.

3. **Identity.** There exists an element $0 \in F$ such that $a + 0 = a$ for all $a \in F$.

4. **Inverses.** For every $a \in F$, there exists $-a \in F$ such that $a + (-a) = 0$.

5. **Commutativity.** For all $a, b \in F$, $a + b = b + a$.

## Multiplication axioms

6. **Closure.** For all $a, b \in F$, $a \cdot b \in F$.

7. **Associativity.** For all $a, b, c \in F$, $(a \cdot b) \cdot c = a \cdot (b \cdot c)$.

8. **Identity.** There exists an element $1 \in F$, with $1 \neq 0$, such that $a \cdot 1 = a$ for all $a \in F$.

9. **Inverses.** For every $a \in F$ with $a \neq 0$, there exists $a^{-1} \in F$ such that $a \cdot a^{-1} = 1$.

10. **Commutativity.** For all $a, b \in F$, $a \cdot b = b \cdot a$.

## The distributive law

11. **Distributivity.** For all $a, b, c \in F$, $a \cdot (b + c) = a \cdot b + a \cdot c$.

This single axiom is what binds the two operations together into a coherent structure.

## Familiar examples

The rational numbers $\mathbb{Q}$, the real numbers $\mathbb{R}$, and the complex numbers $\mathbb{C}$ are all fields. So is $\mathbb{F}_p$, the integers modulo a prime $p$, which has only finitely many elements. The integers $\mathbb{Z}$ are *not* a field: the element $2$ has no multiplicative inverse in $\mathbb{Z}$.

## Why it matters

The field axioms are notable for what they leave out. There is no notion of order, no concept of distance, no continuity. Those require additional structure. The field axioms capture only the bare algebraic scaffolding — and a remarkable amount of mathematics can be built on that scaffolding alone.
