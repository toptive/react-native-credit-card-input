import connectToState from "./connectToState";
import CCF from "./CreditCardInput";
import LiteCCF from "./LiteCreditCardInput";
import CV from "./CardView";
import CVO from "./CreditCardOnly";
import CCNWE from "./CreditCardNumberWithExpiry";

export const CreditCardInput = connectToState(CCF);
export const LiteCreditCardInput = connectToState(LiteCCF);
export const CardView = CV;
export const CreditCardOnly = CVO;
export const CreditCardNumberWithExpiry = connectToState(CCNWE);