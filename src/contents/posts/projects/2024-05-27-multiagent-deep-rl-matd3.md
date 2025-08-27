---
title: Cooperative Multi-Agent Deep RL with MATD3
subtitle: Comparing Independent Learners and Fully Observable Critic using Multi-Agent Twin Delayed DDPG
description: Technical exploration of cooperative multi-agent deep reinforcement learning with MATD3, tested in PettingZoo's Simple Spread and Simple Speaker Listener environments. Includes algorithm pseudocode, actor-critic diagrams, training GIFs, and experimental results.
published: 2024-05-27
tags: [Reinforcement Learning, Multi-Agent Systems]
category: Projects
cover: /posts/2024-05-27-multiagent-deep-rl-matd3/simple_spread_MATD3-2.gif
coverPosition: center
draft: false
author: Marc Monfort
sourceLink: "https://github.com/marcmonfort/SOAS-MADRL"
---

# Cooperative Multi-Agent Deep RL with MATD3

This project explores **cooperative multi-agent reinforcement learning (MARL)** using the **Multi-Agent Twin Delayed Deep Deterministic Policy Gradient (MATD3)** algorithm.  
The goal was to compare two learning strategies:

- **Independent Learners** – each agent learns with only its local observations/rewards.
- **Fully Observable Critic** – agents share a central critic with access to the global state.

The experiments were conducted in the **Simple Spread** and **Simple Speaker Listener** environments from the [PettingZoo MPE suite](https://pettingzoo.farama.org/).

<div style="display:flex;justify-content:center;">
  <img src="/posts/2024-05-27-multiagent-deep-rl-matd3/simple_spread_MATD3-2.gif" alt="Simple Spread environment with MATD3 agents" style="width:100%;max-width:700px;border-radius:8px;" />
</div>

---

## Simulation Environments

### Simple Spread
- **3 agents, 3 landmarks**
- Agents must spread to cover all landmarks while avoiding collisions.  
- Reward = global coverage (distance to landmarks) – collision penalties.

### Simple Speaker Listener
- **2 agents: one speaker, one listener**  
- The speaker sees the goal landmark but cannot move.  
- The listener moves but does not see the goal—it relies on the speaker’s communication.

---

## MATD3 Algorithm

MATD3 extends **TD3** to multi-agent settings with:

- **Actor-Critic architecture** (separate networks for policy and value estimation).
- **Double Critics** to mitigate Q-value overestimation.
- **Target Networks + Delayed Policy Updates** for training stability.
- **Action Noise** for better exploration.

### MATD3 Pseudocode

<div style="display:flex;justify-content:center;">
  <img src="/posts/2024-05-27-multiagent-deep-rl-matd3/results/matd3-code.png" alt="MATD3 pseudocode" style="width:100%;max-width:800px;border-radius:8px;" />
</div>

### Actor-Critic Diagram

<div style="display:flex;justify-content:center;flex-wrap:wrap;gap:10px;">
  <img src="/posts/2024-05-27-multiagent-deep-rl-matd3/results/actor-critic-diagram.png" alt="MATD3 Actor-Critic Diagram" style="width:100%;max-width:500px;border-radius:8px;" />
</div>

---

## Independent Learners vs Fully Observable Critic

- **Independent Learners**  
  Each agent has its own critic, based only on its **local observations**.  
  - Pros: scalable, decentralized.  
  - Cons: less coordination.

- **Fully Observable Critic**  
  A centralized critic sees the **entire environment state** and all agent actions.  
  - Pros: better coordination and performance.  
  - Cons: slower training, heavier computation.

---

## Experimental Setup

- **Framework:** [AgileRL](https://docs.agilerl.com)  
- **Training episodes:** 6000  
- **Optimization:** Evolutionary Hyperparameter Search  
- **Metrics:** episodic reward, learning stability, task completion

<div style="display:flex;justify-content:center;">
  <img src="/posts/2024-05-27-multiagent-deep-rl-matd3/results/speaker_MATD3_hyperparameter_evolution_v2.png" alt="Hyperparameter optimization in Speaker-Listener environment" style="width:100%;max-width:800px;border-radius:8px;" />
</div>

---

## Results

### Simple Spread

<div style="display:flex;flex-wrap:wrap;gap:20px;justify-content:center;">

  <div style="flex:1;min-width:280px;text-align:center;">
    <p><strong>Independent Learners – Training Curve</strong></p>
    <img src="/posts/2024-05-27-multiagent-deep-rl-matd3/results/spread_independent_MATD3_training_progress_v2.png" alt="Training curve Independent Learners in Spread" style="width:100%;border-radius:8px;" />
    <p><strong>Independent Learners – Learned Behavior</strong></p>
    <img src="/posts/2024-05-27-multiagent-deep-rl-matd3/simple_spread_independent_MATD3.gif" alt="Independent Learners in Simple Spread" style="width:100%;border-radius:8px;margin-top:8px;" />
  </div>

  <div style="flex:1;min-width:280px;text-align:center;">
    <p><strong>Fully Observable Critic – Training Curve</strong></p>
    <img src="/posts/2024-05-27-multiagent-deep-rl-matd3/results/spread_MATD3_training_progress_v2.png" alt="Training curve Fully Observable Critic in Spread" style="width:100%;border-radius:8px;" />
    <p><strong>Fully Observable Critic – Learned Behavior</strong></p>
    <img src="/posts/2024-05-27-multiagent-deep-rl-matd3/simple_spread_MATD3.gif" alt="Fully Observable Critic in Simple Spread" style="width:100%;border-radius:8px;margin-top:8px;" />
  </div>

</div>

---

### Simple Speaker Listener

<div style="display:flex;flex-wrap:wrap;gap:20px;justify-content:center;">

  <div style="flex:1;min-width:280px;text-align:center;">
    <p><strong>Independent Learners – Training Curve</strong></p>
    <img src="/posts/2024-05-27-multiagent-deep-rl-matd3/results/speaker_independent_MATD3_training_progress_v2.png" alt="Training curve Independent Learners in Speaker Listener" style="width:100%;border-radius:8px;" />
    <p><strong>Independent Learners – Learned Behavior</strong></p>
    <img src="/posts/2024-05-27-multiagent-deep-rl-matd3/simple_speaker_listener_independent_MATD3.gif" alt="Independent Learners in Simple Speaker Listener" style="width:100%;border-radius:8px;margin-top:8px;" />
  </div>

  <div style="flex:1;min-width:280px;text-align:center;">
    <p><strong>Fully Observable Critic – Training Curve</strong></p>
    <img src="/posts/2024-05-27-multiagent-deep-rl-matd3/results/speaker_MATD3_training_progress_v2.png" alt="Training curve Fully Observable Critic in Speaker Listener" style="width:100%;border-radius:8px;" />
    <p><strong>Fully Observable Critic – Learned Behavior</strong></p>
    <img src="/posts/2024-05-27-multiagent-deep-rl-matd3/simple_speaker_listener_MATD3.gif" alt="Fully Observable Critic in Simple Speaker Listener" style="width:100%;border-radius:8px;margin-top:8px;" />
  </div>

</div>


---

### Final Rewards

| Environment             | Independent Learners | Fully Observable Critic |
|--------------------------|----------------------|--------------------------|
| Simple Spread            | -48.83              | **-41.05**              |
| Simple Speaker Listener  | -53.12              | **-35.55**              |

---

## Conclusions

- The **Fully Observable Critic** consistently outperformed Independent Learners in both environments, but required longer training time.  
- **Independent Learners** trained faster, but showed higher variance and weaker coordination.  

This project highlights the **trade-off between decentralized efficiency and centralized performance** in cooperative MARL.

---

## Repository

👉 Source code and experiments: [SOAS-MADRL on GitHub](https://github.com/marcmonfort/SOAS-MADRL)

