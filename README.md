# Consuma Writing Tool

A lightweight writing tool for generating Consuma copy that follows the same rulebook across every channel.

The repository includes both a hosted web application and a standalone prompt that can be used with ChatGPT, Claude, or any other capable LLM.

## Repository contents

`index.html`

The frontend application.

`api/generate.js`

The serverless API that securely proxies requests to Anthropic. Your API key is never exposed to the browser.

`prompt.txt`

The complete prompt used by the application. You can paste this directly into ChatGPT, Claude, or another LLM, then send your writing request as the next message. The prompt follows the same rulebook as the deployed website.

`head.html`

A reference page documenting inconsistencies found across various Consuma platforms.

## Option 1

### Use the hosted version

Visit the deployed website.

Enter your Anthropic API key into the API key field.

Enter the shared access code if one has been provided.

Start generating copy.

Your API key is only used to authenticate requests to Anthropic. It is stored locally in your browser and is never committed to this repository.

## Option 2

### Use the prompt directly

Open ChatGPT, Claude, or another LLM.

Copy the contents of `prompt.txt` into a new conversation.

Send it as your first message.

Then send your request in the next message.

Examples include:

* Write a LinkedIn post announcing a new report.
* Write website copy for the homepage.
* Write a job description for a Founding Designer.
* Rewrite this email in the Consuma style.
* Create careers page copy.

The prompt follows the same writing standards and rulebook used by the hosted application.

## Option 3

### Deploy your own copy

Clone the repository.

```bash
git clone https://github.com/yourusername/consuma-writing-tool.git
cd consuma-writing-tool
```

Deploy the project to Vercel using either the CLI or the Vercel dashboard.

In your Vercel project settings, create the following environment variable.

```text
ACCESS_CODE=your_shared_access_code
```

If you want your deployment to provide a default Anthropic key, you can also add:

```text
ANTHROPIC_API_KEY=your_anthropic_api_key
```

This variable is optional because users can enter their own Anthropic API key in the application.

Redeploy the project after adding environment variables.

## Notes

The writing rules are defined in `index.html`.

The deployed application and `prompt.txt` follow the same rulebook.

Every request uses the Anthropic API key supplied by the user unless a default server key has been configured.

The Anthropic API key is never hardcoded into the frontend.

The access code protects the API endpoint from unauthorized use.
