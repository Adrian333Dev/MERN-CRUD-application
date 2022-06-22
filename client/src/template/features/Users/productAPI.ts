import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

type IProduct = {
  id: string;
  name: string;
};

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query() {
        return "products";
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Products" as const,
                id,
              })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
      // 👇 Transform the result to prevent nested data
      transformResponse: (response: { data: { products: IProduct[] } }) =>
        response.data.products,
    }),
    // 👇 Query: Get a single product
    getProduct: builder.query<IProduct, string>({
      query(id) {
        return `products/${id}`;
      },
      transformResponse: (
        response: { data: { product: IProduct } },
        args,
        meta
      ) => response.data.product,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
    // 👇 Mutation: Create a product
    createProduct: builder.mutation<IProduct, FormData>({
      query(data) {
        return {
          url: "products",
          method: "POST",
          credentials: "include",
          body: data,
        };
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
      transformResponse: (response: { data: { product: IProduct } }) =>
        response.data.product,
    }),
    // 👇 Mutation: Update Product
    updateProduct: builder.mutation<
      IProduct,
      { id: string; formData: FormData }
    >({
      query({ id, formData }) {
        return {
          url: `products/${id}`,
          method: "PATCH",
          credentials: "include",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "Products", id },
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
      transformResponse: (response: { data: { product: IProduct } }) =>
        response.data.product,
    }),
    // 👇 Mutation: Delete product
    deleteProduct: builder.mutation<null, string>({
      query(id) {
        return {
          url: `products/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  usePrefetch,
} = productApi;
