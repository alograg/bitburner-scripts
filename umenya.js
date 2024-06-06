// Esclavista

const ram = 8;

/** @param {NS} ns **/
export async function main(ns) {
    ns.atExit(()=>{
        ns.exec("umenian.js", 'home');
    }
    );
    if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
        ns.purchaseServer(`umen-${Date.now()}`, ram);
    }
}
