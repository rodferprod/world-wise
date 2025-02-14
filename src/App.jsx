import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import AppLayout from "./pages/AppLayout"
import PageNotFound from "./pages/PageNotFound"
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"

const BASE_URL = "http://localhost:8000";

const formatDate = (date) =>
    new Intl.DateTimeFormat(
        "en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }
    ).format(new Date(date));

function App() {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }

        getCities();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="login" element={<Login />} />
                <Route path="app" element={<AppLayout />}>
                    <Route index element={<CityList isLoading={isLoading} cities={cities} formatDate={formatDate} />} />
                    <Route path="cities" element={<CityList isLoading={isLoading} cities={cities} formatDate={formatDate} />} />
                    <Route path="countries" element={<CountryList isLoading={isLoading} cities={cities} />} />
                    <Route path="form" element={<p>Form</p>} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
