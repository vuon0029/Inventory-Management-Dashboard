# Inventory Management Dashboard

A React + TypeScript inventory dashboard built for a technical take-home challenge. The app fetches mock data from the JSONPlaceholder Todos API, maps the first 30 records into a local product schema, and allows users to add, search, sort, and paginate inventory products.

## Live Demo

Github Pages

## Features

- Fetches initial data from `https://jsonplaceholder.typicode.com/todos`
- Uses only the first 30 API records for the local inventory dataset
- Maps API `title` values into local product names called `productName`
- Displays products in an HTML table
- Filters products by `productName` in real time
- Sorts products by `productName` in ascending or descending order
- Applies table processing in the required order: filter -> sort -> paginate
- Supports client-side pagination
- Allows users to add new products through a controlled HTML Form
- Validates product name and quantity fields
- Shows inline validation errors for invalid fields
- Keeps the Save button disabled until the form has been modified and all fields are valid
- Includes loading, error, and empty-result states

## Tech Stack

- React
- TypeScript
- Vite
- CSS Modules
- Native Fetch API

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```txt
src/
  api/
    inventoryApi.ts
  components/
    Form/
      ProductForm.tsx
      ProductForm.module.css
    Pagination/
      Pagination.tsx
      Pagination.module.css
    ProductTable/
      ProductTable.tsx
      ProductTable.module.css
    SearchBar/
      SearchBar.tsx
      SearchBar.module.css
  helpers/
    validation.ts
  types/
    product.ts
  App.tsx
  App.css
  index.css
```

## Architecture and Optimization

This project uses a small component-based React structure with TypeScript. API fetching and mapping are kept in `inventoryApi.ts`, shared types are kept in `types`, validation is kept in a helper, and UI pieces such as the Form, Search bar, Product table, and Pagination are split into focused components. The main `App` component owns the dashboard state and derives the displayed rows in the required order: filter, sort, then paginate. I used `useMemo` to avoid recalculating processed table rows unnecessarily, `useCallback` for stable event handlers, and reset pagination after search or sort changes so the table stays in a valid state. I also added small UI optimizations such as a fixed table area to reduce layout shift, reserved form error space, readable local IDs for new products, and colocated CSS Modules to keep styling simple and maintainable for a small component-driven app.
