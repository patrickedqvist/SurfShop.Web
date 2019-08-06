import * as yup from 'yup';

export const newOrderSchema = yup.object().shape({
  order_amount: yup.number().required(),
  order_tax_amount: yup.number().required(),
  order_lines: yup.array().of(
    yup.object().shape({
      reference: yup.string().required(),
      name: yup.string().required(),
      quantity: yup.string().required(),
      unit_price: yup.number().required(),
      tax_rate: yup.number().required(),
      total_amount: yup.number().required(),
      total_tax_amount: yup.number().required(),
      total_discount_amount: yup.number(),
    })
  ).required(),
  billing_address: yup.object().shape({
    given_name: yup.string().required(),
    family_name: yup.string().required(),
    email: yup.string().required(),
    postal_code: yup.string().required(),
    city: yup.string().required(),
    phone: yup.string().required(),
    country: yup.string().required(),
  }).required()
})
