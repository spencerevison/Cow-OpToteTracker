import { Handler } from "@netlify/functions";
const contentful = require("contentful-management");

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_API_TOKEN,
});

export const handler: Handler = async (event) => {
  const { customerName, orderId, toteId } = JSON.parse(event.body);

  try {
    await client
      .getSpace(process.env.CONTENTFUL_SPACE_ID)
      .then((space) => space.getEnvironment("master"))
      .then((environment) => environment.getEntry(toteId))
      .then((entry) => {
        entry.fields.customerName["en-US"] = customerName;
        entry.fields.orderId["en-US"] = orderId;
        return entry.update();
      });
    return {
      statusCode: 200,
    };
  } catch (error: any) {
    return {
      statusCode: JSON.parse(error.message).status,
    };
  }
};
