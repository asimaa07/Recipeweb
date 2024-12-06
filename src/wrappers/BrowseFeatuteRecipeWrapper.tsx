import { Swiper, SwiperSlide } from "swiper/react";
import FeatureRecipeCard from "../components/FeatureRecipeCard";
import { Recipe } from "../types/type";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function BrowseFeatureRecipeWrapper() {

    const[recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        axios.get(`http://127.0.0.1:8000/api/recipes`)
        .then(response => {
            setRecipes(response.data.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false)
        });
    },[]);
    return(
        <section id="MadeByPeople">
            <div className="flex items-center justify-between px-5">
            <h2 className="font-bold">Made by People</h2>
            <a
                href="#"
                className="font-semibold text-sm leading-[21px] text-[#FF4C1C]"
            >
                Explore All
            </a>
            </div>
            <div className="swiper w-full mt-3">
            <Swiper
                    className="swiper w-full mt-3"
                    direction='horizontal'
                    spaceBetween={16} 
                    slidesPerView="auto"
                    slidesOffsetBefore={20}
                    slidesOffsetAfter={20}
                >
                {recipes.map((recipe) => (
                    <SwiperSlide key={recipe.id} className="swiper-slide !w-fit">
                        <Link to={`/recipe/${recipe.slug}`}>
                    <FeatureRecipeCard recipe={recipe}/>
                        </Link>
                    </SwiperSlide>
                ))}
                
                </Swiper>
            </div>
  </section>
    )
}
