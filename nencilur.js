// Sanguijuela
/** @param {NS} ns **/
export async function main(ns) {
    let hackTarget;
    while (true) {
        hackTarget = JSON.parse(localStorage.getItem('hackTarget'));
        switch (hackTarget.task) {
        case 'weaken':
            await ns.weaken(hackTarget.id);
            break;
        case 'growing':
            await ns.grow(hackTarget.id);
            break;
        case 'hacking':
            await ns.hack(hackTarget.id);
            break;
        }
        await ns.sleep(hackTarget[`${hackTarget.task}Time`] * 1.1);
    }
}
