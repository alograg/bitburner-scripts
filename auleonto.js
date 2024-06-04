// Estadista
export async function main(ns) {
    const serverDB = JSON.parse(localStorage.getItem('serverDB'));
    //Buscar el servidor objetivo por hacking
    const hackTarget = {
        ...(serverDB.reduce((result,item)=>{
            if (item.maxMoney > result.maxMoney && item.hasRoot) {
                return item;
            }
            return result;
        }
        , {
            maxMoney: 0
        })),
        task: null
    };
    hackTarget.task = 'weaken';
    while (true) {
        localStorage.setItem('hackTarget', JSON.stringify(hackTarget));
        await ns.sleep(hackTarget[`${hackTarget.task}Time`]);
        if (ns.getServerSecurityLevel(hostname) > hackTarget.minSecurity) {
            hackTarget.task = 'weaken';
        } else if (ns.getServerMoneyAvailable(hostname) < (hackTarget.maxMoney * 0.9)) {
            hackTarget.task = 'growing';
        } else {
            hackTarget.task = 'hacking';
        }
    }
}