# Playwright Practice

## Description

This repository contains an automation project using Playwright as framework and Typescript for the https://magento.softwaretestingboard.com website.

## Getting Started

### Prerequisites
- Node.js
- Playwright

### Installation
 Clone the repository
```bash
git clone https://github.com/matiastartara/playwright-practice.git
  ```
Navigate to the project directory
```bash
cd playwright-practice
  ```
Install dependencies
```bash
npm install
  ```
  
Usage

## How to run all the tests from comand line
To run tests using the Playwright UI mode, use:
````shell
npx playwright test --ui
````

## How to run one test from comand line
````shell
npx playwright test login.spec.ts --project='chromium'
````

## Report
To open the HTML report you should execute:
````shell
npx playwright show-report
````
