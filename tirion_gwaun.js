// Web crawler
/** @param {NS} ns **/
const home = 'home';

/**
ns.brutessh(host);// Runs BruteSSH.exe on a server. 
ns.deleteServer(host);// Delete a purchased server. 
ns.ftpcrack(host);// Runs FTPCrack.exe on a server. 
ns.getGrowTime(host);// Get the execution time of a grow() call. 
ns.getHackTime(host);// Get the execution time of a hack() call. 
ns.getPurchasedServerUpgradeCost(hostname, ram);// Get cost of 
ns.getServer(host);// Returns a server object for the given server. Defaults to the 
ns.getServerBaseSecurityLevel(host);// Get the base security level 
ns.getServerGrowth(host);// Get a server growth parameter. 
ns.getServerMaxMoney(host);// Get the maximum money available on a server. 
ns.getServerMaxRam(host);// Get the maximum amount of RAM on a server. 
ns.getServerMinSecurityLevel(host);// Returns the minimum security 
ns.getServerMoneyAvailable(host);// Get money available on a server. 
ns.getServerNumPortsRequired(host);// Returns the number of open 
ns.getServerRequiredHackingLevel(host);// Returns the required 
ns.getServerSecurityLevel(host);// Get server security level. 
ns.getServerUsedRam(host);// Get the used RAM on a server. 
ns.getWeakenTime(host);// Get the execution time of a weaken() call. 
ns.grow(host, opts);// Spoof money in a server's bank account, increasing the amount 
ns.growthAnalyze(host, multiplier, cores);// Calculate the number of grow 
ns.hack(host, opts);// Steal a server's money. 
ns.hackAnalyze(host);// Get the part of money stolen with a single thread. 
ns.hackAnalyzeChance(host);// Get the chance of successfully hacking a 
ns.hackAnalyzeThreads(host, hackAmount);// Calculate the decimal number of 
ns.hasRootAccess(host);// Check if you have root access on a server. 
ns.httpworm(host);// Runs HTTPWorm.exe on a server. 
ns.killall(host, safetyguard);// Terminate all scripts on a server. 
ns.ls(host, substring);// List files on a server. 
ns.mv(host, source, destination);// Move a file on the target server. 
ns.nuke(host);// Runs NUKE.exe on a server. 
ns.ps(host);// List running scripts on a server. 
ns.purchaseServer(hostname, ram);// Purchase a server. 
ns.relaysmtp(host);// Runs relaySMTP.exe on a server. 
ns.renamePurchasedServer(hostname, newName);// Rename a purchased 
ns.scan(host);// Get the list of servers connected to a server. 
ns.serverExists(host);// Returns a boolean denoting whether or not the specified 
ns.sqlinject(host);// Runs SQLInject.exe on a server. 
ns.upgradePurchasedServer(hostname, ram);// Upgrade a purchased 
ns.weaken(host, opts);// Reduce a server's security level. 
**/
export async function main(ns) {
    const iAm = ns.args[0];
    const canWork = iAm != home;
    self.console.groupCollapsed(iAm);
    if (canWork) {
        const myData = {};
        //ns.scp('tirion_gwaun.js', ns.args[0], home);
    }
    const serverList = list_servers(ns);
    self.console.groupEnd(iAm);
}

function myLog(msg) {
    if (localStorage.getItem('my-debug')) {
        self.console.log(msg);
    }
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
