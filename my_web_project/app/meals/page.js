import getMeals from '@/lib/meals';
import Image from 'next/image';
import { Suspense } from 'react';

const MealsList = async () => {
    const meals = await getMeals();
    return (
        <>
            {meals.map(meal => (
                <div key={meal.id}>
                    <Image 
                        src={meal.image} 
                        alt={meal.title} 
                        width={500} 
                        height={300} 
                    />
                    <p>{meal.summary}</p>
                </div>
            ))}
        </>
    );
};

export default function MealsPage() {
    return (
    <>
        <div>
            <p>여기에 식사 관련 정보를 표시합니다.</p>
            <Suspense fallback={<h1>Loading...</h1>}>
                <MealsList />
            </Suspense>
        </div>
    </>
    );
    
}
