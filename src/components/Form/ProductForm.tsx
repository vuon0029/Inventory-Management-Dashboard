import React from "react";

import type { Product } from "../../types/product";
import {
  validateProductForm,
  type ProductFormValues,
} from "../../helpers/validation";

type ProductFormProps = {
  onAddProduct: (product: Omit<Product, "id">) => void;
};

type DirtyFields = Partial<Record<keyof ProductFormValues, boolean>>;

const initialValues: ProductFormValues = {
  productName: "",
  quantity: "1",
};

export function ProductForm({ onAddProduct }: ProductFormProps) {
  const [values, setValues] = React.useState<ProductFormValues>(initialValues);
  const [dirtyFields, setDirtyFields] = React.useState<DirtyFields>({});

  const errors = React.useMemo(() => {
    return validateProductForm(values);
  }, [values]);

  const isDirty =
    values.productName !== initialValues.productName ||
    values.quantity !== initialValues.quantity;

  const isValid = Object.keys(errors).length === 0;
  const isSaveDisabled = !isDirty || !isValid;

  // dynamically set the text input values
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setDirtyFields((currentDirtyFields) => ({
      ...currentDirtyFields,
      [name]: true,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    onAddProduct({
      productName: values.productName.trim(),
      quantity: Number(values.quantity),
    });

    setValues(initialValues);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>

      <div>
        <label htmlFor="productName">Product Name</label>
        <input
          id="productName"
          name="productName"
          type="text"
          value={values.productName}
          onChange={handleChange}
        />

        {dirtyFields.productName && errors.productName && (
          <p>{errors.productName}</p>
        )}
      </div>

      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          min="1"
          value={values.quantity}
          onChange={handleChange}
        />

        {dirtyFields.quantity && errors.quantity && <p>{errors.quantity}</p>}
      </div>

      <button type="submit" disabled={isSaveDisabled}>
        Save
      </button>
    </form>
  );
}
