import CategoryItem from "./CategoryItem";
import { categoryData } from "./CategoryData";

export default function Category() {
  return (
    <div className="flex flex-col gap-4 py-10 font-Poppins">
      <div className="flex justify-center items-center">
        <h2 className="px-12 font-semibold uppercase text-lg md:text-2xl text-color">
          Categories
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-4 w-full px-10">
        {categoryData.map((item, index) => (
          <CategoryItem item={item} key={index} />
        ))}
      </div>
    </div>
  );
}
