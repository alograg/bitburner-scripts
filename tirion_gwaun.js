// Web crawler
/** @param {NS} ns **/
const home = 'home';

const script = 'tirion_gwaun.js';

export async function main(ns) {
    const serverList = list_servers(ns);
    localStorage.setItem('servers', JSON.stringify(serverList));
    serverList.forEach((host)=>storeInfo(ns, host));
}

function storeInfo(ns, iAm) {
    const myData = {
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
    localStorage.setItem(iAm, JSON.stringify(myData));
    self.console.groupEnd(iAm);
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
