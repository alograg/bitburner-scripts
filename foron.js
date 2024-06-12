// Minero
import {iCanHack} from 'onar.js';

const maxLevel=200;
const maxRam=64;
const maxCore=16;

/** @param {NS} ns **/
export async function main(ns) {
	self.console.group('foron');
	let maxNodes = ns.getHackingLevel();
	let i;
	for(i=(maxNodes - ns.hacknet.numNodes());i>0;i--){
		ns.hacknet.purchaseNode();
	}
	for(i=ns.hacknet.numNodes()-1;i>=0;i--) {
		ns.printf('----- Node: %d',i);
		ns.printf('level: %s',ns.hacknet.upgradeLevel(i,maxLevel));
		ns.printf('ram %s',ns.hacknet.upgradeRam(i,maxRam));
		ns.printf('cores %s',ns.hacknet.upgradeCore(i,maxCore));
	}
	//self.console.log(ns.hacknet.maxNumNodes());
	//self.console.log(ns.hacknet.numNodes());
	//self.console.log(ns.hacknet.getPurchaseNodeCost());
	//self.console.log(ns.hacknet.getLevelUpgradeCost());
	//self.console.log(ns.hacknet.);
	//self.console.log(ns.hacknet.);
	//self.console.log(ns.hacknet.);
	self.console.groupEnd();
}
