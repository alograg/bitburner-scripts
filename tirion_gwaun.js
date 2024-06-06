// Web crawler
import {list_servers} from 'onar.js';

/** @param {NS} ns **/
export async function main(ns) {
    const serverDB = list_servers(ns).map((host)=>storeInfo(ns, host));
    localStorage.setItem('serverDB', JSON.stringify(serverDB));
    self.console.log(`${serverDB.length} added`);
}

function storeInfo(ns, iAm) {
    const myData = {
        id: iAm,
        growingTime: ns.getGrowTime(iAm),
        hackingTime: ns.getHackTime(iAm),
        weakenTime: ns.getWeakenTime(iAm),
        maxMoney: ns.getServerMaxMoney(iAm),
        maxRam: ns.getServerMaxRam(iAm),
        minSecurity: ns.getServerMinSecurityLevel(iAm),
        portsRequired: ns.getServerNumPortsRequired(iAm),
        requiredHacking: ns.getServerRequiredHackingLevel(iAm),
        hasRoot: ns.hasRootAccess(iAm),
        task: 'weaken'
    };
    return myData;
}
