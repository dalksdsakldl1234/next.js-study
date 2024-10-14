import slugify from 'slugify';
import xss from 'xss';

import fs from 'node:fs'

const sql = require('better-sqlite3');
const db = sql('meals.db');

export default async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve,2000));
    return db.prepare('SELECT * FROM meals').all(); // run은 db에서 실행, all은 데이터 모든행 fetch할때 
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE title = Fresh Tomato Salad').get();
    
}

// form 입력을 html에 띄우는 작업에서 xss 공격 방지
export async function saveMeal(meal) {
    // slug 생성
    meal.slug = slugify(meal.title, {lower:true});
    meal.instructions = xss(meal.instructions);

    // 파일은 데이터베이스에 저장하는것이 좋지 않으므로 images폴더에 저장하고 해당 값은 이미지가 있는 경로로 덮어씀
    const extension = meal.image.split('.').pop();
    const fileName = '${meal.slug}.${extension}';

    const stream = fs.createWriteStream('public/images/${fileName}');
    const bufferedImage = await meal.image.arrayBuffer(); // 프로미스를 반환하므로 await 사용
    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error) {
            throw new Error('saving file failed');
        }
    });
    
    // 배포환경에서는 next=>cache에 캐싱된 이미자만 불러오므로 문제 => AWS S3이용
    meal.image = 'images/${fileNmae}' // 자동적으로 이미지 처리는 public으로 보내짐

    // 안되잖아 ...
    db.prepare("INSERT INTO meals (slug, title, image, summary,instructions,creator,creator_email) VALUES (@meal.slug, @meal.title, @meal.image, @meal.summary, @meal.instructions, @meal.creator, @meal.creator_email)"
    ).run(meal)
}
