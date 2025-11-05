import { ShoppingCart, Truck, ShieldCheck, Star } from "lucide-react";
import ProductCard from "../components/ProductCard";
import HeroCarousel from "../components/HeroCarousel";
import Carousel from "../components/Carousal";
import FeaturesSection from "../components/FeaturesSection";
import { useGetProductsQuery } from "../slices/productsSlice";
import ReviewsSlider from "../components/ReviewsSlider";

function HomePage() {
  const { data, error, isLoading } = useGetProductsQuery({
    page: 8,
    limit: 3,
  });

  return (
    <div className="font-sans text-gray-800">
      <HeroCarousel></HeroCarousel>

      <section className="py-16 px-8 mt-20 mb-10">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          PRODUCTS OF THE WEEK
        </h2>

        <p className="text-center mx-auto mb-20 max-w-lg">
          Check out our top picks this week! Each product is carefully selected
          for quality and style. Don’t miss out on these limited-time favorites.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <ProductCard
            image={data?.data[0]?.images[0]?.url}
            price={data?.data[0]?.price}
            name={data?.data[0]?.name}
            link={`products/${data?.data[0]._id}`}
          />
          <ProductCard
            image={data?.data[1]?.images[0]?.url}
            price={data?.data[1]?.price}
            name={data?.data[1]?.name}
            link={`products/${data?.data[1]._id}`}
          />
          <ProductCard
            image={data?.data[2]?.images[0]?.url}
            price={data?.data[2]?.price}
            name={data?.data[2]?.name}
            link={`products/${data?.data[2]._id}`}
          />
        </div>
      </section>

      <Carousel></Carousel>

      <FeaturesSection></FeaturesSection>

      <section
        className="py-16 px-8 h-80 flex justify-around items-center text-center mb-20"
        style={{ background: "#EFEFEF" }}
      >
        <div>
          <Truck className="mx-auto mb-2" />
          <p>Free Shipping</p>
        </div>
        <div>
          <ShieldCheck className="mx-auto mb-2" />
          <p>Secure Payment</p>
        </div>
        <div>
          <Star className="mx-auto mb-2" />
          <p>Best Quality</p>
        </div>
      </section>

      <ReviewsSlider></ReviewsSlider>
    </div>
  );
}

export default HomePage;
