import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { ManageProducts } from "./pages/ManageProducts";
import { CreateProduct } from "./pages/CreateProduct";
import { UpdateProduct } from "./pages/UpdateProduct";
import { ShowProducts } from "./pages/ShowProducts";
import { ManageOrders } from "./pages/ManageOrders";
import { UpdateOrderStatus } from "./pages/UpdateOrderStatus";
import { OrderDetails } from "./pages/OrderDetails";
import { UpdateOrderItem } from "./pages/UpdateOrderItem";
import { ManageCustomers } from "./pages/ManageCustomers";
import { UpdateCustomer } from "./pages/UpdateCustomer";
import { CreateCustomer } from "./pages/CreateCustomer";
import { ProductDetails } from "./pages/ProductDetails";
import { AdminLayout } from "./pages/AdminLayout";
import { CartPage } from "./pages/CartPage";
import { Checkout } from "./pages/Checkout";
import { OrderConfirmation } from "./pages/OrderConfirmation";
import { SearchResults } from "./pages/SearchResults";

export const router = createBrowserRouter( [
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/products",
                element: <ShowProducts />
            },
            {
               path: "/product/:id",
               element: <ProductDetails />
           },
           {
            path: "/cart-page",
            element: <CartPage />
           },
           {
            path: "/checkout",
            element: <Checkout />
           },
           {
            path: "/order-confirmation",
            element: <OrderConfirmation />
           },
           {path: "/search-results/:searchText",
            element: <SearchResults />

           }
         
         ] },
            {
                path: "/admin",
                element: <AdminLayout />,
                errorElement: <NotFound />,
                children: [

               {
                  path: "/admin",
                  element: <ManageProducts />
               },
               {
                  path: "/admin/products",
                  element: <ManageProducts />
               },
             {
                path: "/admin/create-product",
                element: <CreateProduct />
             },
             {
                path: "/admin/update-product/:id",
                element: <UpdateProduct />
             },
             {
                path: "/admin/orders",
                element: <ManageOrders />
             },
             {
                path: "/admin/update-order-status/:id",
                element: <UpdateOrderStatus />
             },
             {
                path: "/admin/detailed-order/:id",
                element: <OrderDetails />
             },
             {
                path: "/admin/update-order-item/:id/:quantity/:product_name",
                element: <UpdateOrderItem />

             },
             {
               path: "/admin/customers",
               element: <ManageCustomers />
             },
             {
               path: "/admin/update-customer/:id",
               element: <UpdateCustomer />
             },
             {
               path: "/admin/create-customer",
               element: <CreateCustomer />
             }
             
                
        ]
    }
])