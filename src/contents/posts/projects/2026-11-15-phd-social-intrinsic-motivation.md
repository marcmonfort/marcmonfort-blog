---
title: "My PhD: Social Intrinsic Motivation for Multi-Agent RL"
subtitle: Why artificial agents might need social drives of their own, and what I'm building at Aalto University.
description: An introduction to my PhD research at Aalto University on social intrinsic motivation for multi-agent reinforcement learning, aiming at artificial agents that are more reliable, proactive and trustworthy.
published: 2026-11-15
tags: [Reinforcement Learning, Multi-Agent Systems, Intrinsic Motivation, Social AI]
category: Research
author: Marc Monfort
# TODO: add a cover image (1200×630) at public/posts/2026-11-15-phd-social-intrinsic-motivation/cover.webp
# cover: /posts/2026-11-15-phd-social-intrinsic-motivation/cover.webp
# DRAFT: only visible with `pnpm dev`. Set to false when the TODO sections are written.
draft: true
---

<!--
  Writing notes (not rendered):
  - Sections marked TODO need your own content; everything else is background
    you can keep, trim or rewrite.
  - Background references were checked against Crossref and arXiv.
  - Aim for ~800–1200 words in total; the reader is a curious engineer or
    researcher outside your exact subfield.
-->

# My PhD: Social Intrinsic Motivation for Multi-Agent RL

In January 2026 I started a PhD at [Aalto University](https://www.aalto.fi/en) in Finland. After four years building HPC infrastructure at the Barcelona Supercomputing Center, I'm now working full-time on a question from multi-agent AI: **how do we build agents that behave well around others, not just agents that maximise a score?**
<!-- TODO: rewrite this opening in your own voice: why this topic, why now. -->

My research is on **social intrinsic motivation** for multi-agent reinforcement learning. This post explains what that means, why I think it matters, and what I'm working on.

## Rewards are not enough

In reinforcement learning (RL), an agent learns by trial and error to maximise a reward that we, the designers, define: points in a game, distance walked, packages delivered. This works remarkably well when the reward captures exactly what we want. In practice it rarely does:

- **Sparse rewards** give the agent almost no signal to learn from.
- **Misspecified rewards** get exploited: the agent finds a shortcut that scores well but isn't what we meant.
- **Fixed rewards** don't transfer: an agent trained for one task has no reason to do anything useful outside it.

## Intrinsic motivation: rewards from within

Psychology distinguishes *extrinsic* motivation, doing something for an external reward, from *intrinsic* motivation, doing something because it is inherently interesting or satisfying ([Ryan & Deci, 2000](https://doi.org/10.1006/ceps.1999.1020)). Children explore, play and practise skills long before anyone rewards them for it.

Computational intrinsic motivation brings this idea to artificial agents: alongside (or instead of) the task reward, the agent gets an internal reward computed from its own experience ([Oudeyer & Kaplan, 2007](https://doi.org/10.3389/neuro.12.006.2007)). Two well-known examples:

- **Curiosity:** reward the agent for visiting situations it can't yet predict well, which drives exploration even without any external reward ([Pathak et al., 2017](https://arxiv.org/abs/1705.05363)).
- **Empowerment:** reward the agent for reaching states where it has many options and its actions have a strong, predictable influence on its surroundings ([Klyubin, Polani & Nehaniv, 2005](https://doi.org/10.1109/cec.2005.1554676)).

These drives are *task-agnostic*: they don't say what to do, but they give the agent a reason to do *something* sensible when the task reward is silent.

## Making it social

Most intrinsic motivations are self-centred: they are about the agent's own knowledge or control. But many of the situations we care about involve other agents, human or artificial. **Social intrinsic motivation** asks what internal drives would make an agent pay attention to others, coordinate with them or support them.

Some existing work points in this direction:

- **Social influence:** in multi-agent RL, rewarding agents for having a causal influence on other agents' actions led to more coordination and emergent communication ([Jaques et al., 2019](https://arxiv.org/abs/1810.08647)).
- **Coupled empowerment:** a game companion character that maximises not only its own empowerment but also the player's, and is careful not to reduce it, can behave in supportive, believable ways without a hand-written script ([Guckelsberger, Salge & Colton, 2016](https://doi.org/10.1109/cig.2016.7860406)).

<!-- TODO: check this framing matches how your group talks about it. -->
The common thread is that being "social" doesn't have to be programmed task by task. It can emerge from general drives that take other agents into account.

## Why it matters: reliable, proactive, trustworthy agents

<!-- TODO: expand in your own words. Why do these three properties follow from social intrinsic motivation? Concrete examples help (e.g. an assistant that notices you're stuck, a robot that avoids limiting a human's options). -->

- **Reliable:** ...
- **Proactive:** ...
- **Trustworthy:** ...

## What I'm working on

<!-- TODO: the core of the post, which only you can write. Suggested structure:
  1. The specific research question(s) of your PhD, in one or two sentences each.
  2. Your approach: which formalism (empowerment, information theory, ...), which environments (e.g. PettingZoo, games), which algorithms.
  3. What you've built or found so far, even if preliminary. A figure or GIF helps a lot.
  4. Who you work with: your supervisor and research group, with links.
-->

## Open questions

<!-- TODO: 3–5 questions you find most exciting or that your PhD tries to answer. For example: how to measure "social" behaviour, how these drives scale beyond a few agents, how they interact with a task reward, how humans perceive the resulting agents. Keep only the ones you actually work on. -->

## What's next

<!-- TODO: a short closing paragraph: what you'll post about next, and an invitation to get in touch if someone works on related topics. -->

---

*References*

- Ryan, R. M., & Deci, E. L. (2000). Intrinsic and Extrinsic Motivations: Classic Definitions and New Directions. *Contemporary Educational Psychology*. [doi:10.1006/ceps.1999.1020](https://doi.org/10.1006/ceps.1999.1020)
- Klyubin, A. S., Polani, D., & Nehaniv, C. L. (2005). Empowerment: A Universal Agent-Centric Measure of Control. *IEEE Congress on Evolutionary Computation*. [doi:10.1109/cec.2005.1554676](https://doi.org/10.1109/cec.2005.1554676)
- Oudeyer, P.-Y., & Kaplan, F. (2007). What is Intrinsic Motivation? A Typology of Computational Approaches. *Frontiers in Neurorobotics*. [doi:10.3389/neuro.12.006.2007](https://doi.org/10.3389/neuro.12.006.2007)
- Guckelsberger, C., Salge, C., & Colton, S. (2016). Intrinsically Motivated General Companion NPCs via Coupled Empowerment Maximisation. *IEEE Conference on Computational Intelligence and Games*. [doi:10.1109/cig.2016.7860406](https://doi.org/10.1109/cig.2016.7860406)
- Pathak, D., Agrawal, P., Efros, A. A., & Darrell, T. (2017). Curiosity-driven Exploration by Self-supervised Prediction. *ICML*. [arXiv:1705.05363](https://arxiv.org/abs/1705.05363)
- Jaques, N., Lazaridou, A., Hughes, E., et al. (2019). Social Influence as Intrinsic Motivation for Multi-Agent Deep Reinforcement Learning. *ICML*. [arXiv:1810.08647](https://arxiv.org/abs/1810.08647)
