'use server' // 해당 파일의 모든 함수를 server action으로 설정

import { revalidatePath } from 'next/cache';
import saveMeal from './meals';
import {redirect} from 'next/navigation';

// event핸들러처럼 server action 생성 후 form의 action으로 설정하면 그것의 formData를 자동으로 인수로 받아온다!
  // 그 후 formData의 get함수를 이용하여 데이터를 불러올 수 있는데, input태그의 경우에는 name으로 구분된다
  // server action은 client file ('use client'가 최상단에 있는)에서는 사용할 수 없다
  
  export default async function shareMeal(formData) {
    'use server';
    
    const meal = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'), // ImagePicker => <Input> => name속성
      creator: formData.get('name'),
      creator_email: formData.get('email')
    }
    // 이미지 파일 로컬 폴더에 저장 + 데이터베이스에 insert 쿼리문 보내기
    await saveMeal(meal);
    // getMeals가 /meals페이지에 get했을떄 재실행되도록 (nested page 포함)
    // '/'는 모든 페이지 
    revalidatePath('/meals', 'layout'); 
    // 폼 제출 후 페이지 이동
    redirect('/meals');
  }


