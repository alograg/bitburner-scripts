// Gusano
import {iCanHack} from 'onar.js';
const script = "nencilur.js";

/** @param {NS} ns **/
export async function main(ns) {
    self.console.groupCollapsed('meneg_taur');
    ns.atExit(()=>{
        ns.exec("tirion_gwaun.js", 'home');
    }
    );
    let serverDB = JSON.parse(localStorage.getItem('serverDB'));
    if (!serverDB)
        ns.exit();
    const scriptMem = ns.getScriptRam(script);
    const notRootServer = serverDB.reduce((result,item)=>{
        if (!item.hasRoot) {
            result.push(item);
        }
        return result;
    }
    , []);
    self.console.groupCollapsed('penetrate');
    penetrateNodes(ns, serverDB);
    ns.exec("tirion_gwaun.js", 'home');
    self.console.groupEnd();
    serverDB = JSON.parse(localStorage.getItem('serverDB'));
    const rootedServer = serverDB.reduce((result,item)=>{
        if (item.hasRoot) {
            result.push(item);
        }
        return result;
    }
    , []);
    self.console.log(rootedServer);
    let forLog = [];
    for (let i = rootedServer.length - 1; i >= 0; i--) {
        let item = rootedServer[i];
        let threads = Math.floor((item.maxRam - ns.getServerUsedRam(item.id)) / scriptMem);
        if (threads >= 1) {
            forLog.push({
                host: item.id,
                scp: ns.scp(script, item.id, 'home'),
                exec: ns.exec(script, item.id, threads, item.id)
            });
        }
    }
    self.console.table(forLog);
    self.console.groupEnd();
}

function penetrateNodes(ns, serverDB) {
    const notRootServer = serverDB.reduce((result,item)=>{
        if (!item.hasRoot) {
            result.push(item);
        }
        return result;
    }
    , []);
    notRootServer.forEach((item)=>{
        if (iCanHack(ns, item))
            return;
        if (ns.fileExists("HTTPWorm.exe", "home")) {
            ns.httpworm(item.id);
        }
        if (ns.fileExists("relaySMTP.exe", "home")) {
            ns.relaysmtp(item.id);
        }
        if (ns.fileExists("FTPCrack.exe", "home")) {
            ns.ftpcrack(item.id);
        }
        if (ns.fileExists("BruteSSH.exe", "home")) {
            ns.brutessh(item.id);
        }
        try {
            ns.nuke(item.id);
            self.console.log(`${item.id} hacked`);
        } catch (e) {
            self.console.log(`${item.id} not hacked`);
        }
    }
    );
}
