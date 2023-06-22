import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Customer } from "./components/Customers";
import { Product } from "./components/Products";
import { Sale } from "./components/Sales";
import { Store } from "./components/Stores";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/Customers',
        element: <Customer />
    },
    {
        path: '/Products',
        element: <Product />
    },
    {
        path: '/Sales',
        element: <Sale />
    },
    {
        path: '/Stores',
        element: <Store />
    }
];

export default AppRoutes;
