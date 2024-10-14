import getMeal from '@/lib/meals';
import Image from "next/image";

export default function MealsOthersPage({params}) {


    const meal = getMeal(params.mealSlug); // 그냥 slug=값 고정해도 안오는데...
    console.log(params.mealSlug);
    
    if (!meal) {
        return <p>해당 식사는 존재하지 않습니다.</p>; // meal이 없을 경우 로딩 메시지 표시
    }


    return (
        <div>
            <h1>{meal.title}</h1> {/* 식사 제목 표시 */}
            <Image src={meal.image} alt={meal.title} width={500} height={300} /> {/* 이미지 표시 */}
            <h2>Instructions</h2>
            <p>{meal.instructions}</p> {/* 조리 방법 표시 */}
        </div>
    );
}