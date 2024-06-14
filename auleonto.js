// Estadista
import {iCanHack} from 'onar.js';

/** @param {NS} ns **/
export async function main(ns) {
    self.console.log("auleonto: start");
    ns.atExit(()=>self.console.log("auleonto: stop"));
    while (true) {
        self.console.log("auleonto: active");
        let hackTarget = scanForHackingTarget(ns);
        let waitForSearchTarget = Math.max(hackTarget.growingTime, hackTarget.hackingTime, hackTarget.weakenTime);
        setHackingActionForTarget(ns, hackTarget);
        await ns.sleep(waitForSearchTarget);
    }
}

/** @param {NS} ns **/
function scanForHackingTarget(ns) {
    self.console.group("auleonto: Scan for targers");
    const serverDB = JSON.parse(localStorage.getItem('serverDB'));
    //Buscar el servidor objetivo por hacking
    const currentHackTarget = JSON.parse(localStorage.getItem('hackTarget'))
    let hackTarget = serverDB.reduce((result,item)=>{
        if (item.maxMoney > result.maxMoney && item.hasRoot && iCanHack(ns, item)) {
            return item;
        }
        return result;
    }
    , {
        maxMoney: 0
    });
    if (currentHackTarget && hackTarget.id == currentHackTarget.id) {
        hackTarget = currentHackTarget;
        self.console.log('Same target:', hackTarget);
    } else {
        localStorage.setItem('hackTarget', JSON.stringify(hackTarget));
        self.console.log('Set target:', hackTarget);
    }
    self.console.groupEnd();
    return hackTarget;
}

/** @param {NS} ns **/
function setHackingActionForTarget(ns, hackTarget) {
    self.console.group("auleonto: Set Hacking Action");
    const randomMoney = Math.random();
    const currentSecurityLevel = ns.getServerSecurityLevel(hackTarget.id);
    const currentMoney = ns.getServerMoneyAvailable(hackTarget.id);
    self.console.log(hackTarget.id, hackTarget.task, randomMoney);
    self.console.table([[currentSecurityLevel, hackTarget.minSecurity], [currentMoney, (hackTarget.maxMoney * randomMoney)]]);
    if (currentSecurityLevel > hackTarget.minSecurity) {
        hackTarget.task = 'weaken';
    } else if (currentMoney < (hackTarget.maxMoney * randomMoney)) {
        hackTarget.task = 'growing';
    } else {
        hackTarget.task = 'hacking';
    }
    localStorage.setItem('hackTarget', JSON.stringify(hackTarget));
    self.console.log(hackTarget.id, hackTarget.task);
    self.console.groupEnd();
}
