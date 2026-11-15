---
title: PPO – Continuous Control with Reinforcement Learning
subtitle: Training agents with Proximal Policy Optimization across classic continuous-control benchmarks.
description: Implementation and experiments with PPO agents on Pendulum, BipedalWalker, and LunarLanderContinuous environments, including training results, episode gifs, and algorithm insights.
published: 2024-05-15
tags: [Reinforcement Learning, PPO, Continuous Control]
category: Projects
author: Marc Monfort
sourceLink: "https://github.com/marcmonfort/ppo-continuous-control"
cover: "/posts/2024-05-05-ppo-continuous-control/LunarLanderContinuous-v2.gif"
coverPosition: center
draft: false
---

# PPO – Continuous Control with Reinforcement Learning

This project explores **Proximal Policy Optimization (PPO)**, a reinforcement learning algorithm known for its stability and strong empirical performance on continuous control tasks.  
We implemented PPO from scratch and trained agents on three environments: **Pendulum-v1**, **BipedalWalker-v3**, and **LunarLanderContinuous-v2**.  

---

## 🔍 What is PPO?

PPO is a **policy-gradient method** designed to improve stability in training by avoiding overly large policy updates.  
The key idea is to clip the objective function, ensuring updates don’t move the policy too far from the old one:

$$
L^{CLIP}(\theta) = \mathbb{E}_t \Big[ \min \big( r_t(\theta)\hat{A}_t, \; \text{clip}(r_t(\theta), 1-\epsilon, 1+\epsilon)\hat{A}_t \big) \Big]
$$

Where:

- $r_t(\theta)$ = probability ratio between new and old policy  
- $\hat{A}_t$ = advantage estimate (how much better an action is compared to baseline)  
- $\epsilon$ = clipping threshold (commonly 0.1–0.3)  

This **clipping trick** stabilizes learning, making PPO robust across a wide range of tasks without excessive hyperparameter tuning.


---

## 🌀 Environments and Results

### Pendulum-v1
Balance a pendulum upright by applying torque.  
Goal: minimize swing and keep the pendulum near vertical.

**Training Curve**
![Pendulum-v1 Training Graph](/posts/2024-05-05-ppo-continuous-control/Pendulum-v1.png)

**Learned Behavior**
![Pendulum-v1](/posts/2024-05-05-ppo-continuous-control/Pendulum-v1.gif)

---

### BipedalWalker-v3
Control a bipedal robot to walk across rough terrain.  
Goal: maximize forward progress, avoid falling, and minimize energy use.

**Training Curve**
![BipedalWalker-v3 Training Graph](/posts/2024-05-05-ppo-continuous-control/BipedalWalker-v3.png)

**Learned Behavior**
<video src="/posts/2024-05-05-ppo-continuous-control/BipedalWalker-v3.mp4" autoplay loop muted playsinline aria-label="BipedalWalker-v3" style="max-width:100%;height:auto;"></video>

---

### LunarLanderContinuous-v2
Land a lunar module on a target pad with continuous thrust control.  
Goal: achieve a smooth landing with minimum fuel and without crashing.

**Training Curve**
![LunarLanderContinuous-v2 Training Graph](/posts/2024-05-05-ppo-continuous-control/LunarLanderContinuous-v2.png)

**Learned Behavior**
![LunarLanderContinuous-v2 Episode 0](/posts/2024-05-05-ppo-continuous-control/LunarLanderContinuous-v2.gif)

---

## 🧠 Technical Insights

- **Architecture**: We used fully-connected networks with ReLU activations for both actor and critic.  
- **Advantage Estimation**: Generalized Advantage Estimator (GAE) to reduce variance.  
- **Entropy Bonus**: Encourages exploration by penalizing deterministic policies.  
- **Training Regime**: Each update processes multiple epochs of minibatch data from trajectories.  

Together, these elements make PPO sample-efficient and stable—even in noisy continuous-control environments.

---

## 📌 Conclusions

Across all three environments, the PPO agent demonstrated **robust learning** and converged to stable policies:

- **Pendulum**: Achieved stable upright control.  
- **BipedalWalker**: Learned efficient walking gaits after thousands of episodes.  
- **LunarLander**: Managed controlled landings with reduced crashes.  

While results show the strength of PPO, further improvements could come from **hyperparameter tuning**, **different network architectures**, and **longer training horizons**.

---

## 📂 Resources

- [Source Code on GitHub](https://github.com/marcmonfort/ppo-continuous-control)  
- Environments: OpenAI Gym (`Pendulum-v1`, `BipedalWalker-v3`, `LunarLanderContinuous-v2`)  

---

<div style="text-align:center; font-size:1.1em; font-weight:600;">
🚀 PPO remains one of the most reliable baselines in reinforcement learning — a balance of theory, stability, and practical success.
</div>
