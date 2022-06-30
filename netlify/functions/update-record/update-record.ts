import { Handler } from "@netlify/functions";
import { buildClient } from "@datocms/cma-client-node";

const client = buildClient({
  apiToken: process.env.DATOCMS_API_TOKEN || "",
});

export const handler: Handler = async (event) => {
  const { customerName, orderId, toteId } = JSON.parse(event.body);

  try {
    const existingRecords = await client.items.list({
      filter: {
        type: "tote",
        fields: {
          tote_id: {
            eq: toteId,
          },
        },
      },
    });

    await client.items.update(existingRecords[0].id, {
      customer_name: customerName,
      order_id: orderId,
      tote_id: toteId,
    });

    return {
      statusCode: 200,
    };
  } catch (error) {
    return {
      statusCode: error.response.status,
    };
  }
};
