"use server";

import Joi from "joi";

export const contactAction = async (
  prevState: { message: string },
  formData: FormData
) => {
  // Validate Inputs
  const validationObj = Joi.object({
    fullName: Joi.string().trim().min(5).required(),
    email: Joi.string().email(),
    phone: Joi.string()
      .pattern(/^(?:\+?[1-9]{1,5})?\d{10,14}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Phone number must be a valid phone number with no space",
      }),
    helpwith: Joi.string().required(),
    message: Joi.string().required(),
  });

  const { value, error } = validationObj.validate({
    email: formData.get("email"),
    phone: formData.get("phone"),
    fullName: formData.get("fullName"),
    helpwith: formData.get("helpwith"),
    message: formData.get("message"),
  });

  if (error) {
    return {
      message: error.message,
    };
  }

  // Create graphql mutation and send request
  const graphqlMutation = {
    query: `
      mutation {
        newContact(contactInput: {email:"${value.email}", 
        phone:"${value.phone}", fullName:"${value.fullName}", 
        helpwith:"${value.helpwith}", message:"${value.message}"}) {
                email
            }	
        }
    `,
  };

  const postDataRes = await fetch(
    `${process.env.KHEMSHIELD_BASE_URL}/graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlMutation),
    }
  );

  const postData = await postDataRes.json();

  if (postData.errors) {
    return {
      message: postData.errors[0].message,
    };
  }

  return {
    message: "ok",
  };
};
