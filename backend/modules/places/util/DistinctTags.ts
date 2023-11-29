export default function distinctTags(tags: string[]): string[] {

    const set = [];

    for(let tag of tags){

        if (set.includes(tag)) continue;

        set.push(tag);

    }

    return set;

}