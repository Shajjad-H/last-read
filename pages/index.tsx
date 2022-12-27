import { useState, useEffect } from 'react';
import Subject from '../components/Subject';
import database, { SubjectI } from '../database';

export default function Home() {
  let [subjects, setSubjects] = useState<SubjectI[]>([]);
  const [subject, changeSubject] = useState('');

  useEffect(() => {
    setSubjects(database.all());
  }, []);

  function addNewSubject() {
    if (subject.length < 1) return;
    const subs = database.append(subjects, subject);
    changeSubject('');
    setSubjects(subs);
  }

  const remove = (name: string) => {
    if (!confirm('remove ' + name)) return;
    database.remove(subjects, name);
    window.location.href =  '/';

  }

  function reViewed(subject: SubjectI) {

    if (!confirm(`${subject.name} will be reinitialized !`)) return;

    let updated = subjects.map(sub => {
      if (sub.name != subject.name) return sub;

      sub.last_read = Date.now();
      return sub;
    });

    const subs = database.save(updated);
    setSubjects(subs);

  }


  return (
    <div className="container w-full">
      <div className="overflow-auto w-full" style={{height: '80vh'}}>
        {subjects.map((sub, i) => <Subject subject={sub} remove={(name: string) => remove(name)} reViewed={reViewed} key={i} />)}
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <div className='flex flex-col'>
          <div className='flex w-full mb-2'>
            <input className='input w-full input-bordered' onChange={(e) => changeSubject(e.target.value)} placeholder='new subject...' value={subject} />
          </div>
          <div className='flex w-full'>
            <button className='btn btn-primary flex w-full' onClick={addNewSubject}>Add New Subject</button>
          </div>
        </div>
      </div>
    </div>
  );
}
