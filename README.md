# Smart Laptop Monitor

A real-time laptop monitoring dashboard built using C++, HTML, CSS, JavaScript, and Chart.js. The project tracks system performance metrics such as CPU usage, RAM usage, temperature, battery status, internet connectivity, and overall system health through an interactive dashboard.

---

## Features

### Real-Time Monitoring

* CPU Usage Tracking
* RAM Usage Tracking
* Temperature Monitoring
* Battery Monitoring
* Internet Status Detection
* System Status Updates

### Interactive Dashboard

* Live CPU Usage Graph
* Live RAM Usage Graph
* Battery Pie Chart
* Dynamic Progress Bars
* Live Status Indicator

### Smart Health Analysis

* System Health Score Calculation
* Health Status Classification

  * Excellent
  * Good
  * Average
  * Critical
* Live Alert System

### Alerts

* High CPU Usage Detection
* High RAM Usage Detection
* High Temperature Detection
* System Stability Notifications

### User Settings

* Dark Mode Support
* Light Mode Support
* Auto Refresh Toggle
* Custom Refresh Intervals

### Logs Section

* Monitoring Logs
* System Activity Tracking

---

## Tech Stack

### Backend Monitoring Agent

* C++

### Frontend

* HTML5
* CSS3
* JavaScript

### Visualization

* Chart.js

### Data Exchange

* JSON

---

## Project Structure

Smart Laptop Monitor

├── index.html

├── setting.html

├── style.css

├── script.js

├── setting.js

├── agents/

│ ├── monitor.cpp

│ ├── monitor.exe

│ └── stats.json

└── assets/

---

## How It Works

1. C++ Agent collects system statistics.
2. Data is stored in stats.json.
3. Dashboard fetches the latest data.
4. Charts and progress bars update automatically.
5. Health score and alerts are generated in real time.

---

## System Health Logic

The dashboard calculates a health score based on:

* CPU Usage
* RAM Usage
* Temperature
* Battery Level

Health Categories:

* 90-100 → Excellent
* 70-89 → Good
* 50-69 → Average
* Below 50 → Critical

---

## Getting Started

### Clone Repository

git clone <https://github.com/semanirudh94-lang/Smart-Laptop-Monitor.git>

### Run Monitoring Agent

 Click on the start.bat file and the c++ program will automatically complie

### Open Dashboard

Open index.html in your browser.

### Enable Auto Refresh

Use the Settings page to configure refresh intervals.

---

## Future Improvements

* Start Monitoring Button
* One Click Startup (.bat)
* Agent Status Indicator
* AWS Deployment
* Custom Domain Hosting
* REST API Integration using Node.js
* Database Storage
* Multi-System Monitoring
* Docker Support

---

## Learning Outcomes

This project helped in learning:

* C++ File Handling
* JSON Data Exchange
* DOM Manipulation
* Chart.js Visualization
* Real-Time Dashboard Development
* Settings Management
* Theme Persistence
* Basic System Monitoring Concepts
* DevOps Deployment Preparation

---

## Author

Piyush Semalti
Aspiring Software Engineer | DSA | DevOps | Open Source Contributor
