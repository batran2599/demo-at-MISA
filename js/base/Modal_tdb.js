class Modal_tdb extends CreateHTMLTag_tdb {
    constructor() {
        super();
        this.listModalNow = [];
        this.view = document.querySelector("body");
        this.containModal = null;
        this.formModal = null;
        this.modalName = null;
        this.modalContent = null;
        this.buttonCancelH = null;
        this.buttonCancelF = null;
        this.buttonConfirmF = null;
    }

    createFormModal() {

        this.containModal = this.createHTMLTag("div", {class: "contai-modal"});
        this.formModal = this.createHTMLTag("div", {class: "modal-tdb"});
        this.containModal.appendChild(this.formModal);
        
        let headerModal = this.createHTMLTag("div", {class: "header-modal"});
        this.modalName = this.createHTMLTag("p", {class: "modal-name"});
        this.buttonCancelH = this.createHTMLTag("button", {class: "cancel-modal"});
        headerModal.appendChild(this.modalName);
        headerModal.appendChild(this.buttonCancelH);

        let bodyModal = this.createHTMLTag("div", {class: "body-modal"});
        this.modalContent = this.createHTMLTag("p", {class: "content-modal"});
        bodyModal.appendChild(this.modalContent);

        let footerModal = this.createHTMLTag("div", {class: "footer-modal"});
        let contaiButton = this.createHTMLTag("div", {class: "contain-button-modal"});
        this.buttonCancelF = this.createHTMLTag("button", {class: "cancel-modal button"});
        this.buttonConfirmF = this.createHTMLTag("button", {class: "confirm-modal button"});
        contaiButton.appendChild(this.buttonCancelF);
        contaiButton.appendChild(this.buttonConfirmF);
        footerModal.appendChild(contaiButton);

        this.formModal.appendChild(headerModal);
        this.formModal.appendChild(bodyModal);
        this.formModal.appendChild(footerModal);

        this.view.appendChild(this.containModal);

    }

    create(typeModal = "info", modalName = "Thông tin", content = "...", titleButtonCancel = "Hủy", titleButtonConfirm = "OK") {
        this.createFormModal();
        this.modalName.innerText = modalName;
        this.modalContent.innerText = "Xin chào thế giới !";
        this.buttonCancelH.innerText = "X";
        this.buttonCancelF.innerText = titleButtonCancel;
        this.buttonConfirmF.innerText = titleButtonConfirm;
        this.setEventCancel();
    }

    cancelModal() {
        this.containModal.removeChild(this.formModal);
        this.view.removeChild(this.containModal);
    }

    setEventCancel() {
        this.buttonCancelF.onclick = this.cancelModal.bind(this);
        this.buttonCancelH.onclick = this.cancelModal.bind(this);
        this.buttonConfirmF.onclick = ()=>{
            console.log("Xin chào !");
            this.cancelModal();
        };
    }
}