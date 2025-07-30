---
title:  Federated Learning for TinyML Devices
published: 2025-07-30
description: TinyML Federated Learning project, covering its hardware implementation on microcontrollers, adaptive training techniques, and insights from peer-reviewed publications and open-source code releases.
tags: [Research, TinyML, Federated Learning, IoT, Publications]
category: Research
licenseName: "CC BY 4.0"
author: Marc Monfort
draft: false
cover: "/posts/tinyml-fl-cover.png"
---

# Federated Learning for TinyML Devices

Over the past few years I have focused on **privacy-preserving, energy-efficient AI** for resource-constrained IoT devices—publishing papers, building hardware demos, and open-sourcing code.  
Below you’ll find the highlights, starting with a deep dive into our MDPI Electronics article.


> **Papers:**  
> *Electronics* 11(4): 573, 2022 [[Open Access]](https://doi.org/10.3390/electronics11040573)  
> *ACM SenSys ’21 Poster* [[DOI]](https://dl.acm.org/doi/abs/10.1145/3462203.3475896)


### Motivation  
Typical TinyML workflows train models offline on powerful GPUs, then deploy quantized versions for inference only. We asked: **what if training itself could run on-device—collaboratively and privately—via Federated Learning (FL)?**

### Prototype Hardware  

<figure markdown="1">
<img src="https://www.mdpi.com/electronics/electronics-11-00573/article_deploy/html/images/electronics-11-00573-g001.png" alt="Figure 1 – Three Arduino Nano 33 BLE Sense boards wired for federated keyword-spotting experiments" width="100%">
<figcaption><strong>Figure 1.</strong> Triple-board setup: each Arduino Nano 33 BLE Sense acts as an FL client, connected via USB to a Python FL server. Buttons trigger local recording / training rounds.</figcaption>
</figure>

### Contributions  
* **First fully on-device FL demo on 64-kB microcontrollers**—no simulated nodes.  
* **Design-space exploration** of FL round frequency vs. bandwidth, memory, and convergence.  
* **Open, reproducible dataset & code** for keyword-spotting on Arduino hardware.   

### Experimental Highlights  
| Parameter                | Value(s) tested | Insight |
|--------------------------|-----------------|---------|
| FL round interval        | 5 – 50 epochs   | Faster rounds ↓ loss sooner but ↑ UART traffic / wall time |
| Hidden-layer size        | 16 – 64 nodes   | 25–32 nodes best trade-off between RAM (<64 kB) and accuracy |
| Learning rate / momentum | 0.4–0.8 / 0.5   | LR 0.6 with momentum 0.5 converged quickest for KWS |

Even with **≤65 kB** model footprints, the global model achieved **92 % accuracy** on user-recorded keywords after just 10 FL rounds—demonstrating that *practical on-device training* is within reach for low-power IoT deployments.

---

## Lightweight FL Framework for Heterogeneous IoT (SenSys 2021)

**Venue:** ACM SenSys ’21 Poster Session  
We proposed a compression-aware aggregation scheme that slashed uplink bytes by ×3 while matching FedAvg accuracy—paving the way for FL across mixed  802.15.4 / Wi-Fi sensor networks.

---

## TinyML-FederatedLearning GitHub Repo

**Code:** <https://github.com/marcmonfort/TinyML-FederatedLearning>  
The repo contains:

* Arduino/Nano client firmware (TensorFlow Lite-Micro + serial FL layer)  
* Python-based FL server & monitoring scripts  
* Step-by-step tutorial to reproduce the Electronics paper results on off-the-shelf boards

---

### Closing Thoughts

These projects collectively push the envelope of **edge autonomy**—showing that even 64 kB MCUs can *learn* in the field while keeping raw data local. Next steps include:

1. Evaluating non-IID data splits in larger fleets  
2. Integrating LoRaWAN transport for truly untethered FL  
3. Exploring on-device differential privacy to harden the pipeline

Looking forward to building on this foundation and collaborating with the community!

