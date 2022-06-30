import { Handler } from "@netlify/functions";
import { buildClient } from "@datocms/cma-client-node";

const client = buildClient({
  apiToken: process.env.DATOCMS_API_TOKEN || "",
});

export const handler: Handler = async (event) => {
  const { toteId } = JSON.parse(event.body);

  try {
    const records = await client.items.list({
      filter: {
        type: "tote",
        fields: {
          tote_id: {
            eq: toteId,
          },
        },
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        records: records,
      }),
    };
  } catch (error) {
    return {
      statusCode: error.response.status,
    };
  }
};
