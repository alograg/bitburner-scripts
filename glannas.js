// Detener cualquier ejecucion
import {list_servers} from 'onar.js';

/** @param {NS} ns **/
export async function main(ns) {
    list_servers(ns).forEach((host)=>ns.killall(host));
}
