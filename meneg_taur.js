// Gusano
const script = "nencilur.js";

/** @param {NS} ns **/
export async function main(ns) {
    const serverDB = JSON.parse(localStorage.getItem('serverDB'));
    const swriptMem = ns.getScriptRam(script);
    ns.atExit(()=>{
        ns.exec("tirion_gwaun.js", 'home');
    });
    serverDB.reduce((result,item)=>{
        if (!item.hasRoot) {
            result.push(item);
        }
        return result;
    }
    , []).forEach((item)=>{
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
        }catch (e) {
        }
    }
    );
    serverDB.reduce((result,item)=>{
        if (item.hasRoot) {
            result.push(item);
        }
        return result;
    }
    , []).forEach((item)=>{
        let threads = Math.floor((item.maxRam - ns.getServerUsedRam(item.id)) / swriptMem);
        if (threads >= 1) {
            ns.scp(script, item.id, 'home');
            ns.exec(script, item.id, threads);
        }
    }
    );
}
