<p  align="center"><img  width="128"  height="128"  src="https://i.imgur.com/KeiYRhv.png"/></p>

<h1  align="center">NoCaptcha: CAPTCHA Solver for Busy People</h1>

## Description

NoCaptcha is a browser extension which helps you to solve difficult captchas by completing reCAPTCHA audio challenges utilizing speech recognition technologies without wasting time trying to decipher complicated CAPTCHAs. Breeze through online forms and logins without the frustration of trying to prove you're not a robot.

Challenges are solved by clicking on the extension button at the bottom of the reCAPTCHA widget.

> The difficulty of captchas can be so out of balance, that sometimes they seem friendlier to bots than they are to humans.
>  — <cite>[Joy Buolamwini](https://en.wikipedia.org/wiki/Joy_Buolamwini) , founder [Algorithmic Justice League](https://en.wikipedia.org/wiki/Algorithmic_Justice_League),</cite>


## Motivation

Short for <b> Completely Automated Public Turing Test to tell Computers and Humans Apart</b>, CAPTCHA has long been the standard tool used by various websites to prevent automated spam from polluting the Internet by requiring (in theory) a human being to interact with content in some way before allowing access or a task to successfully be completed.

CAPTCHA systems, which are designed to distinguish human users from automated bots, have a number of potential biases that can impact their effectiveness and user experience. Some of the main biases of current CAPTCHA systems include:

-   **Accessibility**: Some CAPTCHA systems, such as those that rely on visual or audio cues, may not be accessible to users with visual or auditory impairments.
    
-   **Language:** CAPTCHAs that rely on text-based prompts may be difficult for users who are not fluent in the language used in the CAPTCHA.
    
-   **Literacy**: CAPTCHAs that rely on text-based prompts may also be difficult for users with low literacy levels or who are not familiar with the type of text used in the CAPTCHA, such as distorted or stylized text.
    
-   **Cultural bias:** CAPTCHAs that rely on images or text may be biased towards certain cultures or regions, making them difficult for users from other cultures or regions to solve.
    
-   **Age**: CAPTCHAs that rely on visual or auditory cues may be difficult for older adults to solve, due to age-related declines in visual and auditory acuity.

reCAPTCHA challenges remain a considerable burden on the web, delaying and often blocking our access to services and information depending on our physical and cognitive abilities, our social and cultural background, and the devices or networks we connect from.

The goal of this project is to improve the overall User Experience on the web, by giving us easy access to solutions utilized by automated systems.

It's worth noting that as the technology progresses, bots can also improve and adapt to solve some of the aforementioned CAPTCHA types, so it's important for CAPTCHA system to be regularly updated and improved to stay ahead of bots.


## Demo

https://user-images.githubusercontent.com/65364356/213935747-656a60f9-27b9-4ddc-8c2f-d9b7c55e84f8.mp4

## How to use


First, you need to install dependencies using `pnpm`

```bash
npm i -g pnpm // ignore if you already have pnpm on your local machine

pnpm i
```

### 🔥🔥🔥 Build the project:

```bash
pnpm build:* // * specifying the intended browser or run

pnpm build:all // to build the extension for all major browsers
```

### 🔥🔥🔥 Loading the extension in the browser:

- To install a Chrome extension folder from your PC, open the Chrome browser.
- Navigate to the "More Tools" menu. 
- Select "Extensions" from the menu.
- Click the "Load Unpacked" button. 
- Select the extension folder from the ```dist``` directory generated from build from your PC.
- Click "Open" to install the extension.


## License


Copyright (c) 2023 Ezra Adeyinka
  

This software is released under the terms of the GNU General Public License v3.0.


