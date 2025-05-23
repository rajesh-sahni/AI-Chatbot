# My AI Chatbot Project

Hey there! This is a little AI Chatbot I built using React. It's a **responsive web app**, designed to be pretty flexible, especially with how it handles different kinds of requests you type in. The cool abilities you'll find were added as **bonus features** to enhance the chat experience.

## Live Demo

Check out the live demo: [AI Chatbot](https://ai-chatbot-git-main-rajesh-kumars-projects-59faa1d9.vercel.app)

## Cool Stuff It Can Do (Bonus Features Added!)

- **Easily Add New Abilities:** Think of it like plugins! You can drop in new functionalities without messing up the core chat.
- **Makes Messages Look Nice:** It understands and shows messages using Markdown, so you get cool formatting like **bold**, _italics_, code blocks, and lists in your messages.
- **Shows You What's Happening:** You'll see indicators when it's thinking or if something went wrong.
- **Tries to Understand Natural Talk:** You don't always have to use exact commands. Type things like "what's the weather..." or "calculate...", and it tries to figure out what you want.
- **Looks Like It's Typing:** Adds a little visual touch while you wait for a response.

## Getting It Running On Your Machine

Here's how you can get this chat project going on your computer:

1.  **Grab the code:**

    ```bash
    # If you're getting this from a repo
    git clone <repository_url>
    cd AI-Chatbot # Make sure you are in the project folder
    ```

2.  **Install all the pieces it needs:**

    ```bash
    npm install
    ```

3.  **Set up the weather bit:**
    The weather feature needs a key from OpenWeatherMap. It's free and pretty quick to get one from [https://openweathermap.org/api](https://openweathermap.org/api).

    - Once you have your key, create a file named `.env` right in the main project folder.
    - Put this line inside it, but swap `your_openweathermap_api_key_here` with the key you got:
      ```env
      REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key_here
      ```

4.  **Start the chat!**
    ```bash
    npm start
    ```
    It should pop open in your web browser, usually at `http://localhost:3000`.

## How It Knows What You Mean (Architecture & Logic)

The cool part is how the chatbot figures out what you want it to do.

- **Plugins:** Each specific task (like getting weather or defining a word) is handled by its own "plugin". These plugins know how to do their job and how to format the result for the chat.
- **Listening to You (Natural Language Processing):** There's a piece of code that looks at what you type. It uses patterns to see if you're asking for weather, a calculation, a definition, or just sending a regular message. If it spots a command buried in your natural sentence, it pulls out the important bits (like the city name or the word to define).
- **Putting It Together:** When you send a message, the main chat part first asks the "Natural Language Processing" if it understands it as a command. If yes, it finds the right "plugin" and tells it to run using the info extracted from your message. The plugin does its thing and gives back the result, which then gets shown in the chat. If your message isn't a command, it just shows up as plain text.

## What Features (Plugins) Are Built-in?

Here are the features ready to go when you start the app:

1.  **Weather:**

    - You can type `/weather London` or ask naturally like "what's the weather in Paris?"
    - It talks to the [OpenWeatherMap API](https://openweathermap.org/api) to get the current weather info.

2.  **Calculator:**

    - Use `/calc 5 * 10` or ask "calculate 15 + 20".
    - It can handle basic math expressions you give it.

3.  **Dictionary:**
    - Try `/define happiness` or "what is the definition of AI".
    - It looks up word definitions using the [Free Dictionary API](https://dictionaryapi.dev/).

---

That's pretty much it! Hope you have fun playing around with the chatbot.
