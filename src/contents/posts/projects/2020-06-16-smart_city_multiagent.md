---
title: SmartCity Multi-Agent Simulation
subtitle: A traffic management prototype using JADE, JENA and semantic ontologies
description: Multi-agent system for smart city traffic simulation, integrating vehicles, traffic lights, and cloud agents with semantic reasoning and negotiation protocols.
published: 2020-06-16
tags: [Smart City, Multi-agent Systems, JADE, JENA, Ontology, Traffic Simulation]
category: Projects
author: Marc Monfort
sourceLink: "https://github.com/marcmonfort/SmartCity-Multiagent"
cover: "/posts/2020-06-16-smart_city_multiagent/smart_city_multiagent-2.gif"
draft: false
---

# SmartCity Multi-Agent Simulation

This project explores **multi-agent systems** for smart city traffic management.  
Using **JADE** for agent communication and **JENA** for ontology reasoning, we built a simulation of vehicles, traffic lights, and cloud-level coordination to mimic an **edge-cloud-user architecture**.

<div style="display:flex;justify-content:center;">
  <img src="/posts/2020-06-16-smart_city_multiagent/smart-city.png" alt="SmartCity multi-agent simulation environment" style="width:100%;max-width:400px;border-radius:8px;" />
</div>

---

## Overview

The case study models a **grid of city blocks** with intersections managed by **traffic light agents**.  
Key participants include:

- **Vehicle Agents** (user level): Move through streets, avoid collisions, request traffic lights to turn green.  
- **Traffic Light Agents** (edge level): Control intersections, negotiate green times with other lights.  
- **Cloud Agent** (cloud level): Mediates and coordinates between traffic lights using negotiation protocols.  
- **Environment Agent**: Maintains shared world state using a **blackboard model** for real-time updates.  

All knowledge is encoded in an **ontology**, created in Protégé, and queried via SPARQL to initialize the environment.

---

## Architecture

<div style="display:flex;justify-content:center;">
  <img src="/posts/2020-06-16-smart_city_multiagent/smart_city_multiagent.gif" alt="Simulation demo of SmartCity multi-agent system" style="width:100%;max-width:400px;border-radius:8px;" />
</div>

**Figure – Demo of the SmartCity multi-agent traffic simulation.**

### Communication & Coordination
- **Blackboard model**: Shared environment state (streets, vehicles, lights).  
- **Message Passing**: Direct FIPA-ACL message exchange between agents.  
- **Negotiation (Contract-Net protocol)**: Traffic lights negotiate switching times.  
- **Consensus**: Cloud agent enforces synchronized decisions across multiple lights.  
- **Pareto Optimality Heuristic**: Balances waiting vs. flowing vehicles when deciding switch times.  

---

## Implementation Details

- **Framework**: JADE (Java Agent DEvelopment Framework)  
- **Ontology**: Built in **Protégé**, loaded with **Apache JENA**  
- **Reasoning**: SPARQL queries to extract semantic knowledge (streets, directions, agent placement)  
- **Concurrency**: Agents run with reactive `TickerBehaviour` and negotiation behaviours (`AchieveREInitiator`, `Contract-Net`)  

---

## Example Use Case

- Streets are **one-way and single-lane**.  
- At intersections, vehicles approaching a red light **request a green phase**.  
- Traffic light agents **negotiate** via the cloud to coordinate switching.  
- Vehicles **stop** if the distance to the next car is below a threshold, simulating safety measures.  
- Yellow-light states prevent collisions during phase transitions.  

---

## Running the Simulation

From the repo folder:

```bash
cd SmartCity
make
make gui
make entorno
````

Or launch directly via the **JADE GUI**.
The environment agent will initialize all others automatically.

---

## Results & Extensions

* The system successfully models **distributed traffic light negotiation**, improving flow fairness.
* Introduced advanced concepts like **Pareto optimality** and **consensus protocols** for realistic coordination.
* Possible extensions:

  * Larger city maps
  * Integration with real IoT data streams
  * Alternative coordination strategies (e.g., reinforcement learning)

---

## Tech Stack

* **JADE** – Multi-agent system platform
* **JENA** – Ontology loading & SPARQL querying
* **Protégé** – Ontology design
* **Java** – Core implementation


> 📂 Full source code: [GitHub Repository](https://github.com/marcmonfort/SmartCity-Multiagent)
