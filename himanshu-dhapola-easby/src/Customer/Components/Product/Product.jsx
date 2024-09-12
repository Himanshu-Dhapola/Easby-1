import ProductCard from "./ProductCard";
import PageNav from "../Navigation/PageNav";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";

export default function Product() {
  const { products } = useSelector((state) => state.product);

  return (
    <div className="bg-smoke font-Poppins min-h-screen">
      <PageNav />
      <div>
        <main className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 mt-6">
            <h1 className="md:text-4xl md:text-left text-center text-2xl uppercase font-bold tracking-tight text-gray-900 text-color">
              Product Catalog
            </h1>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            {products.length === 0 ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <p className="text-2xl uppercase font-semibold text-gray-600">
                  No Product Found.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-y-10">
                <div className="lg:col-span-3 w-full">
                  <div className="flex flex-wrap justify-center bg-smoke py-5">
                    {products &&
                      products.map((item, index) => (
                        <ProductCard product={item} key={index} />
                      ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
