import { Handler } from "@netlify/functions";
const contentful = require("contentful-management");

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_API_TOKEN,
});

export const handler: Handler = async (event) => {
  const { toteId } = JSON.parse(event.body);
  let env;

  try {
    await client
      .getSpace(process.env.CONTENTFUL_SPACE_ID)
      .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT))
      .then((environment) => {
        env = environment;
        return environment.getEntry(toteId);
      })
      .then((entry) => {
        // Create archived record
        const id = `${entry.fields.toteId["en-US"]}-${
          entry.fields.orderId["en-US"]
        }-${Date.now()}`;
        env.createEntryWithId("tote", id, {
          fields: {
            customerName: {
              "en-US": entry.fields.customerName["en-US"],
            },
            orderId: {
              "en-US": entry.fields.orderId["en-US"],
            },
            toteId: {
              "en-US": entry.fields.toteId["en-US"],
            },
            archived: {
              "en-US": true,
            },
          },
        });
        //return entry.unpublish().then((entry) => entry.delete());
        return entry.delete();
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
