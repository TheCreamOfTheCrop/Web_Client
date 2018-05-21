interface ILoan {
    id: number;
    uid: string;
    amount: number;
    creationDate: Date;
    description: string;
    rate: number;
    loan_type: 'public' | 'private';
    state_id: 'en attente' | 'en negociation';
    user_provider_id: number | null;
    user_requester_id: number;
    delay: number;
}

export default ILoan