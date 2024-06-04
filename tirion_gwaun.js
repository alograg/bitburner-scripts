// Web crawler
/** @param {NS} ns **/
const home = 'home';

const script = 'tirion_gwaun.js';

export async function main(ns) {
    const serverDB = list_servers(ns).map((host)=>storeInfo(ns, host));
    localStorage.setItem('serverDB', JSON.stringify(serverDB));
}

function storeInfo(ns, iAm) {
    const myData = {
        id: iAm,
        growingTime : ns.getGrowTime(iAm),
        hackingTime:ns.getHackTime(iAm),
        weakenTime:ns.getWeakenTime(iAm),
        maxMoney: ns.getServerMaxMoney(iAm),
        maxRam : ns.getServerMaxRam(iAm),
        minSecurity:ns.getServerMinSecurityLevel(iAm),
        portsRequired:ns.getServerNumPortsRequired(iAm),
        requiredHacking:ns.getServerRequiredHackingLevel(iAm),
        hasRoot: ns.hasRootAccess(iAm),
    };
    return myData;
}

function scan(ns, parent, server, list) {
    const children = ns.scan(server);
    for (let child of children) {
        if (parent == child) {
            continue;
        }
        list.push(child);
        scan(ns, server, child, list);
    }
}

function list_servers(ns) {
    const list = [];
    scan(ns, '', 'home', list);
    return list;
}
