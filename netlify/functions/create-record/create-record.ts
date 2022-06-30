import { Handler } from "@netlify/functions";
import { buildClient } from "@datocms/cma-client-node";

const client = buildClient({
  apiToken: process.env.DATOCMS_API_TOKEN || "",
});

export const handler: Handler = async (event) => {
  const { customerName, orderId, toteId } = JSON.parse(event.body);

  try {
    await client.items.create({
      item_type: {
        type: "item_type",
        id: process.env.DATOCMS_TOTE_MODEL_ID || "",
      },
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
