const { Configuration, OpenAIApi } = require("openai");

// OpenAI Create Image Completion https://platform.openai.com/docs/api-reference/images/create?lang=node.js
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const { description } = body || {};
  const response = await openai.createImage({
    prompt: `create a new pokemon with no background or text and the following description: ${description}`,
    n: 2,
    size: "1024x1024",
  });
  res.status(200).json({ image: response.data.data[0] });
}
