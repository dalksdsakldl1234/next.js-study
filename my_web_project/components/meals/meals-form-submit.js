'use client';

import {useFormStatus} from 'react-dom';

export default function MealsFormSubmit() {
    const {pending} = useFormStatus();
    
    // form이 제출중이면 true 
    return (
        <button disabled={pending}>
            {pending ? 'submitting...' : 'share mea;'}
        </button>
    )

}