// renombrar servidorec omprados
/** @param {NS} ns **/
export async function main(ns) {
    ns.atExit(()=>{
        ns.exec("tirion_gwaun.js", 'home');
        ns.exec("meneg_taur.js", 'home');
    }
    );
    const purchasedServers = ns.getPurchasedServers().map((item, index)=>{
        self.console.log(item);
        ns.renamePurchasedServer(item, `umen-${index}`);
    });
    //getPurchasedServerUpgradeCost
    //upgradePurchasedServer
    //renamePurchasedServer
}