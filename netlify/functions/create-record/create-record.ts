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
      .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT))
      .then(
        (environment) =>
          environment.createEntryWithId("tote", toteId, {
            fields: {
              customerName: {
                "en-US": customerName,
              },
              orderId: {
                "en-US": orderId,
              },
              toteId: {
                "en-US": toteId,
              },
            },
          })
        //.then((entry) => entry.publish())
      );
    return {
      statusCode: 200,
    };
  } catch (error) {
    return {
      statusCode: JSON.parse(error.message).status,
    };
  }
};
