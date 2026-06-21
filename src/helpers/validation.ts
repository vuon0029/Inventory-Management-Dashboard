export type ProductFormValues = {
  productName: string;
  quantity: string;
};

// ProductFormErrors could be "productName", "quantity" or both.
export type ProductFormErrors = Partial<
  Record<keyof ProductFormValues, string>
>;

const MIN_PRODUCT_NAME_LENGTH = 3;

export function validateProductForm(
  values: ProductFormValues,
): ProductFormErrors {
  const errors: ProductFormErrors = {};

  if (values.productName.trim().length <= MIN_PRODUCT_NAME_LENGTH) {
    errors.productName = "Product name must be longer than 3 characters.";
  }

  const quantity = Number(values.quantity);

  if (
    !values.quantity ||
    Number.isNaN(quantity) ||
    !Number.isInteger(quantity) ||
    quantity <= 0
  ) {
    errors.quantity = "Quantity must be a whole number greater than 0.";
  }

  return errors;
}
