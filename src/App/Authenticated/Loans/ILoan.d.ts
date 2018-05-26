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

// "id": 21,
//             "uid": "54624c97-9fb3-4b84-9846-5b74ea9d2884",
//             "amount": 1230,
//             "creationdate": "2018-04-05T07:25:04.000Z",
//             "description": "Ceci est un pret de test",
//             "rate": 3,
//             "loan_type": "public",
//             "state_id": "en attente",
//             "user_requester_id": 16,
//             "user_provider_id": null,
//             "delay": 7,
//             "created_at": "2018-04-05T07:25:04.000Z",
//             "updated_at": "2018-04-05T07:25:04.000Z",
//             "deleted_at": null