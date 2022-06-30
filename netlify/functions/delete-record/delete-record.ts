import { Handler } from "@netlify/functions";
import { buildClient } from "@datocms/cma-client-node";

const client = buildClient({
  apiToken: process.env.DATOCMS_API_TOKEN || "",
});

export const handler: Handler = async (event) => {
  const { id } = JSON.parse(event.body);

  try {
    await client.items.destroy(id);
    return {
      statusCode: 200,
    };
  } catch (error) {
    return {
      statusCode: error.response.status,
    };
  }
};
