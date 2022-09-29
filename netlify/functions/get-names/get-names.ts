import { Handler } from "@netlify/functions";
const contentful = require("contentful-management");

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_API_TOKEN,
});

export const handler: Handler = async (event) => {
  let nameRecords;
  try {
    nameRecords = await client
      .getSpace(process.env.CONTENTFUL_SPACE_ID)
      .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT))
      .then((environment) => environment.getEntries({ limit: 1000 }))
      .then((response) => {
        const names = [];
        console.log(response.items.length);
        response.items.forEach((item) => {
          const name = item.fields.customerName["en-US"];
          console.log(name);
          if (name && name !== "" && !names.includes(name)) {
            names.push(name);
          }
        });
        return names;
      });
    return {
      statusCode: 200,
      body: JSON.stringify({
        names: nameRecords,
      }),
    };
  } catch (error) {
    return {
      statusCode: JSON.parse(error.message).status,
    };
  }
};
