const store =  require('store');


export interface SubjectI {
    name: string;
    last_read: number;
}

const save = (subjects: SubjectI[]) => {
    store.set('subs', JSON.stringify(subjects));
    return subjects;
}


const append = (privious: SubjectI[], new_sub_name: string) : Array<SubjectI> => {
    let sub = {
        name: new_sub_name,
        last_read: Date.now()
    }
    
    store.set('subs', JSON.stringify([...privious, sub]));
    // sub.last_read = new Date(sub.last_read);    
    return [...privious, sub];
}

const all = (): SubjectI[] => {

    try {
        const value =  store.get('subs');

        if (value == null) return [];

        // value previously stored
        let subs = JSON.parse(value);

        return subs;
        
    } catch (e) {
        alert('error loading values');
        return [];
    }

}

const remove = (subjects: SubjectI[], name: string) => {
    let filtered = subjects.filter(sub => sub.name != name);

    store.set('subs', JSON.stringify(filtered));

    return filtered;
}

export default {
    append,
    all,
    remove,
    save
}