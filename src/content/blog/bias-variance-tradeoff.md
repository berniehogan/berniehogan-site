---
title: "The Bias-Variance Tradeoff: Diagram and Proof"
date: 2026-02-27
description: "A visual and formal treatment of why prediction error decomposes into bias, variance, and irreducible noise."
tags: ["math", "claude-authored"]
---

The bias-variance tradeoff is one of the central results in statistical learning theory. It tells us that prediction error can be decomposed into three terms — and that reducing one typically increases another. Here we state the decomposition, illustrate it, and work through the proof.

## The picture

<img src="/images/blog/bias-variance-tradeoff.svg" alt="Bias-variance tradeoff diagram showing total error as a U-shaped curve decomposed into decreasing bias squared, increasing variance, and constant irreducible error, with an optimal complexity point marked" style="max-width: 100%; height: auto;" />

As model complexity increases, bias falls (the model can represent more structure) while variance rises (the model becomes more sensitive to the particular training data). Total error is minimised at the point where these competing pressures balance.

## Setup

Suppose we are predicting a target variable $y$ from input $x$, where the true relationship is

$$y = f(x) + \epsilon,$$

with $\mathbb{E}[\epsilon] = 0$ and $\operatorname{Var}(\epsilon) = \sigma^2$. The noise $\epsilon$ is independent of $x$.

We train a model $\hat{f}(x)$ on a dataset $D$ drawn from the joint distribution of $(x, y)$. Since $D$ is random, $\hat{f}$ is itself a random variable. We want to characterise the expected prediction error at a fixed point $x$:

$$\operatorname{MSE}(x) = \mathbb{E}_D\!\left[(y - \hat{f}(x))^2\right].$$

The expectation is over both the randomness in $D$ (which determines $\hat{f}$) and the noise $\epsilon$ in $y$.

## The decomposition

**Theorem.** The mean squared error decomposes as

$$\mathbb{E}_D\!\left[(y - \hat{f}(x))^2\right] = \operatorname{Bias}\!\left[\hat{f}(x)\right]^2 + \operatorname{Var}_D\!\left[\hat{f}(x)\right] + \sigma^2,$$

where

$$\operatorname{Bias}\!\left[\hat{f}(x)\right] = \mathbb{E}_D\!\left[\hat{f}(x)\right] - f(x)$$

is the systematic error of the model, and $\operatorname{Var}_D[\hat{f}(x)]$ measures how much the model's prediction fluctuates across different training sets.

## Proof

We begin by introducing the quantity $\mathbb{E}_D[\hat{f}(x)]$, which we abbreviate as $\bar{f}(x)$. This is the average prediction of the model across all possible training sets.

**Step 1.** Substitute $y = f(x) + \epsilon$ and expand.

$$\mathbb{E}\!\left[(y - \hat{f})^2\right] = \mathbb{E}\!\left[(f + \epsilon - \hat{f})^2\right].$$

We suppress the argument $x$ for readability. Now add and subtract $\bar{f}$:

$$= \mathbb{E}\!\left[\bigl((f - \bar{f}) + (\bar{f} - \hat{f}) + \epsilon\bigr)^2\right].$$

**Step 2.** Expand the square. Writing $a = f - \bar{f}$, $b = \bar{f} - \hat{f}$, and $c = \epsilon$:

$$(a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2ac + 2bc.$$

Take expectations term by term.

**Step 3.** Evaluate each term.

- $\mathbb{E}[a^2] = (f - \bar{f})^2 = \operatorname{Bias}[\hat{f}]^2$, since $a$ is a constant (no randomness).

- $\mathbb{E}[b^2] = \mathbb{E}[(\bar{f} - \hat{f})^2] = \operatorname{Var}_D[\hat{f}]$, by definition of variance (since $\mathbb{E}[\hat{f}] = \bar{f}$).

- $\mathbb{E}[c^2] = \mathbb{E}[\epsilon^2] = \sigma^2$, since $\mathbb{E}[\epsilon] = 0$.

**Step 4.** Show that all cross terms vanish.

- $\mathbb{E}[2ab] = 2(f - \bar{f})\,\mathbb{E}[\bar{f} - \hat{f}] = 2(f - \bar{f})(0) = 0$, since $\mathbb{E}[\hat{f}] = \bar{f}$.

- $\mathbb{E}[2ac] = 2(f - \bar{f})\,\mathbb{E}[\epsilon] = 0$, since $\mathbb{E}[\epsilon] = 0$.

- $\mathbb{E}[2bc] = 2\,\mathbb{E}[(\bar{f} - \hat{f})\,\epsilon] = 2\,\mathbb{E}[\bar{f} - \hat{f}]\,\mathbb{E}[\epsilon] = 0$, since $\epsilon$ is independent of $D$ (and hence of $\hat{f}$), and both factors have zero mean.

**Step 5.** Collect the surviving terms:

$$\mathbb{E}\!\left[(y - \hat{f})^2\right] = \operatorname{Bias}[\hat{f}]^2 + \operatorname{Var}_D[\hat{f}] + \sigma^2. \qquad \blacksquare$$

## Interpretation

The three terms play distinct roles:

- **Bias$^2$** measures how far the model's average prediction is from the truth. High bias means the model class is too restrictive to capture $f$. This is *underfitting*.

- **Variance** measures how much the prediction changes when trained on different data. High variance means the model is too sensitive to the particular sample. This is *overfitting*.

- **$\sigma^2$** is the irreducible error — noise inherent in the data-generating process. No model can eliminate it.

The tradeoff arises because the tools that reduce bias (more flexible models, more parameters) typically increase variance, and vice versa. The proof makes precise what the diagram shows: total error is the sum of these three quantities, and minimising it requires balancing the first two.

## References

The bias-variance decomposition originates in Geman, S., Bienenstock, E., & Doursat, R. (1992). Neural networks and the bias/variance dilemma. *Neural Computation*, 4(1), 1–58. The proof presented here follows the standard textbook treatment found in Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.), Section 7.3. A more accessible presentation appears in James, G., Witten, D., Hastie, T., & Tibshirani, R. (2013). *An Introduction to Statistical Learning*, Section 2.2.
