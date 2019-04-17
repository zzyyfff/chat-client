# Chat Client

An online chat app, letting you have realtime conversations with other users.

+ Client site: https://zzyyfff.github.io/chat-client
+ Client repo: https://github.com/zzyyfff/chat-client
+ Server site: https://sheltered-lowlands-84372.herokuapp.com/
+ Server repo: https://github.com/zzyyfff/chat-api

## Technologies used

+ React (including Hooks)
+ React Router
+ Javascript
+ Axios
+ AJAX/RESTful architecture
+ HTML/CSS/SCSS
+ Bootstrap

## Getting involved

Interested in playing with the code or contributing? Read on.

#### Prerequisites

+ You will likely want to set up the [Chat API](https://github.com/zzyyfff/chat-api). See further installation instructions on its repo: https://github.com/zzyyfff/chat-api
+ Any text editor will do. I use [Atom](https://atom.io/), which makes development easier.

#### Setup Environment:
1.  Fork and clone the respository locally
1.  Replace the "homepage" field in `package.json` with your (public) Github account name and repository name.
1.  Install dependencies with `npm install`.
1.  `git add` and `git commit` your changes.
1.  The development server can run with `npm start`
1.  For deployment, you should first make sure you are on the master branch with a clean working directory, then you can run npm run deploy and wait to see if it runs successfully

## Planning and Development

This project is born out of the Software Engineering Immersive course at General Assembly Boston (formerly the WDI, Web Development Immersive) and is the server side of my first React-based web app project.

#### My Process

1. Consider and brainstorm on the mission and goals of the project, based on the project requirements.
2. Perform user research; talking to potential users about what they would look for in a chat app and what they would need or want from it.
3. List out the functionality of an [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) and separately bucket future functionality that would not be part of the [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product).
4. Draw up wireframes and settle on an initial interface design goal. The final interface will change through user testing and redesign. (*See Wireframe below*)
5. Create user stories
6. Prioritize user stories, putting the ones with the most dependents first
7. Create an ERD
7. Implement a back-end API with Ruby/Rails/PostgreSQL
8. Create the basic layout of UI elements in HTML/CSS/SASS/Bootstrap/Handlebars, using semantic tags when possible and only enough styling to meet [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) layout needs.
9. Connnect front-end elements to the back-end API.
10. Test, troubleshoot, debug, refactor, and confirm working deployment.
11. If there is enough time, begin work on stretch goal features and test them in deployment
12. Fill in README.md
13. Once all base functionality is established, apply aesthetic style

## First draft Wireframe

![img_9561](https://media.git.generalassemb.ly/user/18598/files/f778d800-5f5d-11e9-9118-51f0a706f537)

## Some Sample User Stories
+ As a user, I want to sign up for an account.
+ As a user, I want to sign in with my account.
+ As a user, I want to create a new conversation.
+ As a user, I want to join an existing conversation.
+ As a user, I want to view all the conversations I'm part of.
+ As a user, I want to send messages to a conversation.
+ As a user, I want to receive messages from a conversation.
+ As a user, I want to sign out.
+ As a user, I want to change my password.

## Problem Solving Strategy

When a functional element doesn't work as exepcted, my strategy is to break down the element into smaller parts, testing to make sure each is functioning as expected. In Javascript, this might involve using `console.log` and also testing functionality via curl scripts. In all situations, I carefully follow the logical sequence of events and make sure I understand what is going on.

When I've exhausted my own ability to debug a situation, I begin formulating how I would communicate this problem to others. I search online for similar issues and educate myself about the technologies and surrounding issues.

Finally, if an answer hasn't been found, I create a showcase of the problem, including example code, the steps to reproduce the problem, and what I've attempted so far, and I use this to ask for help from colleagues and the community of programers.

## Unsolved Problems & Future Direction

+ Allowing users to search for other users to chat with.
+ Implement websockets to facilitate realtime features, like being able to see what your chat partner is typing, if desired.
+ Be able to share rich media in a chat, other than just text.
+ Be able to share your location in a chat.
+ Push notifications for when the user is offline.

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact jonathan.marcus@gmail.com.

## Acknowledgments

Special thanks to Dr. Edward Marcus, Jennifer Meade, Caleb Pearce, Erica Salling, Ben Jenkins, Toni Langley, Jordan Allain, Naida Rosenberger, GA WDI-30, and everyone at General Assembly Boston.
