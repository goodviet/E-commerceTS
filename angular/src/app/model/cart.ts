export class Cart{
    id: string;
    name: string;
    price: number;
    quantity: number;
    avatar: string

    constructor(id?:string, name?: string, price?:number, quantity?: number, avatar?: string){
        this.id= id || '';
        this.name = name || '';
        this.price=price || 0;
        this.quantity= quantity || 0;
        this.avatar = avatar || ''


    }
}