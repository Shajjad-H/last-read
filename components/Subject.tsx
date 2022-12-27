import { useEffect, useState } from 'react';
import { SubjectI } from '../database';

interface SubjectPropos {
    subject: SubjectI;
    remove: Function;
    reViewed: Function;
}


export default function Subject({ subject, remove, reViewed }: SubjectPropos) {

    let [time, setTime] = useState(showLastVisited(subject));

    useEffect(() => {
        setInterval(() => {
            setTime(showLastVisited(subject));
        }, 1000 * 60 * 30);
    }, []);

    function msToTime(ms: number) {
        let d, h, m, s;
        s = Math.floor(ms / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;

        let time = '';
        if (d > 0) time = `${d} Days`;
        if (h > 0) time = `${time} ${h} Hours`;
        // if (m > 0) time = `${time} ${m} Minutes`;
        // if (s > 0) time = `${time} ${s} Seconds`;

        return time;
    }

    function showLastVisited(subject: SubjectI) {
        let elapsedTime = Date.now() - subject.last_read;

        return msToTime(elapsedTime);
    }

    return (
        <div className='card card-compact shadow-xl w-full'>
            <div className="card-body">
                <div className="flex">
                    <div className='card-title basis-4/6'>
                        <div className="badge badge-primary">{subject.name}</div>
                    </div>
                    <div className='basis-2/6 grid grid-cols-2 gap-4 justify-items-end'>
                        <div>
                            <button className='btn btn-square' onClick={() => remove(subject.name)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div>
                            <button className='btn btn-square' onClick={() => reViewed(subject)}>👁️</button>
                        </div>
                    </div>
                </div>
                <div className='flex'>
                    <div className='pr-5 basis-4/6'>
                        <p>Vu: {time}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}