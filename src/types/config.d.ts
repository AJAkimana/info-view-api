declare namespace CFG {
  interface ICompany extends IBase {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    logoUrl?: string;
  }
}
