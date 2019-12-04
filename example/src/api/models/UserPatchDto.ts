import _ from 'lodash';

export default class UserPatchDto {
    
    private _id: number;
    
    private _first_name: string;
    
    private _middle_name: string;
    
    private _last_name: string;
    
    private _country_code: string;
    
    private _address_line_1: string;
    
    private _address_line_2: string;
    
    private _post_code: string;
    
    private _mobile_phone: string;
    
    constructor(data: any) {

        this._id = data.id;

        this._first_name = data.first_name;

        this._middle_name = data.middle_name;

        this._last_name = data.last_name;

        this._country_code = data.country_code;

        this._address_line_1 = data.address_line_1;

        this._address_line_2 = data.address_line_2;

        this._post_code = data.post_code;

        this._mobile_phone = data.mobile_phone;

    }

    toJSON(): any {
        return {

            id: this._id,

            first_name: this._first_name,

            middle_name: this._middle_name,

            last_name: this._last_name,

            country_code: this._country_code,

            address_line_1: this._address_line_1,

            address_line_2: this._address_line_2,

            post_code: this._post_code,

            mobile_phone: this._mobile_phone,

        }
    }
    
    get id(): number {
        return this._id;
    }
    
    get first_name(): string {
        return this._first_name;
    }
    
    get middle_name(): string {
        return this._middle_name;
    }
    
    get last_name(): string {
        return this._last_name;
    }
    
    get country_code(): string {
        return this._country_code;
    }
    
    get address_line_1(): string {
        return this._address_line_1;
    }
    
    get address_line_2(): string {
        return this._address_line_2;
    }
    
    get post_code(): string {
        return this._post_code;
    }
    
    get mobile_phone(): string {
        return this._mobile_phone;
    }
    
    
    set id(value: number) {
        this._id = value; 
    }
    
    set first_name(value: string) {
        this._first_name = value; 
    }
    
    set middle_name(value: string) {
        this._middle_name = value; 
    }
    
    set last_name(value: string) {
        this._last_name = value; 
    }
    
    set country_code(value: string) {
        this._country_code = value; 
    }
    
    set address_line_1(value: string) {
        this._address_line_1 = value; 
    }
    
    set address_line_2(value: string) {
        this._address_line_2 = value; 
    }
    
    set post_code(value: string) {
        this._post_code = value; 
    }
    
    set mobile_phone(value: string) {
        this._mobile_phone = value; 
    }
    
}