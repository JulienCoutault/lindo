import { Mod } from "../mod";

export class ResumeShop extends Mod {
    private selledItems = [];
    private allItemsId = [];
    private totalGain = 0;
    private evSelled;

    startMod(): void {
        console.log("- enable resumeShop");
        this.init();

        // this.manager = window.mirage.finder.singleton("getWindow");
        // this.itemBox = this.manager.getWindow("itemBox");
        this.wGame.dofus.connectionManager.on("TextInformationMessage", this.evSelled);
        // this.wGame.dofus.connectionManager.once("moneyGoultinesAmountSuccess", () => {
        //     this.init();
        // })
    }

    private init() {
        this.selledItems = [];
        this.allItemsId = [];
        this.totalGain = 0;
        this.evSelled = (msg) => {
            Logger.debug(msg.text)
            // construction de la liste des objets vendus
            if (msg.text.includes("Banque") || msg.text.includes("mode marchand")) {
                this.selledItems.push({
                    id: msg.parameters[1],
                    kamas: msg.parameters[0],
                    quantity: msg.parameters[3]
                });
                this.allItemsId.push(msg.parameters[1]);
                this.totalGain += parseInt(msg.parameters[0],10);
            }
        }
    }


}
