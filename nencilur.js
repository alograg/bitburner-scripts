// Sanguijuela

const targetJson = 'auleonto.txt';
const actions = ['weaken', 'growing', 'hacking'];

/** @param {NS} ns **/
export async function main(ns) {
    let hackTarget, lastAction, lastResult;
    while (true) {
        let jsonTarget = localStorage.getItem('hackTarget');
        if (jsonTarget) {
            ns.rm(targetJson);
            hackTarget = JSON.parse(localStorage.getItem('hackTarget'));
            ns.write(targetJson, jsonTarget);
        } else {
            hackTarget = JSON.parse(ns.read(targetJson)) || {
                id: ns.args[0]
            };
        }
        if (!hackTarget.id) {
            await ns.sleep(1000 * 5);
            continue;
        }
        if (hackTarget.id == ns.args[0] || !jsonTarget) {
            //hackTarget.task = actions.sort( () => .5 - Math.random() )[];
            if (!lastResult)
                switch (lastAction) {
                case 'growing':
                    hackTarget.task = 'hacking';
                    break;
                case 'hacking':
                    hackTarget.task = 'weaken';
                    break;
                case 'weaken':
                default:
                    hackTarget.task = actions.filter((i)=>(i != lastAction)).sort(()=>(0.5 - Math.random()))[0];
                    break;
                }
        }
        switch (hackTarget.task) {
        case 'weaken':
            lastResult = await ns.weaken(hackTarget.id);
            break;
        case 'growing':
            lastResult = await ns.grow(hackTarget.id);
            break;
        case 'hacking':
            lastResult = await ns.hack(hackTarget.id);
            break;
        }
        lastAction = hackTarget.task;
    }
}
