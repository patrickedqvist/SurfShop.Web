import * as yup from 'yup'

export const newOrderSchema = yup.object().shape({
  orderAmount: yup.number().required(),
  orderTaxAmount: yup.number().required(),
  orderLines: yup
    .array()
    .of(
      yup.object().shape({
        reference: yup.string().required(),
        name: yup.string().required(),
        quantity: yup.string().required(),
        unitPrice: yup.number().required(),
        taxRate: yup.number().required(),
        totalAmount: yup.number().required(),
        totalTaxAmount: yup.number().required(),
        totalDiscountAmount: yup.number(),
      })
    )
    .required(),
  billingAddress: yup
    .object()
    .shape({
      givenName: yup.string().required(),
      familyName: yup.string().required(),
      email: yup.string().required(),
      postalCode: yup.string().required(),
      city: yup.string().required(),
      phone: yup.string().required(),
      country: yup.string().required(),
    })
    .required(),
})
