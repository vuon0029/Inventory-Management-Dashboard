import React from "react";
import styles from "./ProductForm.module.css";

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
  const [successMessage, setSuccessMessage] = React.useState("");

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
    setDirtyFields({});
    setSuccessMessage("Product added successfully.");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Add Product</h2>

      <div className={styles.fields}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="productName">
            Product Name
          </label>
          <input
            className={styles.input}
            id="productName"
            name="productName"
            type="text"
            value={values.productName}
            onChange={handleChange}
          />

          <p className={styles.error} role="alert">
            {dirtyFields.productName && errors.productName
              ? errors.productName
              : "\u00A0"}
          </p>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="quantity">
            Quantity
          </label>
          <input
            className={styles.input}
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            value={values.quantity}
            onChange={handleChange}
          />

          <p className={styles.error} role="alert">
            {dirtyFields.quantity && errors.quantity
              ? errors.quantity
              : "\u00A0"}
          </p>
        </div>
      </div>

      <div className={styles.fields}>
        <p className={styles.success} role="status">
          {successMessage.length > 0 ? successMessage : "\u00A0"}
        </p>

        <button
          className={styles.submitButton}
          type="submit"
          disabled={isSaveDisabled}
        >
          Save
        </button>
      </div>
    </form>
  );
}
