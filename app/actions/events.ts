"use server";

import Joi from "joi";

export const eventRegisterAction = async (
  prevState: { message: string },
  formData: FormData
) => {
  // Validate Inputs
  const validationObj = Joi.object({
    email: Joi.string().email(),
    phone: Joi.string()
      .pattern(/^(?:\+?[1-9]{1,5})?\d{10,14}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Phone number must be a valid phone number with no space",
      }),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    address: Joi.string().optional(),
    state: Joi.string().optional(),
    // city: Joi.string().optional(),
    event: Joi.string().required(),
  });

  //   const fr = await fetch(
  //     `http://localhost:5000/graphql?query={events%20{%20title%20}}`
  //   );
  //   const re = await fr.json();
  //   console.log("WE are herer", fr);
  //   console.log("RERSPONSE", re);

  const { value, error } = validationObj.validate({
    email: formData.get("email"),
    phone: formData.get("phone"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    address: formData.get("address"),
    state: formData.get("state"),
    // city: formData.get("city"),
    event: "1",
  });

  if (error) {
    console.log("ERROR", error);
    return {
      message: error.message,
    };
  }

  // Create graphql mutation and send request
  const graphqlMutation = {
    query: `
      mutation {
        eventRegister(regData: {
          event: "${value.event}", email: "${value.email}",
          phone: "${value.phone}", firstName: "${value.firstName}",
          lastName: "${value.lastName}", state: "${value.state}",
          address: "${value.address}"
        }) {
          email
        }
      }
    `,
  };

  const postDataRes = await fetch(
    `${process.env.KHEMSHIELD_BASE_URL}/api/v1/graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlMutation),
    }
  );

  const postData = await postDataRes.json();

  console.log("postData graphqlMutation: ", postData);

  if (postData.errors) {
    return {
      message: postData.errors[0].message,
    };
  }

  return {
    message: "ok",
  };
};
