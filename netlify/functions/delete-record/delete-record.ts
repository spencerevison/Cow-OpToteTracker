import { Handler } from "@netlify/functions";
const contentful = require("contentful-management");

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_API_TOKEN,
});

export const handler: Handler = async (event) => {
  const { toteId } = JSON.parse(event.body);

  try {
    await client
      .getSpace(process.env.CONTENTFUL_SPACE_ID)
      .then((space) => space.getEnvironment("master"))
      .then((environment) => environment.getEntry(toteId))
      .then((entry) => entry.delete());
    return {
      statusCode: 200,
    };
  } catch (error: any) {
    return {
      statusCode: JSON.parse(error.message).status,
    };
  }
};
