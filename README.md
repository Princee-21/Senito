<div align="center">

# ✦ SENTIO

### Feedback → Insight → Action → Improvement

**A modern platform for collecting, understanding, and acting on feedback**

<br/>

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)

<br/>

> **"Feedback should lead somewhere."**

</div>

---

# ✦ Overview

**Sentio** is a modern **Survey, Rating & Feedback Management Platform** designed to help organizations collect feedback, understand what people are saying, identify recurring issues, take corrective action, and measure improvement.

Most survey applications follow a straightforward process:

> **Create → Collect → View Results**

Sentio extends this process by treating submitted feedback as the **beginning of the feedback journey rather than the end**.

The platform brings together **survey creation, response collection, feedback analysis, issue identification, action tracking, analytics, and improvement measurement** within a single application.

> **Feedback should lead somewhere.**

---

## ✦ The Sentio Approach

Sentio is built around five connected stages:

| Stage | Purpose |
|---|---|
| **01 — Collect** | Create and distribute surveys using multiple question types, public links, and QR codes. |
| **02 — Understand** | Examine ratings, written responses, sentiment, topics, and feedback trends. |
| **03 — Detect** | Identify recurring issues, patterns, and areas that require attention. |
| **04 — Act** | Assign actions, track progress, and manage issue resolution. |
| **05 — Measure** | Compare results over time and evaluate the impact of actions taken. |

This creates a continuous feedback-management process rather than a one-time survey workflow.

---

## ✦ What Makes Sentio Different?

A traditional survey platform may stop after displaying the results.

Sentio continues beyond the response:

> **Response → Insight → Issue → Action → Improvement**

For example, repeated feedback about long waiting times can be recognized as a recurring issue rather than remaining as individual comments. That issue can then be tracked, assigned for action, monitored through its lifecycle, and evaluated against future feedback.

The goal is to connect what people **say** with what an organization **does**.

---

# ✦ Core Platform Capabilities

## 📝 Survey Builder

Create customized surveys using a flexible collection of question types:

- Star Rating
- Numeric Rating
- Emoji / Mood Rating
- Net Promoter Score (NPS)
- Likert Scale
- Multiple Choice
- Checkbox
- Yes / No
- Short Text
- Long Text
- Dropdown

Survey creators can configure questions, reorder content, mark questions as required, preview surveys, save drafts, and publish completed surveys.

---

## 📱 Public Survey Experience

Published surveys can be distributed through public links and QR codes.

The respondent experience is designed for:

- Desktop
- Tablet
- Mobile devices

The public survey interface supports features such as:

- Required-field validation
- Progress tracking
- Multiple question types
- Anonymous responses
- Conditional questions
- Response confirmation

---

## 🔗 QR Code Sharing

Each published survey can be shared through a generated QR code.

Users can:

- Display the QR code
- Download the QR code
- Copy the public survey link
- Share the survey

This makes Sentio suitable for environments such as restaurants, events, retail locations, classrooms, clinics, and service counters.

---

## 🧠 Feedback Intelligence

Sentio includes an intelligence layer for interpreting submitted feedback.

It can help identify:

- Positive sentiment
- Neutral sentiment
- Negative sentiment
- Recurring topics
- Common feedback themes
- Potential problem areas

This helps transform collections of responses into more understandable feedback signals.

---

## 🚨 Issue Radar

**Issue Radar** focuses on recurring problems identified within feedback.

Issues can be organized using:

- Severity
- Status
- Category
- Mention frequency
- Trends
- Responsible owner
- Resolution progress

Issues can move through different stages such as:

**New → Under Review → In Progress → Action Taken → Resolved**

---

## ⚡ Action & Improvement Tracking

Identified issues can be connected to actions and assigned to responsible users.

Actions can be:

- Created
- Assigned
- Updated
- Completed
- Tracked through their lifecycle

Feedback can then be reviewed over time to evaluate whether the situation improved.

This connects:

> **Feedback → Issue → Action → Outcome**

---

## 📊 Analytics & Feedback Pulse

Sentio provides an analytical environment for understanding feedback performance.

Key metrics include:

- Total responses
- Average rating
- Sentiment distribution
- Response trends
- Rating distribution
- Category performance
- Open issues
- Resolved issues
- Improvement trends

**Feedback Pulse** provides a high-level view of the current feedback environment and helps users quickly identify areas that may require attention.

---

## 🔐 Audit & Organization Management

Sentio also includes supporting management functionality such as:

- Activity and audit logging
- Organization settings
- User preferences
- Notification settings
- Time-zone configuration
- Appearance customization

These features support the application as a complete feedback-management platform rather than simply a survey form.

---

# ✦ Designed for Different Use Cases

Sentio is intentionally designed as a **general-purpose feedback platform** rather than being limited to a particular organization or industry.

| Use Case | Example |
|---|---|
| 🏢 **Business** | Customer and service feedback |
| 🍽️ **Restaurants** | Food, service, waiting time, and dining experience |
| 🏨 **Hospitality** | Guest experience, facilities, and service quality |
| 🎓 **Education** | Course, instructor, and learning experience evaluation |
| 🎟️ **Events** | Attendee, speaker, and event experience feedback |
| 🛍️ **Retail & E-commerce** | Product, purchasing, and delivery experience |
| 💻 **SaaS & Products** | Product feedback and recurring user issues |
| 👥 **Employees** | Workplace and internal process feedback |
| 🏥 **Services** | Service quality and customer experience |

---

# ✦ Application Architecture

Sentio follows a modular, component-based frontend architecture.

```text
Sentio
│
├── Landing Experience
│
├── Authentication
│
├── Dashboard
│   ├── Overview
│   ├── Analytics
│   ├── Issue Radar
│   ├── Improvement Tracker
│   └── Audit Log
│
├── Survey Management
│   ├── Survey Builder
│   ├── Templates
│   ├── Preview
│   └── Publishing
│
├── Public Survey
│   ├── Survey Runner
│   ├── Validation
│   └── Response Submission
│
├── Sharing
│   ├── QR Code
│   └── Public Link
│
├── Intelligence
│   ├── Sentiment
│   ├── Topics
│   └── Feedback Insights
│
└── Settings
    ├── Organization
    ├── Preferences
    └── Notifications
